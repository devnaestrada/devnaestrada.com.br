(function (){
  document.addEventListener("DOMContentLoaded", function () {
    var filterForm = document.getElementById('filter-form') || null;
    var filterSelect = document.getElementById('filter-select') || null;

    if( !!filterSelect && !!filterForm ) {
      filterSelect.onchange = function () {
        filterForm.action = this.value;
      }
    }
  });
})();