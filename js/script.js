$(window).on("load",function(){
	$(".loading").fadeOut(500);

	$(".view").on("click",function(e){
		e.preventDefault();
		var id = $(this).attr('id');
		var title = $(this).closest('.layout').find('h6').text();
		localStorage.setItem('table', id);
		localStorage.setItem('title', title);
		window.location.href = "search.html";
	});
});
