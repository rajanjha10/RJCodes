$(window).on("load",function(){
	$(".loading").fadeOut(500);

	$(".view").on("click",function(e){
		e.preventDefault();
		var id = $(this).attr('id');
		window.location.href = "search.html?" + encodeURIComponent(id);
	});
});
