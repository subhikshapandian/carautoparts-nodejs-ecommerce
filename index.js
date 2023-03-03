const koa = require('koa');
const bodyparser = require('koa-bodyparser');

const app = new koa();

app.use(bodyparser());

let login = require("./src/routers/login");
let product = require("./src/routers/product");
let payment = require("./src/routers/payment");
let register = require("./src/routers/register");
let feedback = require("./src/routers/feedback");

app.use(login.routes());
app.use(product.routes());
app.use(payment.routes());
app.use(register.routes());
app.use(feedback.routes());

app.listen(8000, function () {
    console.log("server running on localhost:8000")
})