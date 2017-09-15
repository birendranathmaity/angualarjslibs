/* @ngInject */
module.exports =function($http,ServiceUrls,$uibModal){
       
    return {
            acceptPhoto: function(data,success, error) {
                $http.post(ServiceUrls.BASEURL + ServiceUrls.ADMIN_ACCEPT_PHOTO,data).success(success).error(error);
            },
            openRejectModal:function(user){
                  var modalInstance = $uibModal.open({
                         animation: true,
                         windowClass: "login-model",
                         templateUrl: './app/admin/reject-modal/reject.modal.html',
                         controller: 'rejectController',
                         controllerAs: 'ctrl',
                         size: "lg",
                         backdrop: 'static',
                         keyboard: false,
                         resolve: {
                             user: function () {
                              return user;
                                }
                             }

        });
            }
            
        };
    };