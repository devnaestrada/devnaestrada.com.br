(function(){

  var holder = document.querySelector('.quick-tips');

  document.addEventListener('DOMContentLoaded', function() {

    holder.classList.add('active');

    setTimeout(function(){
      holder.classList.remove('active');
    }, 5000);
  });

})();
