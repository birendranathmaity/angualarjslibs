/* @ngInject */
module.exports = function PatientLookupController() {
    var controller = this;

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        controller.selectedPatient = {};
        controller.patients = [{
            "id": 1,
            "first_name": "Peter",
            "last_name": "Spencer",
            "email": "pspencer0@seesaa.net",
            "gender": "Male",
            "Address": "65844 Rieder Court",
            "doHelpRequire": false,
            "SSN": "185-41-2427",
            "image": "https://robohash.org/totamquamenim.bmp?size=50x50&set=set1"
        }, {
            "id": 2,
            "first_name": "Julie",
            "last_name": "Jones",
            "email": "jjones1@facebook.com",
            "gender": "Female",
            "Address": "3 Gerald Point",
            "doHelpRequire": true,
            "SSN": "617-03-8503",
            "image": "https://robohash.org/repellatplaceatin.bmp?size=50x50&set=set1"
        }, {
            "id": 3,
            "first_name": "Elizabeth",
            "last_name": "Perez",
            "email": "eperez2@nba.com",
            "gender": "Female",
            "Address": "56496 Longview Point",
            "doHelpRequire": false,
            "SSN": "727-00-3164",
            "image": "https://robohash.org/sinteaenim.bmp?size=50x50&set=set1"
        }, {
            "id": 4,
            "first_name": "Laura",
            "last_name": "Harris",
            "email": "lharris3@youtube.com",
            "gender": "Female",
            "Address": "5224 Golf View Pass",
            "doHelpRequire": true,
            "SSN": "597-97-6078",
            "image": "https://robohash.org/inutitaque.png?size=50x50&set=set1"
        }, {
            "id": 5,
            "first_name": "Annie",
            "last_name": "Shaw",
            "email": "ashaw4@cdbaby.com",
            "gender": "Female",
            "Address": "66308 Sutteridge Pass",
            "doHelpRequire": true,
            "SSN": "493-91-5228",
            "image": "https://robohash.org/velitsolutaest.bmp?size=50x50&set=set1"
        }, {
            "id": 6,
            "first_name": "Shawn",
            "last_name": "Andrews",
            "email": "sandrews5@constantcontact.com",
            "gender": "Male",
            "Address": "95418 Reindahl Trail",
            "doHelpRequire": true,
            "SSN": "530-58-9846",
            "image": "https://robohash.org/quirepellatfugit.png?size=50x50&set=set1"
        }, {
            "id": 7,
            "first_name": "William",
            "last_name": "Mcdonald",
            "email": "wmcdonald6@shinystat.com",
            "gender": "Male",
            "Address": "7789 Ilene Place",
            "doHelpRequire": false,
            "SSN": "464-61-8196",
            "image": "https://robohash.org/estbeataeillo.bmp?size=50x50&set=set1"
        }, {
            "id": 8,
            "first_name": "Carlos",
            "last_name": "Greene",
            "email": "cgreene7@mapquest.com",
            "gender": "Male",
            "Address": "6263 Leroy Hill",
            "doHelpRequire": true,
            "SSN": "423-34-5548",
            "image": "https://robohash.org/ducimussapientequia.bmp?size=50x50&set=set1"
        }, {
            "id": 9,
            "first_name": "Patricia",
            "last_name": "Spencer",
            "email": "pspencer8@163.com",
            "gender": "Female",
            "Address": "44 Saint Paul Pass",
            "doHelpRequire": false,
            "SSN": "966-61-5534",
            "image": "https://robohash.org/quiadoloresit.jpg?size=50x50&set=set1"
        }, {
            "id": 10,
            "first_name": "Jacqueline",
            "last_name": "Burns",
            "email": "jburns9@ucoz.ru",
            "gender": "Female",
            "Address": "3 Pearson Place",
            "doHelpRequire": false,
            "SSN": "290-75-9132",
            "image": "https://robohash.org/maximeiureillum.png?size=50x50&set=set1"
        }];
    }

};