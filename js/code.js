var flag = 0;

$(window).on("load",function(){
	document.addEventListener('touchstart', handleTouchStart, false);        
	document.addEventListener('touchmove', handleTouchMove, false);

	var xDown = null;

	function getTouches(evt) {
	  return evt.touches ||             // browser API
	         evt.originalEvent.touches; // jQuery
	}                                                     

	function handleTouchStart(evt) {
	    const firstTouch = getTouches(evt)[0];                                      
	    xDown = firstTouch.clientX;                                     
	};                                                

	function handleTouchMove(evt) {
		console.log(flag)
	    
	    if ( ! xDown ) {
	    	return;
	    }

	    var xUp = evt.touches[0].clientX;
	    var xDiff = xDown - xUp;
	    console.log(xDiff);
	    if (Math.abs( xDiff ) >= 25) {/*most significant*/
	        if ( xDiff > 0 && flag!=-1) {
	            $(".float-right").trigger("click"); 
	        } else if(xDiff <0 && flag!=1){
	            $(".float-left").trigger("click");
	        }                       
	    }
	    /* reset values */
	    xDown = null;                                             
	};
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

function create_zoom(){
	var zoomin = $('<button type="submit" class="zoom zoom-in btn btn-link" onclick="zoom(1)"><span class="fa fa-search-plus"></span></button>');
    zoomin.appendTo($("pre"));
    var zoomout = $('<button type="submit" class="zoom zoom-out btn btn-link" onclick="zoom(-1)"><span class="fa fa-search-minus"></span></button>');
    zoomout.appendTo($("pre"));
}

function zoom(mul){
	var v = $('pre table tr').css("font-size");
	v = (parseInt(v) + (5*mul)).toString();
	$('pre table tr').css("font-size", v + "px");
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
			create_zoom();
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


	$('.nav a').click(function(event){
		event.preventDefault();
		var classList = event.currentTarget.className.split(/\s+/);
		var f = 0;
		for (var i = 0; i < classList.length; i++) {
	    	if (classList[i] === 'float-left'){
	    		id = (parseInt(id)-1).toString();
	    		f = 1;
	    	}
	    	if(classList[i] === 'float-right'){
	    		id = (parseInt(id)+1).toString();
	    		f = -1;
	    	}
		}
		$('.loading').fadeIn();
		console.log(id);
		$.ajax({ 
			url: "https://voterep.000webhostapp.com/github.php",
			method:"POST",
			dataType: "html",
			data:{id: id},
			timeout: 10000,       
			success: function(data)  
			{
				var path = $(data).filter('#name').text();
				$("#path").empty();
				make_path(path);
				$("#content").html($(data).filter('#github'));
				history.pushState(null, '', 'code.html?' + id);
				$(".loading").fadeOut(500);
				create_zoom();
				flag = 0;
				$(".float").show();

			},
			error: function(data){
				console.log(event.currentTarget.style);
				if(event.currentTarget.style)
					event.currentTarget.style.display = "none";
				$(".loading").fadeOut(500);
				flag = f;
				id = (parseInt(id) + f).toString();
			}
		});
	});

});
