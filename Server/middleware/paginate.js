const sequelize = require('sequelize');

module.exports = function (model) {
    return async (req, res, next) => {
        let offset = 0;
        let limit = 10;

        model.findAndCountAll().then(data => {
            const page = req.params.page;
            const pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);
        });


    }
}