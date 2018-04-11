var isAuthenticated = loginservice.isAuthenticated();

            var role;

            if (isAuthenticated.isAuth && isAuthenticated.role) {

                role = isAuthenticated.role;
                if (role === "FREEUSER" && !isAuthenticated.more_info_vr) {
                    $location.path('/moreinfo');
                   
                    return;
                }
                if (role === "FREEUSER" && isAuthenticated.more_info_vr) {
                   // $location.path('/dashboard');
                  // console.log(toState.name)
                    return;
                }
                if (role === "FREEUSER" && toParams.permisstion === "ALLUSER") {
                  
                    return;

                }
                if (role === "FREEUSER" && toParams.permisstion === "NOACTION") {
                    
                    return;

                }

                if (role === "ADMIN" && toParams.permisstion === "ADMIN") {

                    return;
                }
                if (role === "ADMIN" && toParams.permisstion === "NOACTION") {

                    return;
                }
                if (role === "ADMIN" && toParams.permisstion === "ALLUSER") {

                    event.preventDefault();
                    return;
                }

                if (role === "ADMIN" && toParams.permisstion !== "ADMIN") {
                    $location.path("/404");
                    return;

                }

            }
            if (!isAuthenticated.isAuth && !isAuthenticated.role) {
                // console.log("no login and no role")

                $location.path("/register");
                return;
            }
            event.preventDefault();


            if (isAuthenticated.isAuth && !isAuthenticated.role) {

                loginservice
                    .getAuthObject()
                    .then(function (user) {
                        if (user.user_role === "FREEUSER" && !user.more_info_vr) {
                           
                            $state.go("moreinfo", toParams);
                            return;
                        }
                        if (user.user_role === "FREEUSER" && user.more_info_vr) {
                           
                            if(toState.name==="moreinfo"){
                                $state.go("root.dashboard", toParams);
                                return;
                            }
                            else{
                                //console.log(toState.name)
                                $state.go(toState.name, toParams);
                            }
                            // 
                            
                         }
                        if (user.user_role) {

                            if (user.user_role === "FREEUSER" && toParams.permisstion === "ALLUSER") {
                                $state.go(toState, toParams);
                                return;

                            }
                            if (user.user_role === "FREEUSER" && toParams.permisstion === "ADMIN") {

                                $state.go("root.404");
                                return;
                            }
                            if (user.user_role === "FREEUSER" && toParams.permisstion === "NOACTION") {
                                $state.go(toState, toParams);
                                return;
                            }
                            if (user.user_role === "ADMIN" && toParams.permisstion === "ADMIN") {

                                $state.go(toState, toParams);
                                return;
                            }
                            if (user.user_role === "ADMIN" && toParams.permisstion === "ALLUSER") {

                                $state.go("root.404");
                                return;
                            }
                            if (user.user_role === "ADMIN" && toParams.permisstion === "NOACTION") {
                                $state.go(toState, toParams);
                                return;
                            }
                            if (user.user_role === "ADMIN" && toParams.permisstion !== "ALLUSER") {
                                $state.go(toState, toParams);

                                return;
                            }

                        }
                    });


            }