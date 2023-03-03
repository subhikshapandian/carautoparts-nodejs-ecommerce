const Router = require('koa-router');
const router = new Router();
const register = require('../lib/register');
const VError = require('verror')

router.post('/UserRegister', async (ctx, next) => {
    const Userregister = register(ctx);

    try{

        const response = await Userregister.createUser();
        console.log(response);
        ctx.body = response;
    }
    catch(err){
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }
 
     await next();

});


module.exports = router;