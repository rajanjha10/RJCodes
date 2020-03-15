$(window).on("load",function(){
});

function showCode(ele){
	ele.classList.toggle("active");
	$('#show').toggle();
}

function fix(name){
	var letters = /^[0-9a-zA-Z]/;
	var s = name[0];
	for(var i=1; i<name.length; i++){
		if(name[i]=='.')
			break;
		if(name[i].match(letters) && name[i]==name[i].toUpperCase() && name[i-1]!=name[i-1].toUpperCase()){
			s += " ";
			s += name[i];
		}
		else
			s += name[i];
	}

	return s;
}

function make_path(path){
	path = path.split('/');
	
	var tableName = decodeURIComponent(path[7]).split(" ");
	var url = "";
	jQuery.each(tableName, function(i,data) {
		 url += data.toLowerCase() + "_";
	});
	url = url.substring(0, url.length-1);
	url = "search.html?" + encodeURIComponent(url);

	for(var i=7; i<path.length; i++)
		path[i] = fix(decodeURIComponent(path[i]));
	
	$('h2').text(path[path.length-1]);	
	
	var s = "";		
	for(var i=8; i<path.length-1; i++)
		s += path[i] + " / ";
	s += path[path.length-1];
	
	$("#path").append("<h3><a href='" + url + "'><span>" + path[7] + "</span></a> / " + s +"</h3>");	
}

function loadDisqus(ele) {
	ele.classList.toggle("active");
	$('#disqus_thread').toggle();
	var d = document, s = d.createElement('script');
	s.src = 'https://rj-codes.disqus.com/embed.js';
	s.setAttribute('data-timestamp', +new Date());
	(d.head || d.body).appendChild(s);
};

$(document).ready(function(){
	var id = window.location.search.split('?')[1];
	
	$.ajax({ 
		url: "https://voterep.000webhostapp.com/github.php",
		method:"POST",
		dataType: "html",
		data:{id: id},
		timeout: 10000,       
		success: function(data)  
		{
			var path = $(data).filter('#name').text();
			make_path(path);
			$('#content').html($(data).filter('#github'));
			$(".loading").fadeOut(500);
		},
		error: function(data){
			alert("File Not Found");
			window.location.href = "index.html";
		}   
	});

	var disqus_config = function () {
		this.page.url = window.location.search;  // Replace PAGE_URL with your page's canonical URL variable
		this.page.identifier = id; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
	};

});
