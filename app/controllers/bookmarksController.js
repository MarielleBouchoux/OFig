const path = require('path');

const dataMapper = require('../dataMapper');

const bookmarksController = {

  // méthode pour afficher le panier
  bookmarksPage: (request, response) => {
    // ici, je veux afficher mes favoris.
    // ici, je vais récupérer le tableau des favoris, les récupérer en SQL...
    // et les donner à ma vue.

    // si y'a pas de bookmarks dans la session ?
    if (!request.session.bookmarks) {
      response.render('bookmarks', {
        bookmarks: []
      });
    } else {
      // si il y a bien des bookmarks dans la session, on appelle le dataMapper

      const bookmarksInSession = request.session.bookmarks;

      // j'apelle le datamapper
      dataMapper.getFigurinesByIds(bookmarksInSession, (error, result) => {
        if (error) {
          console.log('SQL Error : ', error);
        } else {
          const figurinesFromDatabase = result.rows;
  
          response.render('bookmarks', {
            bookmarks: figurinesFromDatabase
          });
        }
      });
    }
  },
  addToFavorites: (request, response) => {
    const figurineId = request.params.id;

    // on veut ajouter l'id "figurineId" dans nos bookmarks.
    // les bookmarks existent dans notre session.
    // on commence par regarder si un tableau "bookmarks" existe dans notre session
    // si il n'existe pas. on le crée.
    if (!request.session.bookmarks) {
      request.session.bookmarks = [];
    }
    
    request.session.bookmarks.push(figurineId);

    response.redirect('/bookmarks');
  },
  removeFromFavorites: (request, response) => {
    
    const figurineId = request.params.id;

    // et maintenant : enlever une case d'un tableau
    // je veux filtrer sur mes favoris, en ne conservant que ceux dont l'id
    // est différent de "figurineId"
    
    request.session.bookmarks = 
      request.session.bookmarks.filter((id) => id !== figurineId) 
  
    response.redirect('/bookmarks');
  }
};


module.exports = bookmarksController;
