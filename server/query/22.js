db.getCollection('requests').aggregate([

    { "$project": {

        "customfield": {

            "$cond": { 

                "if": { 
                    
                    "$and": [ 
                              { "$eq": ["$user_id", "DB22712"] },
                               { "$eq": ["$request_status", "UNREAD"] },
                               { "$ne": ["$request_action", "PENDING"] }
                              
                              
                          ]
                   
                    
                    
                    }, 

                "then": {
                    id:"$request_user_id",
                    date:"$recived_on"
                    },

                "else": {

                    "$cond": {

                        "if": { 
                             
                    "$and": [ 
                              { "$eq": ["$request_user_id", "DB22712"] },
                               { "$eq": ["$request_status", "UNREAD"] }
                              
                              
                              
                          ]
                            
                           
                               
                               }, 

                        "then":{
                    id:"$user_id",
                    date:"$created_on"
                            
                    
                    },

                        else: "$noval"

                    }

                }

            }

        }

    }},
    { 
    $match: { 
       "customfield": { $exists: true },
    }
},

  { $sort: { "customfield.date": -1 } },     
{ $lookup: { from: "dbusers", localField: "customfield.id", foreignField: "user_id", as: "user" } },



        { "$unwind": { "path": "$user", "preserveNullAndEmptyArrays": true } },

        { $lookup: { from: "userbasicinfos", localField: "user.user_id", foreignField: "user_id", as: "basicinfos" } },

 { $lookup: { from: "settings", localField: "user.user_id", foreignField: "user_id", as: "setting" } },


{ "$unwind": { "path": "$setting", "preserveNullAndEmptyArrays": true } },

        { "$unwind": { "path": "$basicinfos", "preserveNullAndEmptyArrays": true } },

 { $lookup: { from: "requests", localField: "user.user_id", foreignField: "request_user_id", as: "request" } },
 
 
//     { "$unwind": { "path": "$request", "preserveNullAndEmptyArrays": true } },

     
//  { $match: { $or: [
//       { 'request.request_type': { $exists: false } },
//      {
//      $and:[
//          {'request.user_id':{ $eq: "DB22712" }},
//      {'request.request_user_id':{ $eq: "$user.user_id" }},
//      {'request.request_type':{ $eq: "PHOTO" }},
//      {'request.request_action':{ $eq: "ACCEPTED" }}
//      
//          ]
//     } 
//     
//    
//      
//      
//      ] } },
    
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
                "date":"$customfield.date",

                "user": {



                    "user_id": "$customfield.id",



                    "first_name": "$user.first_name",



                    "last_name": "$user.last_name",



                    "age": "$user.age",



                    "height": "$height.height",



                    "country": "$country.name",



                    "state": "$state.name",



                    "city": "$city.name",

                    
                     "pic": {

            "$cond": { 

                "if": { 
                    
                    "$and": [ 
                              { "$eq": ["$setting.photo", "YES"] },
                               
                              
                              
                          ]
                   
                    
                    
                    }, 

                "then": "$pic",

                "else": "NO"

            }

        }

                },



               







            }

        }
       

])