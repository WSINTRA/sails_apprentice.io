module.exports = async function(req,res,next){

    if(!req.headers && !req.headers.authorization){
        return res.badRequest({err:"User did not provide authorization in headers"});
    }
    //Grab the header token
    const tokenParam = req.headers.authorization;
    //decode the token into a user id
    const decodedToken = jsonWebService.verify(tokenParam);
    //find the user by the ID
    const user = await User.findOne({
        id: decodedToken.user
    })
    if(!user){
        return next({err:"Invalid username or password"});
    }
    //policy applied in policy config
    req.user = user.id
    next()


}