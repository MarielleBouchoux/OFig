const client = require('./database');

const dataMapper = {
    getAllFigurines: (callback) => {
        // toutes les figurines + leur note moyenne
        const selectAllFigurinesQuery = `
            SELECT figurine.*, ROUND(AVG(review.note)) as avg
            FROM review JOIN figurine
            ON review.figurine_id = figurine.id
            GROUP BY figurine.id;
        `;
        // je joue ma requete avec client.query, et je donne le callback
        client.query(selectAllFigurinesQuery, callback);
    },
    getFigurineById: (id, callback) => {
        // je déclare ma requete
        const selectFigurineByIdQuery = 'SELECT * from "figurine" WHERE "id"=$1;';
        
        client.query(selectFigurineByIdQuery, [id], callback);
    },
    getFigurinesByIds: (idsArray, callback) => {
        
        const selectFigurineByIdQuery = 
            'SELECT * from "figurine" WHERE "id" = ANY($1)';

        
        client.query(selectFigurineByIdQuery, [idsArray], callback);
    },
    getReviewsByFigurineId: (figurineId, callback) => {
        const selectReviewsByFigurineIdQuery = 
            'SELECT * from "review" WHERE "figurine_id" = $1';

        
        client.query(selectReviewsByFigurineIdQuery, [figurineId], callback);
    },
    getFigurineCountByCategories: (callback) => {
        const getCountQuery = 
            'SELECT category, COUNT(*) FROM "figurine" GROUP BY category;'
        
        client.query(getCountQuery, callback);
    }
};

module.exports = dataMapper;
