$(window).on("load",function(){
	$(".loading").fadeOut(500);
});

function showCode(ele){
	ele.classList.toggle("active");
	$('#show').toggle();
}

function loadDisqus(ele) { // DON'T EDIT BELOW THIS LINE
	ele.classList.toggle("active");
	$('#disqus_thread').toggle();
	var d = document, s = d.createElement('script');
	s.src = 'https://rj-codes.disqus.com/embed.js';
	s.setAttribute('data-timestamp', +new Date());
	(d.head || d.body).appendChild(s);
};

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

	var disqus_config = function () {
		this.page.url = window.location.search;  // Replace PAGE_URL with your page's canonical URL variable
		this.page.identifier = id; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
	};

});
