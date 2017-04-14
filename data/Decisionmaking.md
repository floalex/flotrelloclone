1. What items should be included in the board view? 
  - Multiple lists, and cards in each lists. Data model with the following traits:
    * an array of lists
    * list has a name and can have multiple cards
    * card has a title
    * We can CRUD (Create, Read, Update, Delete) for lists and cards in the board view
   {
      name: 'list 1',
      cards: [
        {title: 'task 1'},
        {title: 'task 2'}
      ]
    },
    {
      name: 'list 2',
      cards: [
        {title: 'task 3'},
        {title: 'task 4'}
      ]
    }

2. When we load the board, should we insert the whole collection data or add it one by one?
  - Load it one by one and pass in model data can be delegating handling of updates 
    and deletes to the individual ListView

3. How to connect cards with each list?
  - Two choices: Create empty array for cards when creating the list; or read the cards
    with the list.id. 
  - Add the cards array after user chooses the create cards in the list. faster initial page 
    load for unnecessary server data requests. Only read the cards when they exist.