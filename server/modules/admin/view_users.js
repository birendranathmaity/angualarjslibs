var User=require('./../registration_login/model/user.model');

exports.getallActiveUsers=function(req,res){


//  User.find({},null,{sort: {created_on: -1 }},function(err,result){
// res.json({
// users:result

// });

//  });
var options = {
 
  sort: { created_on: -1 },
  
  page: req.body.page, 
  limit: req.body.limit
};

User.paginate({}, options, function(err, result) {
  // result.docs
  // result.total
  // result.limit - 10
  // result.page - 3
  // result.pages

  res.json(result);
});

};