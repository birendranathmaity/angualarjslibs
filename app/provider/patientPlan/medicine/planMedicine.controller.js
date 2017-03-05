/* @ngInject */
module.exports = function PlanMedicineController() {
    var controller = this;
    controller.editMedicine = editMedicine;
    controller.saveMedicine = saveMedicine;

    activate();


    /**
     * Initiate Controller.
     */
    function activate() {
        controller.medicines = getMockMedicines();
        controller.frequencyOptions = ["Daily Once", "Daily Twice", "Daily Thrice"];
    }

    function getMockMedicines() {
        return [{
            "id": 1,
            "prescription": "Benzalkonium Chloride",
            "startDate" : "02/20/2017",
            "dosage": {
                "frequency": "Daily Once",
                "time1": "10:24 AM",
                "time2": "3:46 PM"
            },
            "comments": null,
            "status": "Active",
            "edited": false
        },{
            "id": 2,
            "prescription": "norethindrone and ethinyl estradiol",
            "dosage": {
                "frequency": "Daily Twice",
                "time1": "9:34 AM",
                "time2": "6:59 PM"
            },
            "comments": null,
            "status": "Active",
            "edited": false
        },{
            "id": 3,
            "prescription": "Cefpodoxime Proxetil",
            "dosage": {
                "frequency": "Daily Thrice",
                "time1": "9:45 AM",
                "time2": "11:45 PM"
            },
            "comments": null,
            "status": "Ends Soon",
            "edited": false
        },{
            "id": 4,
            "prescription": "Promethazine Hydrochloride",
            "dosage": {
                "frequency": "Daily Once",
                "time1": "10:56 AM",
                "time2": "2:11 PM"
            },
            "comments": null,
            "status": "Ends Soon",
            "edited": false
        },{
            "id": 5,
            "prescription": "BENZALKONIUM CHLORIDE",
            "dosage": {
                "frequency": "Daily Twice",
                "time1": "7:27 AM",
                "time2": "8:57 PM"
            },
            "comments": null,
            "status": "Active",
            "edited": false
         }];
    }

    function editMedicine(medicine) {
        medicine.edited = true;
    }

    function saveMedicine(medicine) {
        medicine.edited = false;
    }
};
