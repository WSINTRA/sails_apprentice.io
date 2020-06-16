/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  signup: async function (req, res) {
    try {
      const { name, password } = req.allParams();
      const encryptPassword = await utilityService.hashPassword(password);
      const user = await User.create({
        name: name,
        password: encryptPassword,
      }).fetch();
      const token = jsonWebService.issuer({user: user.id}, "1 day");
      return res.ok({"user":user, "token":token});
      //Some basic error checking
      //TODO: improve error checking
    } catch (err) {
      return res.serverError(err);
    }
  },
  login: async function (req, res) {
    console.log("RES", res)
    try {
        const {name, password } = req.allParams();
        const user = await User.findOne({name})
        const recipes = await Recipe.findOne({user: user.id}).populate('steps');
        const checkedPassword = await utilityService.comparePassword(password, user.password);
        if(checkedPassword){
          //Create a JWT token from service and return it, this user object will be used in the isLoggedIn policy
          const token = jsonWebService.issuer({user: user.id}, "1 day");
          return res.ok({"user":user, "recipes":recipes, "token":token});
        }
        else{
            return res.badRequest("Incorrect username or password")
        } 
    }
      //Some basic error checking
      //TODO: improve error checking
    catch(err){
        return res.serverError(err)
    }
  },
};
