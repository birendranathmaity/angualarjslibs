var User=require('./../registration_login/model/user.model');

exports.getallActiveUsers=function(req,res){


//  User.find({},null,{sort: {created_on: -1 }},function(err,result){
// res.json({
// users:result

// });

//  });
  var aggregate = User.aggregate(
        [
{ "$sort": { created_on: -1 }},
{ $match: { user_status: "INPROGRESS" } },
   {   "$project": {     
          
            "user_id": "$user_id",
            "first_name" :"$first_name",
            "last_name":"$last_name",
            "age":"$age",
            "created_on":"$created_on"
        }}, 
    {
      $lookup:
        {
         from: "userintrests",
        localField: "user_id",
        foreignField: "user_id",
        as: "height"
        }
   },
   {
  $unwind: "$height"
},
 {$addFields:{"height": "$height.height"}}

]
    );
var options = {
  page: req.body.page, 
  limit: req.body.limit
};
  User.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
  if(err) 
  {
      res.json(err);
    console.err(err)
  }
  else
  { 
     var docs={
          docs:results,
          pages:pageCount,
          total:count

      };
      res.json(docs);
  }
});

// User.paginate({}, options, function(err, result) {
//   // result.docs
//   // result.total
//   // result.limit - 10
//   // result.page - 3
//   // result.pages

//   res.json(result);
// });

};

exports.getallinActiveUsers=function(req,res){
    var aggregate = User.aggregate(
        [
           { "$sort": { created_on: -1 }},
   {   "$project": {     
          
            "user_id": "$user_id",
            "first_name" :"$first_name",
            "age":"$age",
            "created_on":"$created_on"
        }}, 
    {
      $lookup:
        {
         from: "userintrests",
        localField: "user_id",
        foreignField: "user_id",
        as: "height"
        }
   },
   {
  $unwind: "$height"
},
 {$addFields:{"height": "$height.height"}}

//    { $match:
//        { 
//             age : {'$gte' : 40 } 
//        }
//    }
]
    );
   // . aggregate.match({age : {'$gt' : 40 } })
    // .aggregate.lookup({
    //         from: "userintrests",
    //         localField: "user_id",
    //         foreignField: "user_id",
    //         as: "height"
    //     });
  //  .aggregate.$sort( { created_on: -1 });
      var options = {
  page: 1, 
  limit: 5
};
        User.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
  if(err) 
  {
      res.json(err);
    console.err(err)
  }
  else
  { 
       var docs={
          docs:results,
          pages:pageCount,
          total:count

      };
      res.json(docs);
  }
});

// User.aggregate(
//     [
       
//     {
//     $lookup: {
//            from: "userintrests",
//             localField: "user_id",
//             foreignField: "user_id",
//             as: "height"
//         }
// }
//     ],
//     function(err,result) {
//  res.json(aggregate);
//        // Result is an array of documents
//     }
// );
};
function UserProfileUpdate(userId,update,res){
 User.findOneAndUpdate({
       user_id: userId
    }, update, {
        new: true
    }, function(err, user) {

        res.json({
                success: true,
                user:user
              
            });
        // if(user.created_by==="ADMIN"){
        //         res.json({
        //         success: true,
        //         msg: ""
        //     });
        // }
        // else{
        //    createToken(res, user);
        // }

        
    });
};
exports.adminAccept=function(req,res){

User.update(
    {user_id : {$in: req.body.user_ids}}, 

  {$set : {user_status : "ACTIVE"}},
  {multi : true},

  function(err, docs) {
   res.json({
                success: true,
                users:docs
              
            });
});

};