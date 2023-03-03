
const dbconfig = require('../../common/dbConfig');

module.exports = (ctx) => {
    return {
        createUser: () => {

            return new Promise(async (resolve, reject) => {

                const { UserName, EmailId, Password, PhoneNo } = ctx.request.body;

                let query = `INSERT INTO [dbo].[tbAddress] ([CreatedDate],[ModifiedDate]) VALUES(GETDATE(),GETDATE())
                 INSERT INTO [dbo].[tbUsers]([UserName],[EmailId],[Password],[AddressId],[PhoneNo],[CreatedDate],[ModifiedDate],[IsActive])
                 VALUES('${UserName}','${EmailId}','${Password}',SCOPE_IDENTITY(),'${PhoneNo}',GETDATE(),GETDATE(),1);`

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

        updateUserAddress: () => {

            return new Promise(async (resolve, reject) => {

                const { Address, Area, City, State, PinCode, LandMark, AddressId} = ctx.request.body;

                let query = `UPDATE [dbo].[tbAddress]
                SET [Address] = '${Address}',[Area] = '${Area}',[City] = '${City}',[State] = '${State}',[PinCode] = '${PinCode}',
                [LandMark] = '${LandMark}',[ModifiedDate] = GETDATE() WHERE [Id] = ${AddressId}`

                try {
                    (await dbconfig.connection).request().query(query, function (error, results) {
                        if (results) {
                            console.log(results);
                            resolve(1);
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