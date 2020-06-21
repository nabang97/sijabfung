$(document).ready(() => {    
  $.get("/api/dasar-hukum/newest")
  .done(function(e) {
      e.forEach(element => {
          $('#newest-dasar-hukum').append(`<div class="item-news"><div class="layer-items">
          
          </div>
          <a href="/dasar-hukum/view/${element.id}">${element.judul}</a>
      </div>`);        
      });      
  })
  .fail(function(e) {
  })
  .always(function(e) {
  });
});
