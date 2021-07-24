$( document ).ready(function() {
    $('#deleteModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var type = button.data('type') // Extract info from data-* attributes
    var title = button.data('title') // Extract info from data-* attributes
    var img = button.data('img') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('#data-type').text(type)
    modal.find('#this-title').text(title)
    modal.find('#modal-img').attr("src", img);


})
});