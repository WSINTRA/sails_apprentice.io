/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Joi = require('joi')
module.exports = {
  signup: async function (req, res) {
    //Use Joi for extra validations
    try {
    const schema = Joi.object().keys({
      name: Joi.string().required(), 
      password: Joi.string().required(),
    })
    const params = await Joi.validate(req.allParams(), schema)
    // Create new user and return a token with User
      const { name, password } = params;
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
    try {
      const schema = Joi.object().keys({
        name: Joi.string().required(), 
        password: Joi.string().required(),
      })
      const params = await Joi.validate(req.allParams(), schema)
      // Create new user and return a token with User
        const { name, password } = params;
     
          const user = await User.findOne({name})
          const recipes = await Recipe.find({user: user.id}).populate('steps');
          
        
        const checkedPassword = await utilityService.comparePassword(password, user.password);
        if(checkedPassword){
          //Create a JWT token from service and return it, this user object will be used in the isLoggedIn policy
          const token = jsonWebService.issuer({user: user.id}, "1 day");
          return res.ok({"user":user, "recipes":recipes, "token":token});
        }
        else{
          return res.badRequest({'err':"User not found, please signup"})
        } 
    }
      //Some basic error checking
      //TODO: improve error checking
    catch(err){
        return res.serverError(err)
    }
  },
};
