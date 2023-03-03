
const dbconfig = require('../../common/dbConfig');

module.exports = (ctx) => {
    return {
        insertUserFeedback: () => {

            return new Promise(async (resolve, reject) => {

                const { UserId,ProductId,Reviews,Ratings } = ctx.request.body;

                let query = `INSERT INTO [dbo].[tbFeedBack]([UserId],[ProductId],[Reviews],[Ratings],[CreatedDate],[ModifiedDate]) 
                 VALUES(${UserId},${ProductId},'${Reviews}',${Ratings},GETDATE(),GETDATE());`

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
    }
}