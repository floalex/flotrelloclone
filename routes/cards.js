var _ = require('underscore');
var path = require('path');
var Card = require(path.resolve(path.dirname(__dirname), "routes/cards_node"));
var Labels = require(path.resolve(path.dirname(__dirname), "routes/labels_node"));
var List = require(path.resolve(path.dirname(__dirname), "routes/lists_node"));

module.exports = function(router) {
  router.route('/cards/:id').get(function(req, res) {
    res.render("index", {
      lists: List.get(),
      cards: Card.get(),
      labels: Labels.get()
    });
  });

  router.route('/lists/:id/cards').get(function(req, res) {
    var cards = _(Card.get()).filter(function(card) {
      return card.list_id === +req.params.id && !card.archived;
    });

    res.status(200).json(cards).end();
  }).post(function(req, res) {
    var cards = Cards.get();

    var card = {
      "id": Card.getLastID() + 1,
      "name": req.body.name,
      "comments_count": req.body.comments_count || 0,
      "due_date_completed": req.body.due_date_completed || false,
      "description": req.body.description || "",
      "subscribed": req.body.subscribed || false,
      "list_id": +req.body.list_id,
      "sort_number": req.body.sort_number || _(cards).where({ list_id: +req.body.list_id }).length + 1,
      "archived": req.body.archived || false
    };

    if (req.body.old_id) {
      
      if (req.body.labels_count) {
        var labels = Labels.get();

        for (var i = 0; i < labels.length; i++) {
          if (labels[i].card_id.includes(req.body.old_id)) {
            labels[i].card_id.push(card.id);
          }
        }

        Labels.set({ lastID: Labels.getLastID(), data: labels });
      }

      cards.forEach(function(crd) { 
        if (crd.list_id === card.list_id && crd.sort_number >= card.sort_number) {
          crd.sort_number = crd.sort_number + 1;
        }
      });
    }

    delete card.old_id;
    cards.push(card);
    Card.set({ lastID: card.id, data: cards });
    res.json(card);
  });

  router.route('/lists/:list_id/cards/:id').delete(function(req, res) {
    var cards = Card.get();

    var newCards = cards.filter(function(card) {
      return card.id !== +req.params.id;
    });

    var card = _(cards).where({ id: +req.params.id });
    Card.set({ lastID: Card.getLastID(), data: newCards });

    res.status(200).json(card).end();    
  }).patch(function(req, res) {
    var card = req.body;
    var id = +req.params.id;
    var cards = Card.get();
    var index = undefined;

    cards.forEach(function(item, idx) {
      if (item.id === id) { index = idx; }
    });

    if (index === undefined) { 
      res.send();
    } else {
      if (card.list_id && card.sort_number) {
        if (cards[index].list_id === card.list_id && cards[index].sort_number === card.sort_number) {
          res.json(card);
          return;

        } else if (cards[index].list_id !== card.list_id) {
          
          // find all cards in old list and condense them
          var oldListCards = _.filter(cards, function(crd) {
            if (crd.list_id === cards[index].list_id && crd.sort_number > cards[index].sort_number) {
              crd.sort_number = crd.sort_number - 1;
            }
          });


          // find all cards in new list that come after sort number for moved card
          cards.forEach(function(crd) {
            if (crd.list_id === card.list_id && crd.sort_number >= card.sort_number) {
              crd.sort_number = crd.sort_number + 1;
            }
          });

        } else if (cards[index].sort_number !== card.sort_number) {
          // old number less than new?
          if (cards[index].sort_number < card.sort_number) {
            cards.forEach(function(crd) {
              if (crd.id !== cards[index].id && cards[index].list_id === crd.list_id && crd.sort_number <= card.sort_number) {
                crd.sort_number = crd.sort_number - 1;
              }
            });
          } else {
            cards.forEach(function(crd) {
              if (crd.id !== cards[index].id && cards[index].list_id === crd.list_id && crd.sort_number >= card.sort_number) {
                crd.sort_number = crd.sort_number + 1;
              }
            });
          }
        }
      }

      for (var prop in req.body) {
        if (prop === "id") { continue; }
        cards[index][prop] = card[prop];
      }
      Card.set({ lastID: Card.getLastID(), data: cards });
      res.json(card);
    }
  });
};