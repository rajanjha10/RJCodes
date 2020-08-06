$(window).on("load",function(){
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
	var url = "code.html?" + encodeURIComponent(ele.id);
	window.location.href = url;
}

function findDisplay(nodes){
	var result = [];
	findAllChildren(nodes, result);
	makeTable(result);
}

function makeTable(result){
	$("#searchresult").empty();
	var dict = {};
	jQuery.each(result, function(i,data) {
		if(data.child==0 && dict[data.text]!=1){
			$("#searchresult").append("<tr onclick=viewCode(this) class='col-md-12'><td>" + data.text + "</td></tr>");
			$("#searchresult tr:last").attr('id', data.id);
			$("#searchresult tr:last").slideDown('slow'); 
			dict[data.text] = 1;
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
	var tableName = window.location.search.split('?')[1];
	if(tableName==undefined)
		window.location.href = "index.html";
    
    var name = tableName.split('_');
    var s = "";
    jQuery.each(name, function(i, data) {
    	s += data.toUpperCase() + " ";
	});
	$('h2').text(s); 

	$.ajax({ 
		url: "https://voterep.000webhostapp.com/fetch.php",
		method:"POST",
		dataType: "json",
		data:({table: tableName}),
		timeout: 50000,       
		success: function(data)  
		{
			$('#treeview').treeview({data: data, showBorder: true});
			$(".loading").fadeOut(500);
		},
		error: function(data){
			alert("File Not Found");
			window.location.href = "index.html";
    	}   
	});

	$('.searchTerm').on('keyup', search);
});
