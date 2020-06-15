/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    signup: async function(req, res){

        const {name, password} = req.allParams()
        const encryptPassword = await utilityService.hashPassword(password);
        const user = await User.create({
            name: name,
            password: encryptPassword
        }).fetch();
        return res.ok(user);
    },
    login: async function(req, res){
        return res.json({
            todo: "something"
        });
    }

 };


