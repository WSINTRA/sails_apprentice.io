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
      return res.ok(user);
      //Some basic error checking
      //TODO: improve error checking
    } catch (err) {
      return res.serverError(err);
    }
  },
  login: async function (req, res) {
    try {
        const {name, password } = req.allParams();
        const user = await User.findOne({name})
        const checkedPassword = await utilityService.comparePassword(password, user.password);

        console.log(checkedPassword)
        if(checkedPassword){
            
            return res.ok(user)
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
