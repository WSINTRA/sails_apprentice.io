/**
 * Recipe.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    user: {
      model: 'user',
      required: true
    },
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    steps: {
      collection: 'steps',
      via: 'recipe'
    },
    owner: {
      collection: 'user',
      via: 'recipes'
    }
  },
};
