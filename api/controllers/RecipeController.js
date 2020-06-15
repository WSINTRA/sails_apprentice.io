/**
 * RecipeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res) {
    try {
      let params = req.allParams();
      if (!params.title || !params.user) {
        return res.badRequest({
          err: "Recipe must have a title and an associated user",
        });
      }
      //Split the steps object up into an array, make sure frontend follows the correct formatting
      //{ "title": "Eggs", "steps": '[{"title": "test"}]' }
      let stepsArray = params.steps.replace(/[\[\]]/g, "").split(",");
      //Parse each object into an object
      let stepsObjs = stepsArray.map((step) => JSON.parse(step));
      //Find the user creating the recipe, 
      //TODO: Improve this so it only finds one result, not an array
      const currentUser = await User.find({name: params.user});
    //   Create a new Recipe based on the user
    console.log(currentUser)
     Recipe.create({
        user: currentUser[0].id,
        title: params.title,
        description: params.description,
      })
      .fetch()
      //Once new recipe is created, build the Steps for the recipe
      .then((recipe) => {
          
        // Create new steps based on the incoming params
        stepsObjs.forEach((element) => {
        console.log(recipe.id, "Should be id")
        let recipeID = recipe.id
        Steps.create({
            title: element.title,
            recipe: recipeID,
          }).fetch().then((result) => {
            return console.log(result);
          });
        });
        return res.ok(recipe)
      });
    } catch (err) {
      return res.serverError(err);
    }
  },
  showAll(req, res) {
    let all = Recipe.find().populate('steps').then((result) => {
      return res.ok(result);
    });
  },
};
