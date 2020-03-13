$(document).ready(function(){


	$('#alert').on('show.bs.modal', function (event) {
	  var button = $(event.relatedTarget) // Button that triggered the modal
	  var title = button.data('title') // Extract info from data-* attributes
	  var description = button.data('description') // Extract info from data-* attributes
	
	 var modal = $(this);
	  modal.find('.modal-title').html(title);
	  modal.find('.modal-body').html(description);

	})

});