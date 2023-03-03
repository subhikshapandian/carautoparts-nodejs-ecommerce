const Router = require('koa-router');
const router = new Router();
const login = require('../lib/product');
const VError = require('verror')

router.get('/getProduct', async (ctx, next) => {
    const userlogin = login(ctx);

    try{
        const response = await userlogin.getProduct();
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

router.post('/insertProduct', async (ctx, next) => {
    const userlogin = login(ctx);

    try{
        const response = await userlogin.insertProduct();
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

router.post('/updateProduct', async (ctx, next) => {
    const userlogin = login(ctx);

    try{
        const response = await userlogin.updateProduct();
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

router.get('/getTopRatedProduct', async (ctx, next) => {
    const userlogin = login(ctx);

    try{
        const response = await userlogin.getProduct();
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

router.get('/getSpecialOfferProduct', async (ctx, next) => {
    const userlogin = login(ctx);

    try{
        const response = await userlogin.getProduct();
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

router.get('/getBestSellerProduct', async (ctx, next) => {
    const userlogin = login(ctx);

    try{
        const response = await userlogin.getProduct();
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

router.get('/getFeaturedProduct', async (ctx, next) => {
    const userlogin = login(ctx);

    try{
        const response = await userlogin.getFeaturedProduct();
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