/* @ngInject */
module.exports = function ExerciseMindfulnessController() {
    var controller = this;
    controller.updateExercise = updateExercise;

    activate();


    /**
     * Initiate Controller.
     */
    function activate() {
        controller.exercise = getMockExercise();
        controller.frequencyOptions = ["Daily Once", "Daily Twice", "Daily Thrice"];
    }

    function getMockExercise() {
        return {
            "id": 1,
            "for": "Relaxation",
            "url": "/audio/mindfulness/FreeMindfulness3MinuteBreathing.mp3",
            "startDate": "02/20/2017",
            "frequency": "Daily Once",
            "comments": null,
            "status": "Active",
            "edited": false
        };
    }



    function updateExercise() {
        console.log("Exercise updated successfully!", controller.exercise);
    }
};
