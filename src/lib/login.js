
const dbconfig = require('../../common/dbConfig');

module.exports = (ctx) => {
    return {
        getUserLogin: () => {

            return new Promise(async (resolve, reject) => {

                const { EmailId, Password } = ctx.request.query;
           
               let query = `SELECT [Id],[UserName],[EmailId],[Password],[AddressId],[PhoneNo],[CreatedDate],[ModifiedDate],[IsActive] FROM [dbo].[tbUsers] where [EmailId]='${EmailId}' and [Password]='${Password}';`
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