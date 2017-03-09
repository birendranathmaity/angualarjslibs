/* @ngInject */
module.exports = function MedicineController() {
    var controller = this;
    controller.editMedicine = editMedicine;
    controller.saveMedicine = saveMedicine;
    controller.updateMedicine = updateMedicine;

    activate();


    /**
     * Initiate Controller.
     */
    function activate() {
        controller.medicine = getMockMedicine();
        controller.frequencyOptions = ["Daily Once", "Daily Twice", "Daily Thrice"];
    }

    function getMockMedicine() {
        return {
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
        };
    }

    function editMedicine(medicine) {
        medicine.edited = true;
    }

    function saveMedicine(medicine) {
        medicine.edited = false;
    }

    function updateMedicine() {
        console.log("Medicine updated successfully!", controller.medicine);
    }
};
