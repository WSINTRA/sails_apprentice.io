/**
 * RecipeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //Create a method for new Recipe that includes creating Steps
  async create(req, res) {
    try {
      const { user, title, description, steps } = req.allParams();
      if (!title || !user) {
        return res.badRequest({
          err: "Recipe must have a title and an associated user",
        });
      }
      //Split the steps object up into an array, make sure frontend follows the correct formatting
      //{ "title": "Eggs",..., "steps": '[{"title": "test"}]' }
      //Parse steps into an object
      const stepsObjs = JSON.parse(steps);
      //Create a new recipe
      Recipe.create({
        //The user will be created from the JWT token, as outline in policy config and isLoggedIn.js
        user: req.user,
        title: title,
        description: description,
      })
        .fetch()
        //Once new recipe is created, build the Steps for the recipe
        .then((recipe) => {
          // Create new steps based on the incoming params
          try{
          stepsObjs.forEach((step) => {
            const recipeID = recipe.id;
            Steps.create({
              title: step.title,
              recipeTitle: recipeID,
            })
          })
        }
        catch(err){
            return res.serverError(err)
        }
        //Return the response if all went well
        return res.ok(recipe);
        });
        //Else return big fat ERROR
    } catch (err) {
      return res.serverError(err);
    }
  },

  //Return all recipes if user is logged in, as outline in policy config and isLoggedIn
  showAll(req, res) {
    let all = Recipe.find()
      .populate("steps")
      .then((result) => {
        return res.ok(result);
      });
  },
};
