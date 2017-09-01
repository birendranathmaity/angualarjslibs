/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:'./app/my-home/components/preferredMatchesBox.html',
        controllerAs:'preferredMatchesBox',
        scope:{
title:'='
        },
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
                controller.title=$scope.title;
                controller.config = {
                          autoHideScrollbar: true,
                          theme: 'rounded-dark',
                          axis: 'y', 
                          setHeight: 230,
                          scrollInertia: 0,
                           scrollButtons: {
            scrollAmount: 'auto', // scroll amount when button pressed 
            enable: true // enable scrolling buttons by default 
        },
                           advanced:{
                                   updateOnContentResize: true
                              }
    };

                controller.preferredMatchesBoxData=[
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
},
{
    user_id:"T3807254",
    user_name:"Birendranath Maity",
    user_age:"27 Yrs",
    user_height:"5 Ft 8 in",
    user_prof:"IT Professional",
    user_location:"Hyderabad"
}


                ];
               
               
            }
        ]
    };
};
