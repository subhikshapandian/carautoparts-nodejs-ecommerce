const Router = require('koa-router');
const router = new Router();
const feedback = require('../lib/feedback');
const VError = require('verror')

router.post('/UserFeedback', async (ctx, next) => {
    const Userfeedback = feedback(ctx);

    try{

        const response = await Userfeedback.insertUserFeedback();
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