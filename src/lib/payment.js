const dbconfig = require('../../common/dbConfig');

module.exports = (ctx) => {
    return {
        createPayment: () => {

            return new Promise(async (resolve, reject) => {

                const { UserId, Amount, DiscountAmount, TotalAmount,PaymentType,Status } = ctx.request.body;

                let query = `INSERT INTO [dbo].[tbPayment]
                ([UserId],[Amount],[DiscountAmount],[TotalAmount],[PaymentType],[Status],[CreatedDate],[ModifiedDate])
                VALUES (${UserId},'${Amount}','${DiscountAmount}','${TotalAmount}','${PaymentType}',${Status},GETDATE(),GETDATE());

                INSERT INTO [dbo].[tbOrderDetail]([UserId],[PaymentId],[ProductTrackingId],[CreatedDate],[ModifiedDate])
                VALUES(${UserId},SCOPE_IDENTITY(),1,GETDATE(),GETDATE());
                select SCOPE_IDENTITY() as Id`

                try {
                    (await dbconfig.connection).request().query(query, function (error, results) {
                        if (results) {
                            console.log(results);
                            resolve(results.recordset[0]?.Id);
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
        insertOrderedItems: (Id) => {

            return new Promise(async (resolve, reject) => {

                const {OrderedItems} = ctx.request.body;

                let query = ``;

                OrderedItems.forEach(data => {
                    query = query + `INSERT INTO [dbo].[tbOrderItem]([OrderDetailId],[UserId],[ProductId],[Quantity],[CreatedDate],[ModifiedDate])
                    VALUES(${Id},${data.UserId},${data.ProductId},${data.Quantity},GETDATE(),GETDATE());`
                });
               
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
        getOrderedDetail: () => {

            return new Promise(async (resolve, reject) => {

                const {UserId} = ctx.request.query;

                let query = `SELECT od.[UserId],[ProductId],[Quantity],od.[CreatedDate],pay.TotalAmount,pay.PaymentType,od.ProductTrackingId
                ,pt.Name,pro.FileName,pro.ProductNo,pro.Description
                FROM [tbOrderItem] oitem
                INNER JOIN [tbOrderDetail] od on od.Id = oitem.OrderDetailId
                INNER JOIN [tbPayment] pay on pay.Id = od.Paymentid
                INNER JOIN [tbProductTracking] pt on pt.Id = od.ProductTrackingId
                INNER JOIN [tbProduct] pro on pro.Id = oitem.ProductId
                where pay.UserId = ${UserId}`

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