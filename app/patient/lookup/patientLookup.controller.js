/* @ngInject */
module.exports = function PatientLookupController() {
    var controller = this;
    controller.getBrick = getBrick;

    controller.brickTypes = {
      "profile" : {
          templateUrl: "app/patient/lookup/profileBrick.html",
          title: "Profile"
      },
        "prefs" : {
            templateUrl: "app/patient/lookup/prefsBrick.html",
            title: "Preferences"
        },
        "plan" : {
            templateUrl: "app/patient/lookup/planBrick.html",
            title: "Plan Details"
        }
    };

    activate();

    function getBrick(type) {
        return controller.brickTypes[type];
    }
    
    /**
     * Initiate Controller.
     */
    function activate() {

        controller.selectedPatient = undefined;
        controller.patients = getPatients();
    }

    function  getPatients() {
        return [{
            "profile": {
                "id": 1,
                "first_name": "Deborah",
                "last_name": "Patterson",
                "email": "dpatterson0@pinterest.com",
                "gender": "Female",
                "avatar": "https://robohash.org/esttemporarem.jpg?size=50x50&set=set1",
                "address": "5 Clemons Pass",
                "ssn": "580-13-2179",
                "phone": "387-(743)368-6287"
            },
            "plan": {
                "id": "09-421-7369",
                "name": "MedCare",
                "effective": "12/27/2016",
                "expiry": "1/21/2017",
                "provider": "Camimbo"
            },
            "emergencyHelp": false,
            "prefs": {
                "email": false,
                "phone": true,
                "text": true
            },
            "network": {
                "name": "family"
            }
        }, {
            "profile": {
                "id": 2,
                "first_name": "Lisa",
                "last_name": "Ryan",
                "email": "lryan1@wix.com",
                "gender": "Female",
                "avatar": "https://robohash.org/aexpeditaeum.png?size=50x50&set=set1",
                "address": "30961 Westridge Place",
                "ssn": "531-50-3015",
                "phone": "86-(449)495-1486"
            },
            "plan": {
                "id": "39-797-8836",
                "name": "TexMedCare",
                "effective": "11/16/2016",
                "expiry": "4/14/2016",
                "provider": "Agimba"
            },
            "emergencyHelp": true,
            "prefs": {
                "email": false,
                "phone": false,
                "text": false
            },
            "network": {
                "name": "friend"
            }
        }, {
            "profile": {
                "id": 3,
                "first_name": "Ann",
                "last_name": "Bryant",
                "email": "abryant2@marketwatch.com",
                "gender": "Female",
                "avatar": "https://robohash.org/etpossimusnon.png?size=50x50&set=set1",
                "address": "82 Forest Dale Alley",
                "ssn": "921-25-0026",
                "phone": "7-(607)103-2687"
            },
            "plan": {
                "id": "88-908-8455",
                "name": "TexMedCare",
                "effective": "11/21/2017",
                "expiry": "7/8/2017",
                "provider": "Jetwire"
            },
            "emergencyHelp": false,
            "prefs": {
                "email": false,
                "phone": true,
                "text": false
            },
            "network": {
                "name": "family"
            }
        }, {
            "profile": {
                "id": 4,
                "first_name": "Marilyn",
                "last_name": "Riley",
                "email": "mriley3@scribd.com",
                "gender": "Female",
                "avatar": "https://robohash.org/corruptiearumvelit.jpg?size=50x50&set=set1",
                "address": "237 Lillian Junction",
                "ssn": "343-81-3195",
                "phone": "7-(373)203-4612"
            },
            "plan": {
                "id": "69-930-2897",
                "name": "ClinicCare",
                "effective": "2/2/2017",
                "expiry": "8/25/2017",
                "provider": "Thoughtsphere"
            },
            "emergencyHelp": false,
            "prefs": {
                "email": false,
                "phone": true,
                "text": true
            },
            "network": {
                "name": "friend"
            }
        }, {
            "profile": {
                "id": 5,
                "first_name": "Mary",
                "last_name": "Stewart",
                "email": "mstewart4@pen.io",
                "gender": "Female",
                "avatar": "https://robohash.org/laboreconsequaturquasi.bmp?size=50x50&set=set1",
                "address": "5185 Blue Bill Park Plaza",
                "ssn": "403-47-1251",
                "phone": "249-(263)477-1393"
            },
            "plan": {
                "id": "20-245-9478",
                "name": "TexMedCare",
                "effective": "2/4/2018",
                "expiry": "9/19/2017",
                "provider": "Jayo"
            },
            "emergencyHelp": true,
            "prefs": {
                "email": true,
                "phone": true,
                "text": false
            },
            "network": {
                "name": "family"
            }
        }, {
            "profile": {
                "id": 6,
                "first_name": "Rose",
                "last_name": "Montgomery",
                "email": "rmontgomery5@imageshack.us",
                "gender": "Female",
                "avatar": "https://robohash.org/molestiaeinillum.jpg?size=50x50&set=set1",
                "address": "0646 Di Loreto Parkway",
                "ssn": "211-67-7092",
                "phone": "1-(973)644-0176"
            },
            "plan": {
                "id": "49-093-6140",
                "name": "TexMedCare",
                "effective": "1/1/2017",
                "expiry": "12/16/2016",
                "provider": "Podcat"
            },
            "emergencyHelp": false,
            "prefs": {
                "email": true,
                "phone": true,
                "text": false
            },
            "network": {
                "name": "family"
            }
        }, {
            "profile": {
                "id": 7,
                "first_name": "Beverly",
                "last_name": "Watkins",
                "email": "bwatkins6@discovery.com",
                "gender": "Female",
                "avatar": "https://robohash.org/dolorumnullaet.bmp?size=50x50&set=set1",
                "address": "97076 Vermont Trail",
                "ssn": "980-97-2353",
                "phone": "57-(176)704-2358"
            },
            "plan": {
                "id": "02-865-5139",
                "name": "MedCare",
                "effective": "8/2/2016",
                "expiry": "4/9/2016",
                "provider": "Ntags"
            },
            "emergencyHelp": true,
            "prefs": {
                "email": true,
                "phone": true,
                "text": false
            },
            "network": {
                "name": "family"
            }
        }, {
            "profile": {
                "id": 8,
                "first_name": "Donald",
                "last_name": "Reynolds",
                "email": "dreynolds7@liveinternet.ru",
                "gender": "Male",
                "avatar": "https://robohash.org/possimusnullamagnam.jpg?size=50x50&set=set1",
                "address": "96 Luster Plaza",
                "ssn": "265-70-7020",
                "phone": "86-(237)698-9786"
            },
            "plan": {
                "id": "14-592-3175",
                "name": "TexMedCare",
                "effective": "9/26/2017",
                "expiry": "3/25/2016",
                "provider": "Divape"
            },
            "emergencyHelp": true,
            "prefs": {
                "email": true,
                "phone": true,
                "text": true
            },
            "network": {
                "name": "friend"
            }
        }, {
            "profile": {
                "id": 9,
                "first_name": "Kathleen",
                "last_name": "Harris",
                "email": "kharris8@blogger.com",
                "gender": "Female",
                "avatar": "https://robohash.org/consecteturvoluptatemdignissimos.jpg?size=50x50&set=set1",
                "address": "6 Maple Wood Drive",
                "ssn": "587-18-2200",
                "phone": "84-(888)309-2416"
            },
            "plan": {
                "id": "04-388-8537",
                "name": "ClinicCare",
                "effective": "3/27/2016",
                "expiry": "9/20/2016",
                "provider": "Ntag"
            },
            "emergencyHelp": false,
            "prefs": {
                "email": true,
                "phone": true,
                "text": false
            },
            "network": {
                "name": "family"
            }
        }, {
            "profile": {
                "id": 10,
                "first_name": "Andrea",
                "last_name": "Gibson",
                "email": "agibson9@last.fm",
                "gender": "Female",
                "avatar": "https://robohash.org/illumsapienteassumenda.bmp?size=50x50&set=set1",
                "address": "3 Sunbrook Terrace",
                "ssn": "470-25-4854",
                "phone": "86-(791)496-2856"
            },
            "plan": {
                "id": "54-170-5748",
                "name": "ClinicCare",
                "effective": "11/10/2016",
                "expiry": "10/24/2017",
                "provider": "Ainyx"
            },
            "emergencyHelp": false,
            "prefs": {
                "email": false,
                "phone": true,
                "text": false
            },
            "network": {
                "name": "friend"
            }
        }];
    }

};