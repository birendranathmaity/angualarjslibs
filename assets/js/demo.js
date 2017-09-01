$(document).ready(function() {		
		//$('#left-panel').addClass('animated bounceInRight');
		$('#project-progress').css('width', '50%');
		$('#msgs-badge').addClass('animated bounceIn');	
		
		$('#my-task-list').popover({
			html:true			
		});

		$('#my-task-list2').popover({
			html:true			
		})




});



$(document).ready(function(){
    $("a").tooltip();
});


$('.dropdown').hover(function(){ 
  $('.dropdown-toggle', this).trigger('click'); 
});


function myprofile() {

    window.open("full-profile.html");

}


function previewProfile() {
    window.open("preview-your-profile.html", "_blank", "directories=0,titlebar=0,toolbar=0,location=0,status=0,scrollbars=yes,resizable=yes,top=200,left=400,width=500,height=400");
}


  



$('.btn-toggle').click(function() {
    $(this).find('.btn').toggleClass('active');  
    
    if ($(this).find('.btn-primary').size()>0) {
    	$(this).find('.btn').toggleClass('btn-primary');
    }
    
    $(this).find('.btn').toggleClass('btn-default');
       
});

$('form').submit(function(){
	alert($(this["options"]).val());
    return false;
});