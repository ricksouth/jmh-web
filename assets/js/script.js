$(document).ready(function(e) {
	$("#content").load("/content.html", function() {
		loadContent();
	});
});

function loadContent() {
	$.ajax({
		url: "https://raw.githubusercontent.com/natamus/jmh-web/master/data/_directory",
		success: function(data){
			html = $("#list1").html();
			data.split("\n").forEach(function(e) { 
				name = "";
				e.split("_").forEach(function(f) {
					if (name != "") {
						name += " ";
					}
					name += f.charAt(0).toUpperCase() + f.slice(1).toLowerCase();
				});
				html += '<a href="#" class="list-group-item">' + name + '<input type="checkbox" class="pull-right"></a>';
			});

			$("#list1").html(html);
			contentevents();
		}
	});
}

function contentevents() {
	$('.add').click(function(){
		$('.all').prop("checked",false);
		var items = $("#list1 input:checked:not('.all')");
		var n = items.length;
		if (n > 0) {
			items.each(function(idx,item){
				var choice = $(item);
				choice.prop("checked",false);
				choice.parent().appendTo("#list2");
			});
		}
		else {
			alert("Choose an item from list 1");
		}
	});

	$('.remove').click(function(){
		$('.all').prop("checked",false);
		var items = $("#list2 input:checked:not('.all')");
		items.each(function(idx,item){
			var choice = $(item);
			choice.prop("checked",false);
			choice.parent().appendTo("#list1");
		});
	});

	/* toggle all checkboxes in group */
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

	/* toggle checkbox when list group item is clicked */
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
}