/* @ngInject */
module.exports =function(toaster,$filter){
   
 return {
    success: function(key){
     
        var msg= $filter('translate')(key);
        toaster.success(msg);
    },
    error:function(key){
         var msg= $filter('translate')(key);
         toaster.error(msg);
     },
};
};