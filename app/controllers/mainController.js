const utils = require('../utils');

const dataMapper = require('../dataMapper');

const mainController = {
  leftMenu: (request, response, next) => {
    dataMapper.getFigurineCountByCategories((error, result) => {
      if (error) {
        console.log(error);
      } else {
        const categoriesFromDatabase = result.rows;

        // response.locals = une autre facon de donner des variables
        // a notre vue.
        response.locals.categories = categoriesFromDatabase;

        next();
      }
    });
  },
  // méthode pour la page d'accueil
  homePage: (request, response) => {
   
    dataMapper.getAllFigurines((error, result) => {
      if (error) {
        console.log('SQL Error : ', error);
      } else {
      
        const figurinesFromDatabase = result.rows;

        
        for (let i = 0 ; i < figurinesFromDatabase.length ; i++) {
          
          const averageRatingAsNumber = figurinesFromDatabase[i].avg;

          
          const averageRatingAsString = utils.buildStarsString(averageRatingAsNumber);

          
          figurinesFromDatabase[i].avg = averageRatingAsString;
        }
        
        response.render(
          'home',
          {
            figurines: figurinesFromDatabase,
          }
        );
      }
    });
  },

  // méthode pour la page article
  articlePage: (request, response) => {
    
    const figurineId = request.params.id;

    dataMapper.getFigurineById(figurineId, (error, result) => {
      if (error) {
        console.log('SQL Error : ', error); 
      } else {
        const figurineFromDatabase = result.rows[0];

        // 2eme requete : on récupère les reviews de cette figurine.
        dataMapper.getReviewsByFigurineId(figurineId, (error, result) => {
          if (error) {
            console.log('SQL Error : ', error);
          } else {
            // je récupère les reviews dans le résultat SQL
            const reviewsFromDatabase = result.rows;

            
            const formattedReviews = reviewsFromDatabase.map((review) => {
              
              return {
                id: review.id,
                author: review.author,
                note: utils.buildStarsString(review.note),
                title: review.title,
                message: review.message,
              }
            })

            response.render('article', {
              figurine: figurineFromDatabase,
              reviews: formattedReviews,
            });
          }
        })
      }
    });
  }

};


module.exports = mainController;
