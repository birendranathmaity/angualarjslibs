/* @ngInject */
module.exports =function($http,ServiceUrls, $rootScope){
    let socket = null;
   // io.connect('http://localhost:4000');
 return {
    connect: function(user_id){
       
        socket = io.connect(ServiceUrls.BASEURL,{query: `user_id=${user_id}`});
    },
    on: function (eventName, callback) {
        socket.on(eventName, function () {  
            var args = arguments;
            $rootScope.$apply(function () {
                  callback.apply(socket, args);
            });
          });
    },
    emit: function (eventName, data, callback) {
          socket.emit(eventName, data, function () {
            var args = arguments;
            $rootScope.$apply(function () {
                  if (callback) {
                    callback.apply(socket, args);
                  }
            });
          })
    },
      getUser: function(data,success, error) {
             $http.post(ServiceUrls.BASEURL + ServiceUrls.GET_USER,data).success(success).error(error);
         }
         
         
     };
 };