$(document).ready(function () {

    if ($("#dataTable").length) {
  
      $("#dataTable").DataTable({
  
        pageLength: 25,
  
        responsive: true,
  
        ordering: true,
  
        searching: true,
  
        lengthChange: false
      });
    }
  });