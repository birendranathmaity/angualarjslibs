db.getCollection('requests').aggregate([
    { "$project": {
       "request_status": "$request_status",
                "request_type": "$request_type",
                "request_action": "$request_action",
        "customfield": {
            
            
            "$cond": { 
                "if": { "$eq": [ "$user_id", "DB22712" ] }, 
                "then": "$request_user_id",
                "else": {
                    "$cond": {
                        "if": { "$eq": ["$request_user_id","DB22712"]}, 
                        "then": "$user_id", 
                        else: "$noval"
                    }
                }
            }
        }
    }},
      { $lookup: { from: "dbusers", localField: "customfield", foreignField: "user_id", as: "user" } },

        { "$unwind": { "path": "$user", "preserveNullAndEmptyArrays": true } },
        { $lookup: { from: "userbasicinfos", localField: "user.user_id", foreignField: "user_id", as: "basicinfos" } },


        { "$unwind": { "path": "$basicinfos", "preserveNullAndEmptyArrays": true } },


        { $lookup: { from: "countries", localField: "basicinfos.country", foreignField: "id", as: "country" } },

        { $lookup: { from: "states", localField: "basicinfos.state", foreignField: "id", as: "state" } },

        { $lookup: { from: "cities", localField: "basicinfos.city", foreignField: "id", as: "city" } },

        { $lookup: { from: "userphotos", localField: "user.user_id", foreignField: "user_id", as: "pic" } },
        { $lookup: { from: "userintrests", localField: "user.user_id", foreignField: "user_id", as: "height" } },


        { "$unwind": { "path": "$height", "preserveNullAndEmptyArrays": true } },
        // { "$unwind": { "path": "$pic", "preserveNullAndEmptyArrays": true } },

        { "$unwind": { "path": "$country", "preserveNullAndEmptyArrays": true } },

        { "$unwind": { "path": "$state", "preserveNullAndEmptyArrays": true } },

        { "$unwind": { "path": "$city", "preserveNullAndEmptyArrays": true } },
        { "$unwind": { "path": "$pic", "preserveNullAndEmptyArrays": true } },
        { $match: { $or: [{ 'pic.photo_type': { $eq: "PROFILE", $exists: true } }, { 'pic': { $exists: false } }] } },



        {
            $project: {

                "_id": 1,
                "request_status": "$request_status",
                "request_type": "$request_type",
                "request_action": "$request_action",
                "user": {

                    "user_id": "$customfield",

                    "first_name": "$user.first_name",

                    "last_name": "$user.last_name",

                    "age": "$user.age",

                    "height": "$height.height",

                    "country": "$country.name",

                    "state": "$state.name",

                    "city": "$city.name",
                    "pic": "$pic"
                },

               



            }
        }
])