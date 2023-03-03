const Router = require('koa-router');
const router = new Router();
const login = require('../lib/login');
const VError = require('verror')

router.get('/Userlogin', async (ctx, next) => {
    const userlogin = login(ctx);

    try{
        const response = await userlogin.getUserLogin();
        console.log(response);
        ctx.body = response;
    }
    catch(err){
        const causeErr = VError.cause(err);
        const statusCode = (causeErr && causeErr.statusCode) || err.statusCode;
        ctx.throw(statusCode || 500, err);
    }
 
     await next();

})

module.exports = router;