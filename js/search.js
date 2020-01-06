$(window).on("load",function(){
	$(".loading").fadeOut(500);
	$('h1').text(localStorage.getItem('title'));
});

var search = function(e) {
	var pattern = $('.searchTerm').val();
	var results = [];
	if(pattern === ""){
		findAllChildren($('#treeview').treeview('getSelected'), results);
		makeTable(results);
		$('#treeview').treeview('search', [ pattern, options ]);
		return;
	}
	var options = {
		ignoreCase: true,
		exactMatch: false,
		revealResults: false
	};
	results = $('#treeview').treeview('search', [ pattern, options ]);
	makeTable(results);
}

function viewCode(ele){
	localStorage.setItem('id', ele.id);
	localStorage.setItem('code', $("#"+ele.id).children('td').text());
	window.open("code.html", '_blank');
}

function findDisplay(nodes){
	var result = [];
	findAllChildren(nodes, result);
	makeTable(result);
}

function makeTable(result){
	$("#searchresult").empty();
	jQuery.each(result, function(i,data) {
		if(data.child==0){
			$("#searchresult").append("<tr onclick=viewCode(this) class='col-md-12'><td>" + data.text + "</td></tr>");
			$("#searchresult tr:last").attr('id', data.id);
			$("#searchresult tr:last").slideDown('slow'); 
		} 
	});
}
				
function findAllChildren(nodes, result){
	for (var i in nodes){
		if(nodes[i].child==0)
			result.push(nodes[i]);
		else
			findAllChildren(nodes[i].nodes, result);
	}
}
	

$(document).ready(function(){
	$.ajax({ 
		url: "https://voterep.000webhostapp.com/fetch.php",
		method:"POST",
		dataType: "json",
		data:({table: localStorage.getItem('table')}),       
		success: function(data)  
		{
			$('#treeview').treeview({data: data, showBorder: false});
		}   
	});
	$('.searchTerm').on('keyup', search);
});
