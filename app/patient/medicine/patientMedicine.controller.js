/* @ngInject */
module.exports = function PatientMedicineController() {
    var controller = this;

    activate();


    /**
     * Initiate Controller.
     */
    function activate() {
        controller.medicines = getMockMedicines();
    }

    function getMockMedicines() {
        return [{
            "id": 1,
            "prescription": "Benzalkonium Chloride",
            "dosage": {
                "time1": "10:24 AM",
                "time2": "3:46 PM"
            },
            "comments": null,
            "status": "Active"
        },{
            "id": 2,
            "prescription": "norethindrone and ethinyl estradiol",
            "dosage": {
                "time1": "9:34 AM",
                "time2": "6:59 PM"
            },
            "comments": null,
            "status": "Active"
        },{
            "id": 3,
            "prescription": "Cefpodoxime Proxetil",
            "dosage": {
                "time1": "9:45 AM",
                "time2": "11:45 PM"
            },
            "comments": null,
            "status": "Ends Soon"
        },{
            "id": 4,
            "prescription": "Promethazine Hydrochloride",
            "dosage": {
                "time1": "10:56 AM",
                "time2": "2:11 PM"
            },
            "comments": null,
            "status": "Ends Soon"
        },{
            "id": 5,
            "prescription": "BENZALKONIUM CHLORIDE",
            "dosage": {
                "time1": "7:27 AM",
                "time2": "8:57 PM"
            },
            "comments": null,
            "status": "Active"
         }];
    }
};
