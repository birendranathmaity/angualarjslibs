/*
* Showing online users using Nodejs and Socket.io
* @author Birendranath Maity
*/

'use strict';

//const helper = require('./helper');
var regisLogin = require('./modules/registration_login/registration_login');
class Socket{

    constructor(socket){
        this.io = socket;
    }
   
    socketEvents(){

        this.io.on('connection', (socket) => {

            

            /**
            * get the user's Chat list
            */
            // socket.on('chat-list', (data) => {

            //    let chatListResponse = {};

            //     if (data.userId == '') {

            //         chatListResponse.error = true;
            //         chatListResponse.message = `User does not exits.`;
                    
            //         this.io.emit('chat-list-response',chatListResponse);

            //     }else{

            //         // helper.getUserInfo( data.userId,(err, UserInfoResponse)=>{

            //         //     delete UserInfoResponse.password;
            //         //     delete UserInfoResponse.timestamp;
                        
            //         //     helper.getChatList(data.userId, (err, response)=>{
                            
            //         //         this.io.to(socket.id).emit('chat-list-response',{
            //         //             error : false ,
            //         //             singleUser : false ,
            //         //             chatList : response === null ? null : response.users
            //         //         });

            //         //         if (response !== null) {
            //         //             let chatListIds = response.socketIds;
            //         //             chatListIds.forEach( (Ids)=>{
            //         //                 this.io.to(Ids.socketId).emit('chat-list-response',{
            //         //                     error : false ,
            //         //                     singleUser : true ,
            //         //                     chatList : UserInfoResponse
            //         //                 });
            //         //             });
            //         //         }
            //         //     });
            //         // });
            //     }
            // });
            
            /**
            * Logout the user
            */
            socket.on('logout',(data)=>{

                const userId = data.user_id;
                socket.disconnect();
                // regisLogin.logout(userId , (error, result)=>{
                //     // this.io.to(socket.id).emit('logout-response',{
                //     //     error : false
                //     // });
                //     socket.disconnect();
                // }); 
            });


            /**
            * sending the disconnected user to all socket users. 
            */
            socket.on('disconnect',()=>{
                console.log("disconnect")
                setTimeout(()=>{
                    regisLogin.isUserLoggedOut(socket.id,(response)=>{
                        if (response.loggedOut) {
                            // socket.broadcast.emit('chat-list-response',{
                            //     error : false ,
                            //     userDisconnected : true ,
                            //     socketId : socket.id
                            // });
                        }
                    });
                },1000);
            });

        });

    }
    
    socketConfig(){

        this.io.use(function(socket, next) {
          let user_id = socket.request._query['user_id'];
          console.log(user_id)
            let userSocketId = socket.id;
            const data = {
                user_id : user_id,
                value : {
                    $set :{
                        socket_id : userSocketId,
                        online : 'Y'
                    }
                }
            }

            regisLogin.addSocketId( data ,(error,response)=>{
                
                next();
            });
        });

        this.socketEvents();
    }
}
module.exports = Socket;