/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    password: {
      type: 'string',
      required: true,
      description: 'Securely hashed representation of the user\'s login password.',
      protect: true,
      example: '2$28a8eabna301089103-13948134nad'
    },

    name: {
      type: 'string',
      required: true,
      description: 'Full representation of the user\'s name.',
      maxLength: 120,
      example: 'Mary Sue van der McHenst'
    },
    recipe: {
      collection: 'recipe',
      via: 'user'
    }
  },

};

