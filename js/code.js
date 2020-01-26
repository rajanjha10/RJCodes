$(window).on("load",function(){
	$(".loading").fadeOut(500);
});

function showCode(ele){
	ele.classList.toggle("active");
	$('pre').toggle();
}

$(document).ready(function(){
	var params = window.location.search.split('?')[1].split('&');
    var id = decodeURIComponent(params[0].split('=')[1]);
    var name = decodeURIComponent(params[1].split('=')[1]);
        
    $('h1').text(name);
	$.ajax({ 
		url: "https://voterep.000webhostapp.com/github.php",
		method:"POST",
		dataType: "html",
		data:{id: id},       
		success: function(data)  
		{
			$('#content').html(data);
		}   
	});
});
