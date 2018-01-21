exports.query = {

    usersFields: function (field) {


        var user = [

            { $lookup: { from: "dbusers", localField: field, foreignField: "user_id", as: "user" } },
            { "$unwind": { "path": "$user", "preserveNullAndEmptyArrays": true } },
            { $lookup: { from: "userbasicinfos", localField: "user.user_id", foreignField: "user_id", as: "basicinfos" } },
            { $lookup: { from: "settings", localField: "user.user_id", foreignField: "user_id", as: "setting" } },
            { "$unwind": { "path": "$setting", "preserveNullAndEmptyArrays": true } },
            { "$unwind": { "path": "$basicinfos", "preserveNullAndEmptyArrays": true } },
            { $lookup: { from: "countries", localField: "basicinfos.country", foreignField: "id", as: "country" } },
            { $lookup: { from: "states", localField: "basicinfos.state", foreignField: "id", as: "state" } },
            { $lookup: { from: "cities", localField: "basicinfos.city", foreignField: "id", as: "city" } },
            { $lookup: { from: "userphotos", localField: "user.user_id", foreignField: "user_id", as: "pic" } },
            { $lookup: { from: "userintrests", localField: "user.user_id", foreignField: "user_id", as: "height" } },
            { "$unwind": { "path": "$height", "preserveNullAndEmptyArrays": true } },
            { "$unwind": { "path": "$country", "preserveNullAndEmptyArrays": true } },
            { "$unwind": { "path": "$state", "preserveNullAndEmptyArrays": true } },
            { "$unwind": { "path": "$city", "preserveNullAndEmptyArrays": true } },


        ];


        var j=user.join();
        var jj=JSON.stringify(user);
        var kk=jj.replace("[", "");
        var k=kk.replace("]", "");
        var k=k.replace(/\\/g, "")
return k;













    }










}