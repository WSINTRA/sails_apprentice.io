/**
 * RecipeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create(req, res) {
    try {
      let params = req.allParams();
      if (!params.title) {
        return res.badRequest({ err: "Recipe must have a title" });
      }
      //Split the steps object up into an array
      //{ title: 'Eggs', steps: '[{title: "test"}]' }
      let stepsArray = params.steps.replace(/[\[\]]/g, "").split(",");
      //Parse each object into an object
      let stepsObjs = stepsArray.map((step) => JSON.parse(step));
      //Create new steps based on the incoming params
      stepsObjs.forEach(element => {
        Steps.create({
            title: element.title,
          }).then(result=> {
              return console.log(result)
            })
      })
     
    //     Recipe.create({
    //       title: params.title,
    //       description: params.description,
    //       steps: stepsObject
    //   })
      return res.ok("This is fucking it");
    } catch (err) {
      return res.serverError(err);
    }
  },


  showAll(req, res) {
    let all = Steps.find().then(result=>{
        return res.ok(result)
    })
  },
};
