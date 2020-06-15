/**
 * Steps.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: { 
      required: true,
      type: 'string'},
    description: {type: 'string'},
    imageUrl: {type:'string'},
    videoUrl: {type:'string'},
    recipe:{
      model: 'recipe',
      required: true,
    }
    

  },

};

