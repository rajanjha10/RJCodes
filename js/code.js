$(window).on("load",function(){
	$(".loading").fadeOut(500);
	$('h1').text(localStorage.getItem('code'));
});


$(document).ready(function(){
	$.ajax({ 
		url: "https://voterep.000webhostapp.com/github.php",
		method:"POST",
		dataType: "html",
		data:{id: localStorage.getItem('id')},       
		success: function(data)  
		{
			$('.code').html(data);
		}   
	});
});
