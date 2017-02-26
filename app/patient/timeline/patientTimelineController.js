var _ = require('lodash');

/* @ngInject */
module.exports = function PatientTimelineController() {
    var controller = this;
    var filterMenu = '#filter-menu-circular';
    controller.getIconClass = getIconClass;

    controller.typeIconMapping = {
        chat :          { icon: "comments", name: "Chat" },
        questionnaire:  { icon: "list-alt", name: "Questionnaire" },
        medicine:       { icon: "medkit", name: "Medicine" },
        reminder:       { icon: "bell", name: "Reminder" },
        activity:       { icon: "universal-access", name: "Activity" },
        permissions:       { icon: "user-md", name: "Provider" },
        emergency:      { icon: "exclamation-triangle", name: "Emergency"},
        success: { icon: "check-circle"},
        warning: { icon: "exclamation"},
        danger: { icon: "exclamation-triangle"}
    };

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        controller.events = getPatientEvents();
        //controller.getTypes = getTypes();

        initiateCircularMenu();
        triggerFilterSearch();
        addClickEventToFilterSearch();
    }

    // function getTypes() {
    //
    //     return eventTypes;
    // }

    /**
     * Get icon class from type, icon mapping
     * @param type
     * @returns {string}
     */
    function getIconClass(type) {
        if(!(type && controller.typeIconMapping[type])) {
            return ;
        }
        return 'fa fa-'+controller.typeIconMapping[type].icon;
    }

    /**
     * Trigger filter menu on click
     */
    function triggerFilterSearch() {
        $(filterMenu).circleMenu('open');
    }

    function addClickEventToFilterSearch() {
        $(filterMenu).circleMenu({trigger:'click'});
    }

    function initiateCircularMenu() {

        //Initiate circular menu
        $(filterMenu).circleMenu({
            item_diameter: 20,
            circle_radius: 100,
            direction: 'bottom-left'
        });

        //prevent default of a
        $('a', filterMenu).on('click',function(evt){if($(this).attr('href')==='#'){evt.preventDefault();}});
    }

    function getPatientEvents() {
        return [{
            "id": 1,
            "type": "medicine",
            "status": "warning",
            "title": "Phasellus id sapien in sapien iaculis congue.",
            "dt": {
                "date": "6/19/2016",
                "time": "6:55 PM"
            }
        }, {
            "id": 2,
            "type": "emergency",
            "status": "danger",
            "title": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.",
            "dt": {
                "date": "5/28/2016",
                "time": "1:33 PM"
            }
        }, {
            "id": 3,
            "type": "activity",
            "status": "success",
            "title": "Nulla nisl.",
            "dt": {
                "date": "2/23/2016",
                "time": "3:11 PM"
            }
        }, {
            "id": 4,
            "type": "medicine",
            "status": "warning",
            "title": "Donec semper sapien a libero.",
            "dt": {
                "date": "4/11/2016",
                "time": "9:25 PM"
            }
        }, {
            "id": 5,
            "type": "permissions",
            "status": "warning",
            "title": "Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.",
            "dt": {
                "date": "12/10/2016",
                "time": "11:51 PM"
            }
        }, {
            "id": 6,
            "type": "emergency",
            "status": "warning",
            "title": "Aliquam quis turpis eget elit sodales scelerisque.",
            "dt": {
                "date": "10/28/2016",
                "time": "9:52 PM"
            }
        }, {
            "id": 7,
            "type": "activity",
            "status": "danger",
            "title": "Integer non velit.",
            "dt": {
                "date": "5/6/2016",
                "time": "8:41 PM"
            }
        }, {
            "id": 8,
            "type": "medicine",
            "status": "warning",
            "title": "Vivamus vel nulla eget eros elementum pellentesque.",
            "dt": {
                "date": "8/30/2016",
                "time": "10:05 PM"
            }
        }, {
            "id": 9,
            "type": "reminder",
            "status": "success",
            "title": "Etiam faucibus cursus urna.",
            "dt": {
                "date": "9/18/2016",
                "time": "4:24 PM"
            }
        }, {
            "id": 10,
            "type": "reminder",
            "status": "danger",
            "title": "Donec posuere metus vitae ipsum.",
            "dt": {
                "date": "9/1/2016",
                "time": "1:42 PM"
            }
        }, {
            "id": 11,
            "type": "medicine",
            "status": "danger",
            "title": "Nulla mollis molestie lorem.",
            "dt": {
                "date": "1/1/2017",
                "time": "9:52 PM"
            }
        }, {
            "id": 12,
            "type": "questionnaire",
            "status": "danger",
            "title": "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
            "dt": {
                "date": "3/28/2016",
                "time": "10:21 PM"
            }
        }, {
            "id": 13,
            "type": "chat",
            "status": "success",
            "title": "Nulla tellus.",
            "dt": {
                "date": "4/2/2016",
                "time": "9:15 PM"
            }
        }, {
            "id": 14,
            "type": "medicine",
            "status": "danger",
            "title": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
            "dt": {
                "date": "5/4/2016",
                "time": "12:32 PM"
            }
        }, {
            "id": 15,
            "type": "chat",
            "status": "success",
            "title": "Morbi non quam nec dui luctus rutrum.",
            "dt": {
                "date": "1/2/2017",
                "time": "2:12 PM"
            }
        }, {
            "id": 16,
            "type": "chat",
            "status": "warning",
            "title": "Maecenas tincidunt lacus at velit.",
            "dt": {
                "date": "10/28/2016",
                "time": "1:12 PM"
            }
        }, {
            "id": 17,
            "type": "questionnaire",
            "status": "warning",
            "title": "Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
            "dt": {
                "date": "9/8/2016",
                "time": "11:04 PM"
            }
        }, {
            "id": 18,
            "type": "questionnaire",
            "status": "success",
            "title": "Fusce posuere felis sed lacus.",
            "dt": {
                "date": "10/10/2016",
                "time": "12:35 PM"
            }
        }, {
            "id": 19,
            "type": "reminder",
            "status": "warning",
            "title": "Praesent blandit.",
            "dt": {
                "date": "12/22/2016",
                "time": "3:51 PM"
            }
        }, {
            "id": 20,
            "type": "medicine",
            "status": "warning",
            "title": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
            "dt": {
                "date": "4/14/2016",
                "time": "4:05 PM"
            }
        }, {
            "id": 21,
            "type": "permissions",
            "status": "warning",
            "title": "Nulla ut erat id mauris vulputate elementum.",
            "dt": {
                "date": "10/29/2016",
                "time": "6:48 PM"
            }
        }, {
            "id": 22,
            "type": "reminder",
            "status": "success",
            "title": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.",
            "dt": {
                "date": "10/1/2016",
                "time": "10:55 PM"
            }
        }, {
            "id": 23,
            "type": "medicine",
            "status": "danger",
            "title": "Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.",
            "dt": {
                "date": "10/14/2016",
                "time": "11:13 PM"
            }
        }, {
            "id": 24,
            "type": "medicine",
            "status": "danger",
            "title": "Aliquam non mauris.",
            "dt": {
                "date": "4/11/2016",
                "time": "11:38 PM"
            }
        }, {
            "id": 25,
            "type": "activity",
            "status": "danger",
            "title": "Nunc purus.",
            "dt": {
                "date": "12/3/2016",
                "time": "10:08 PM"
            }
        }, {
            "id": 26,
            "type": "activity",
            "status": "danger",
            "title": "Nam dui.",
            "dt": {
                "date": "8/10/2016",
                "time": "3:55 PM"
            }
        }, {
            "id": 27,
            "type": "questionnaire",
            "status": "danger",
            "title": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.",
            "dt": {
                "date": "8/6/2016",
                "time": "7:32 PM"
            }
        }, {
            "id": 28,
            "type": "permissions",
            "status": "success",
            "title": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
            "dt": {
                "date": "11/24/2016",
                "time": "1:18 PM"
            }
        }, {
            "id": 29,
            "type": "permissions",
            "status": "success",
            "title": "Donec posuere metus vitae ipsum.",
            "dt": {
                "date": "9/15/2016",
                "time": "6:16 PM"
            }
        }, {
            "id": 30,
            "type": "medicine",
            "status": "danger",
            "title": "Mauris sit amet eros.",
            "dt": {
                "date": "1/22/2017",
                "time": "1:18 PM"
            }
        }, {
            "id": 31,
            "type": "emergency",
            "status": "danger",
            "title": "Nullam sit amet turpis elementum ligula vehicula consequat.",
            "dt": {
                "date": "7/21/2016",
                "time": "2:18 PM"
            }
        }, {
            "id": 32,
            "type": "chat",
            "status": "warning",
            "title": "Donec posuere metus vitae ipsum.",
            "dt": {
                "date": "1/14/2017",
                "time": "12:34 PM"
            }
        }, {
            "id": 33,
            "type": "permissions",
            "status": "warning",
            "title": "Nulla ut erat id mauris vulputate elementum.",
            "dt": {
                "date": "4/3/2016",
                "time": "11:55 PM"
            }
        }, {
            "id": 34,
            "type": "activity",
            "status": "success",
            "title": "Nulla tempus.",
            "dt": {
                "date": "3/20/2016",
                "time": "11:12 PM"
            }
        }, {
            "id": 35,
            "type": "chat",
            "status": "danger",
            "title": "Mauris sit amet eros.",
            "dt": {
                "date": "12/20/2016",
                "time": "1:23 PM"
            }
        }, {
            "id": 36,
            "type": "medicine",
            "status": "success",
            "title": "Cras in purus eu magna vulputate luctus.",
            "dt": {
                "date": "9/25/2016",
                "time": "12:13 PM"
            }
        }, {
            "id": 37,
            "type": "reminder",
            "status": "success",
            "title": "Donec quis orci eget orci vehicula condimentum.",
            "dt": {
                "date": "4/8/2016",
                "time": "10:18 PM"
            }
        }, {
            "id": 38,
            "type": "activity",
            "status": "danger",
            "title": "Aenean sit amet justo.",
            "dt": {
                "date": "1/19/2017",
                "time": "11:18 PM"
            }
        }, {
            "id": 39,
            "type": "reminder",
            "status": "danger",
            "title": "Morbi vel lectus in quam fringilla rhoncus.",
            "dt": {
                "date": "7/7/2016",
                "time": "5:33 PM"
            }
        }, {
            "id": 40,
            "type": "chat",
            "status": "success",
            "title": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
            "dt": {
                "date": "7/14/2016",
                "time": "12:25 PM"
            }
        }, {
            "id": 41,
            "type": "medicine",
            "status": "warning",
            "title": "Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.",
            "dt": {
                "date": "8/28/2016",
                "time": "10:22 PM"
            }
        }, {
            "id": 42,
            "type": "emergency",
            "status": "success",
            "title": "Nam dui.",
            "dt": {
                "date": "5/5/2016",
                "time": "10:37 PM"
            }
        }, {
            "id": 43,
            "type": "permissions",
            "status": "danger",
            "title": "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.",
            "dt": {
                "date": "1/4/2017",
                "time": "10:42 PM"
            }
        }, {
            "id": 44,
            "type": "reminder",
            "status": "danger",
            "title": "Nulla ac enim.",
            "dt": {
                "date": "8/3/2016",
                "time": "2:17 PM"
            }
        }, {
            "id": 45,
            "type": "medicine",
            "status": "warning",
            "title": "Quisque id justo sit amet sapien dignissim vestibulum.",
            "dt": {
                "date": "10/18/2016",
                "time": "4:09 PM"
            }
        }, {
            "id": 46,
            "type": "questionnaire",
            "status": "success",
            "title": "Phasellus sit amet erat.",
            "dt": {
                "date": "2/11/2017",
                "time": "3:26 PM"
            }
        }, {
            "id": 47,
            "type": "chat",
            "status": "danger",
            "title": "Nullam porttitor lacus at turpis.",
            "dt": {
                "date": "11/22/2016",
                "time": "3:44 PM"
            }
        }, {
            "id": 48,
            "type": "reminder",
            "status": "danger",
            "title": "In est risus, auctor sed, tristique in, tempus sit amet, sem.",
            "dt": {
                "date": "10/12/2016",
                "time": "6:53 PM"
            }
        }, {
            "id": 49,
            "type": "medicine",
            "status": "danger",
            "title": "Nulla ac enim.",
            "dt": {
                "date": "12/27/2016",
                "time": "2:08 PM"
            }
        }, {
            "id": 50,
            "type": "permissions",
            "status": "danger",
            "title": "Maecenas ut massa quis augue luctus tincidunt.",
            "dt": {
                "date": "11/11/2016",
                "time": "10:14 PM"
            }
        }, {
            "id": 51,
            "type": "permissions",
            "status": "warning",
            "title": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.",
            "dt": {
                "date": "10/27/2016",
                "time": "3:37 PM"
            }
        }, {
            "id": 52,
            "type": "questionnaire",
            "status": "danger",
            "title": "In quis justo.",
            "dt": {
                "date": "5/24/2016",
                "time": "7:47 PM"
            }
        }, {
            "id": 53,
            "type": "emergency",
            "status": "success",
            "title": "In hac habitasse platea dictumst.",
            "dt": {
                "date": "2/10/2017",
                "time": "7:00 PM"
            }
        }, {
            "id": 54,
            "type": "questionnaire",
            "status": "danger",
            "title": "Quisque porta volutpat erat.",
            "dt": {
                "date": "1/15/2017",
                "time": "6:52 PM"
            }
        }, {
            "id": 55,
            "type": "reminder",
            "status": "danger",
            "title": "Curabitur at ipsum ac tellus semper interdum.",
            "dt": {
                "date": "12/24/2016",
                "time": "9:55 PM"
            }
        }, {
            "id": 56,
            "type": "permissions",
            "status": "warning",
            "title": "Pellentesque eget nunc.",
            "dt": {
                "date": "6/5/2016",
                "time": "12:05 PM"
            }
        }, {
            "id": 57,
            "type": "chat",
            "status": "warning",
            "title": "Vivamus in felis eu sapien cursus vestibulum.",
            "dt": {
                "date": "6/24/2016",
                "time": "11:13 PM"
            }
        }, {
            "id": 58,
            "type": "medicine",
            "status": "success",
            "title": "Sed sagittis.",
            "dt": {
                "date": "10/24/2016",
                "time": "6:03 PM"
            }
        }, {
            "id": 59,
            "type": "questionnaire",
            "status": "warning",
            "title": "Quisque id justo sit amet sapien dignissim vestibulum.",
            "dt": {
                "date": "9/25/2016",
                "time": "11:11 PM"
            }
        }, {
            "id": 60,
            "type": "reminder",
            "status": "success",
            "title": "Duis mattis egestas metus.",
            "dt": {
                "date": "8/28/2016",
                "time": "11:01 PM"
            }
        }, {
            "id": 61,
            "type": "medicine",
            "status": "danger",
            "title": "Duis at velit eu est congue elementum.",
            "dt": {
                "date": "6/10/2016",
                "time": "3:26 PM"
            }
        }, {
            "id": 62,
            "type": "questionnaire",
            "status": "warning",
            "title": "Maecenas ut massa quis augue luctus tincidunt.",
            "dt": {
                "date": "2/25/2016",
                "time": "4:54 PM"
            }
        }, {
            "id": 63,
            "type": "emergency",
            "status": "warning",
            "title": "Morbi quis tortor id nulla ultrices aliquet.",
            "dt": {
                "date": "4/7/2016",
                "time": "7:44 PM"
            }
        }, {
            "id": 64,
            "type": "activity",
            "status": "danger",
            "title": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
            "dt": {
                "date": "9/7/2016",
                "time": "12:38 PM"
            }
        }, {
            "id": 65,
            "type": "chat",
            "status": "warning",
            "title": "Fusce consequat.",
            "dt": {
                "date": "9/5/2016",
                "time": "6:48 PM"
            }
        }, {
            "id": 66,
            "type": "activity",
            "status": "danger",
            "title": "Praesent lectus.",
            "dt": {
                "date": "12/19/2016",
                "time": "11:05 PM"
            }
        }, {
            "id": 67,
            "type": "activity",
            "status": "danger",
            "title": "Morbi porttitor lorem id ligula.",
            "dt": {
                "date": "5/12/2016",
                "time": "2:17 PM"
            }
        }, {
            "id": 68,
            "type": "activity",
            "status": "danger",
            "title": "Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.",
            "dt": {
                "date": "11/5/2016",
                "time": "4:25 PM"
            }
        }, {
            "id": 69,
            "type": "activity",
            "status": "danger",
            "title": "Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
            "dt": {
                "date": "4/21/2016",
                "time": "3:54 PM"
            }
        }, {
            "id": 70,
            "type": "reminder",
            "status": "warning",
            "title": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
            "dt": {
                "date": "3/5/2016",
                "time": "2:46 PM"
            }
        }, {
            "id": 71,
            "type": "chat",
            "status": "warning",
            "title": "In blandit ultrices enim.",
            "dt": {
                "date": "3/31/2016",
                "time": "9:51 PM"
            }
        }, {
            "id": 72,
            "type": "emergency",
            "status": "warning",
            "title": "Aliquam quis turpis eget elit sodales scelerisque.",
            "dt": {
                "date": "11/24/2016",
                "time": "11:33 PM"
            }
        }, {
            "id": 73,
            "type": "permissions",
            "status": "success",
            "title": "Quisque porta volutpat erat.",
            "dt": {
                "date": "10/31/2016",
                "time": "12:43 PM"
            }
        }, {
            "id": 74,
            "type": "activity",
            "status": "success",
            "title": "Nulla ut erat id mauris vulputate elementum.",
            "dt": {
                "date": "1/5/2017",
                "time": "7:27 PM"
            }
        }, {
            "id": 75,
            "type": "chat",
            "status": "danger",
            "title": "Nullam varius.",
            "dt": {
                "date": "12/28/2016",
                "time": "10:08 PM"
            }
        }, {
            "id": 76,
            "type": "chat",
            "status": "success",
            "title": "Maecenas rhoncus aliquam lacus.",
            "dt": {
                "date": "2/9/2017",
                "time": "1:54 PM"
            }
        }, {
            "id": 77,
            "type": "medicine",
            "status": "danger",
            "title": "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
            "dt": {
                "date": "2/24/2016",
                "time": "2:01 PM"
            }
        }, {
            "id": 78,
            "type": "chat",
            "status": "success",
            "title": "Suspendisse potenti.",
            "dt": {
                "date": "8/27/2016",
                "time": "2:28 PM"
            }
        }, {
            "id": 79,
            "type": "questionnaire",
            "status": "warning",
            "title": "Curabitur convallis.",
            "dt": {
                "date": "1/22/2017",
                "time": "2:51 PM"
            }
        }, {
            "id": 80,
            "type": "reminder",
            "status": "danger",
            "title": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.",
            "dt": {
                "date": "12/12/2016",
                "time": "9:54 PM"
            }
        }, {
            "id": 81,
            "type": "activity",
            "status": "warning",
            "title": "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
            "dt": {
                "date": "7/5/2016",
                "time": "1:45 PM"
            }
        }, {
            "id": 82,
            "type": "permissions",
            "status": "success",
            "title": "Nunc nisl.",
            "dt": {
                "date": "10/15/2016",
                "time": "1:43 PM"
            }
        }, {
            "id": 83,
            "type": "reminder",
            "status": "danger",
            "title": "Aliquam sit amet diam in magna bibendum imperdiet.",
            "dt": {
                "date": "4/20/2016",
                "time": "1:26 PM"
            }
        }, {
            "id": 84,
            "type": "reminder",
            "status": "success",
            "title": "Vivamus in felis eu sapien cursus vestibulum.",
            "dt": {
                "date": "3/13/2016",
                "time": "3:28 PM"
            }
        }, {
            "id": 85,
            "type": "questionnaire",
            "status": "danger",
            "title": "Phasellus in felis.",
            "dt": {
                "date": "8/8/2016",
                "time": "3:52 PM"
            }
        }, {
            "id": 86,
            "type": "chat",
            "status": "warning",
            "title": "Phasellus sit amet erat.",
            "dt": {
                "date": "12/5/2016",
                "time": "5:24 PM"
            }
        }, {
            "id": 87,
            "type": "chat",
            "status": "danger",
            "title": "Nullam sit amet turpis elementum ligula vehicula consequat.",
            "dt": {
                "date": "12/26/2016",
                "time": "3:33 PM"
            }
        }, {
            "id": 88,
            "type": "chat",
            "status": "warning",
            "title": "Phasellus id sapien in sapien iaculis congue.",
            "dt": {
                "date": "8/16/2016",
                "time": "6:43 PM"
            }
        }, {
            "id": 89,
            "type": "reminder",
            "status": "danger",
            "title": "Maecenas pulvinar lobortis est.",
            "dt": {
                "date": "6/10/2016",
                "time": "2:09 PM"
            }
        }, {
            "id": 90,
            "type": "activity",
            "status": "danger",
            "title": "Vivamus vestibulum sagittis sapien.",
            "dt": {
                "date": "1/19/2017",
                "time": "3:34 PM"
            }
        }, {
            "id": 91,
            "type": "medicine",
            "status": "danger",
            "title": "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.",
            "dt": {
                "date": "6/23/2016",
                "time": "9:08 PM"
            }
        }, {
            "id": 92,
            "type": "chat",
            "status": "success",
            "title": "In congue.",
            "dt": {
                "date": "11/10/2016",
                "time": "1:06 PM"
            }
        }, {
            "id": 93,
            "type": "activity",
            "status": "danger",
            "title": "Maecenas rhoncus aliquam lacus.",
            "dt": {
                "date": "7/12/2016",
                "time": "2:09 PM"
            }
        }, {
            "id": 94,
            "type": "permissions",
            "status": "success",
            "title": "Vivamus in felis eu sapien cursus vestibulum.",
            "dt": {
                "date": "6/1/2016",
                "time": "2:13 PM"
            }
        }, {
            "id": 95,
            "type": "activity",
            "status": "success",
            "title": "Aenean auctor gravida sem.",
            "dt": {
                "date": "8/30/2016",
                "time": "5:54 PM"
            }
        }, {
            "id": 96,
            "type": "medicine",
            "status": "warning",
            "title": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.",
            "dt": {
                "date": "5/12/2016",
                "time": "10:52 PM"
            }
        }, {
            "id": 97,
            "type": "medicine",
            "status": "warning",
            "title": "Nullam sit amet turpis elementum ligula vehicula consequat.",
            "dt": {
                "date": "11/29/2016",
                "time": "7:14 PM"
            }
        }, {
            "id": 98,
            "type": "chat",
            "status": "danger",
            "title": "Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
            "dt": {
                "date": "6/24/2016",
                "time": "4:12 PM"
            }
        }, {
            "id": 99,
            "type": "medicine",
            "status": "warning",
            "title": "Mauris ullamcorper purus sit amet nulla.",
            "dt": {
                "date": "5/14/2016",
                "time": "7:26 PM"
            }
        }, {
            "id": 100,
            "type": "permissions",
            "status": "danger",
            "title": "Vestibulum rutrum rutrum neque.",
            "dt": {
                "date": "9/27/2016",
                "time": "5:09 PM"
            }
        }];
    }

};
