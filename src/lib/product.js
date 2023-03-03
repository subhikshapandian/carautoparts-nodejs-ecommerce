
const dbconfig = require('../../common/dbConfig');

module.exports = (ctx) => {
    return {
        getProduct: () => {

            return new Promise(async (resolve, reject) => {

                const { ProductNo, Description } = ctx.request.query;

                let query = ``;

                if (ProductNo == undefined && Description == undefined) {
                    query = `SELECT [Id],[FileName],[ProductNo],[Description],[CategoryTypeId],[Price],[InStock],[CreatedDate],[ModifiedDate]FROM [dbo].[tbProduct]`
                }
                else {
                    query = `SELECT [Id],[FileName],[ProductNo],[Description],[CategoryTypeId],[Price],[InStock],[CreatedDate],[ModifiedDate]FROM [dbo].[tbProduct] 
                    where [ProductNo] like '%${ProductNo}%' or [Description] like '%${Description}%' `
                }

                try {
                    (await dbconfig.connection).request().query(query, function (error, results) {
                        if (results) {
                            console.log(results);
                            resolve(results.recordset);
                        }
                        else {
                            console.log(error);
                        }
                    });
                }
                catch (err) {
                    reject(err);
                }

            })
        },
        insertProduct: () => {

            return new Promise(async (resolve, reject) => {

                const { FileName, ProductNo, Description, CategoryTypeId, Price, InStock } = ctx.request.body;

                let query = ` INSERT INTO [dbo].[tbProduct]
                   ([FileName],[ProductNo],[Description],[CategoryTypeId],[Price],[InStock],[CreatedDate],[ModifiedDate])
                    VALUES('${FileName}','${ProductNo}','${Description}',${CategoryTypeId},'${Price}',${InStock},GETDATE(),GETDATE());`

                try {
                    (await dbconfig.connection).request().query(query, function (error, results) {
                        if (results) {
                            console.log(results);
                            resolve(results);
                        }
                        else {
                            console.log(error);
                        }
                    });
                }
                catch (err) {
                    reject(err);
                }

            })
        },
        updateProduct: () => {

            return new Promise(async (resolve, reject) => {

                const { Id, FileName, ProductNo, Description, CategoryTypeId, Price, InStock } = ctx.request.body;

                let query = ` UPDATE [dbo].[tbProduct]
                    SET [FileName] = '${FileName}',[ProductNo] = '${ProductNo}',[Description] = '${Description}'
                    ,[CategoryTypeId] = ${CategoryTypeId},[Price] = '${Price}'
                    ,[InStock] = ${InStock},[ModifiedDate] = GETDATE() WHERE Id = ${Id}`

                try {
                    (await dbconfig.connection).request().query(query, function (error, results) {
                        if (results) {
                            console.log(results);
                            resolve(results);
                        }
                        else {
                            console.log(error);
                        }
                    });
                }
                catch (err) {
                    reject(err);
                }

            })
        },
        getTopRatedProduct: () => {

            return new Promise(async (resolve, reject) => {

                let query = `SELECT top 3 pro.[Id],[FileName],[ProductNo],[Description],[CategoryTypeId],[Price],[InStock],fb.Ratings
                    FROM [dbo].[tbProduct] pro
                    Left JOIN [dbo].[tbFeedBack] fb on fb.ProductId = pro.Id
                    order by fb.Ratings desc;`

                try {
                    (await dbconfig.connection).request().query(query, function (error, results) {
                        if (results) {
                            console.log(results);
                            resolve(results.recordset);
                        }
                        else {
                            console.log(error);
                        }
                    });
                }
                catch (err) {
                    reject(err);
                }

            })
        },
        getSpecialOfferProduct: () => {

            return new Promise(async (resolve, reject) => {

                let query = `SELECT top 3 pro.[Id],[FileName],[ProductNo],[Description],[CategoryTypeId],[Price],[InStock],dis.discountpercent
                FROM [dbo].[tbProduct] pro
                inner JOIN [dbo].[tbDiscount] dis on dis.ProductId = pro.Id
                order by dis.discountpercent desc;`

                try {
                    (await dbconfig.connection).request().query(query, function (error, results) {
                        if (results) {
                            console.log(results);
                            resolve(results.recordset);
                        }
                        else {
                            console.log(error);
                        }
                    });
                }
                catch (err) {
                    reject(err);
                }

            })
        },
        getBestSellerProduct: () => {

            return new Promise(async (resolve, reject) => {

                let query = `SELECT top 3 pro.[Id],[FileName],[ProductNo],[Description],[CategoryTypeId],[Price],[InStock],oitem.Quantity
                FROM [dbo].[tbProduct] pro
                inner JOIN [dbo].[tbOrderItem] oitem on oitem.ProductId = pro.Id
                order by oitem.Quantity desc;`

                try {
                    (await dbconfig.connection).request().query(query, function (error, results) {
                        if (results) {
                            console.log(results);
                            resolve(results.recordset);
                        }
                        else {
                            console.log(error);
                        }
                    });
                }
                catch (err) {
                    reject(err);
                }

            })
        },
        getFeaturedProduct: () => {

            return new Promise(async (resolve, reject) => {

                let query = `SELECT top 5 pro.[Id],[FileName],[ProductNo],[Description],[CategoryTypeId],[Price],[InStock]
                FROM [dbo].[tbProduct] pro
                left JOIN [dbo].[tbFeedBack] fb on fb.ProductId = pro.Id
                left JOIN [dbo].[tbOrderItem] oitem on oitem.ProductId = pro.Id
                order by oitem.Quantity desc,fb.Ratings desc;`

                try {
                    (await dbconfig.connection).request().query(query, function (error, results) {
                        if (results) {
                            console.log(results);
                            resolve(results.recordset);
                        }
                        else {
                            console.log(error);
                        }
                    });
                }
                catch (err) {
                    reject(err);
                }

            })
        },
    }
}