/* @ngInject */
module.exports =function(toaster){
   
 return {
    success: function(msg){
     
       
        toaster.success(msg);
    },
    error:function(msg){
        
         toaster.error(msg);
     },
};
};