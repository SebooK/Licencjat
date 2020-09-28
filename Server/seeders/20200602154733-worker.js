'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('workers', [
        {username: 'Kierowca1', password:'P@ssword', email:'kierowca1@gmail.com', firstname:'Adam', lastname:'Kowalski', role:0},
        {username: 'Spedytor1', password:'P@ssword', email:'spedytor1@gmail.com', firstname:'Tomasz', lastname:'Nowak', role:1},
      ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('workers',null,{});
  }
};
