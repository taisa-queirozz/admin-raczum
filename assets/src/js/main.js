$(document).ready(function(){


	$('#alert').on('show.bs.modal', function (event) {
	  var button = $(event.relatedTarget) // Button that triggered the modal
	  var title = button.data('title') // Extract info from data-* attributes
	  var description = button.data('description') // Extract info from data-* attributes
	
	 var modal = $(this);
	  modal.find('.modal-title').html(title);
	  modal.find('.modal-body').html(description);
	});

	if($("#calendario").length){
		var calendar = new dhx.Calendar("calendario", {
			dateFormat:"%d %M",
			range: true
		});	
	}
	
	calendar.events.on("change", function (date) {
	    document.querySelector("#dataExtrato").innerHTML = calendar.getValue() ;
	});	

});