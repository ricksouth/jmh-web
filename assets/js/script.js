$(document).ready(function(e) {
	$("#content").load("/content.html", function() {
		loadContent();
	});
});

function loadContent() {
	$.ajax({
		url: "https://raw.githubusercontent.com/natamus/jmh-web/master/data/_directory",
		success: function(data){
			html = $("#availablelist").html();
			data.split("\n").forEach(function(e) { 
				name = "";
				e.split("_").forEach(function(f) {
					if (name != "") {
						name += " ";
					}
					name += f.charAt(0).toUpperCase() + f.slice(1).toLowerCase();
				});
				html += '<a href="#" class="list-group-item" id="' + e + '">' + name + '<input type="checkbox" class="pull-right"></a>';
			});

			$("#availablelist").html(html);
			contentevents();
		}
	});
}

$("button.downloadbutton").on('click', function(e) {
	console.log("ran");
});

function contentevents() {
	$('.add').click(function(){
		$('.all').prop("checked",false);
		var items = $("#availablelist input:checked:not('.all')");
		var n = items.length;
		if (n > 0) {
			items.each(function(idx,item){
				var choice = $(item);
				choice.prop("checked",false);
				choice.parent().appendTo("#todownloadlist");
			});
		}
		else {

		}
	});

	$('.remove').click(function(){
		$('.all').prop("checked",false);
		var items = $("#todownloadlist input:checked:not('.all')");
		items.each(function(idx,item){
			var choice = $(item);
			choice.prop("checked",false);
			choice.parent().appendTo("#availablelist");
		});
	});

	$('.all').click(function(e){
		e.stopPropagation();
		var $this = $(this);
		if($this.is(":checked")) {
			$this.parents('.list-group').find("[type=checkbox]").prop("checked",true);
		}
		else {
			$this.parents('.list-group').find("[type=checkbox]").prop("checked",false);
			$this.prop("checked",false);
		}
	});

	$('[type=checkbox]').click(function(e){
		e.stopPropagation();
	});

	$('.list-group a').click(function(e){
		e.stopPropagation();

		var $this = $(this).find("[type=checkbox]");
		if($this.is(":checked")) {
			$this.prop("checked",false);
		}
		else {
			$this.prop("checked",true);
		}

		if ($this.hasClass("all")) {
			$this.trigger('click');
		}
	});

	$('#avh').click(function(e){
		$("#avc").click();
	});
	$('#tdh').click(function(e){
		$("#tdc").click();
	});
}