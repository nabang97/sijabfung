// Call the dataTables jQuery plugin
var tableGolongan = $('#tableGolongan').DataTable({
  processing: true,
  "ajax": {
      "url": "/api/golongan",
      "dataType": "json",
      "cache": true,
      "dataSrc": "",
      
  },
  "order": [[1, 'asc']],
  columns: [
            {'data': 'id',
              render: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
              }
            },
              { 'data': 'name' },
              {'defaultContent': '<button type="button" id="btnEditGolongan" data-toggle="modal" data-target="#modalEditGolongan" class="btn btn-sm btn-primary" >Edit</button> <button type="button"  id="btnRemoveGolongan" class="btn btn-sm btn-primary">Remove</button>'}
          ],
  
  
});

$(document).ready(function(){
  tableGolongan.on( 'order.dt search.dt', function () {
    tableGolongan.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
        cell.innerHTML = i+1;
    } );
  } ).draw();
});



$('#tableGolongan tbody ').on( 'click', 'button', function () {
  var data = tableGolongan.row( $(this).parents('tr') ).data();
  
  if(this.id == "btnEditGolongan"){
     
      $('#modalEditGolongan').on('show.bs.modal', function (e) {
        $(this).find('input[name="idGolongan"]').val(data.id);
        $(this).find('input[name="namaGolongan"]').val(data.name);
      })
      
  }
  if(this.id == "btnRemoveGolongan"){
    deleteGolongan(data.id);
  }

} );

$('#btnUpdateGolongan').click(function(){
  let nama = $('input[name="namaGolongan"]').val();
  let id = $(this).parent().parent().find('.modal-body').find('input[name="idGolongan"]').val();
  updateGolongan(id,nama);
});

const deleteGolongan = (data) => {
    $.post("/api/golongan/destroy", {id: data})
    .done(function(e) {
        tableGolongan.ajax.reload();
        console.log(e);
    })
    .fail(function(e) {
        console.log( e );
    })
    .always(function(e) {
        console.log(e);
    });
}

const updateGolongan = (id, name) => {
  $.post("/api/golongan/update", {id: id, name:name})
  .done(function(e) {
      tableGolongan.ajax.reload();
      console.log(e);
  })
  .fail(function(e) {
      console.log( e );
  })
  .always(function(e) {
      console.log(e);
  });
}

$('#btnAddGolongan').click(function(event){
  event.preventDefault();
  let nama = $('#namaGolongan').val();
  console.log(nama);
  $.post("/api/golongan/store", {"_token": '{{csrf_token()}}',  name: nama })
  .done(function(e) {
      tableGolongan.ajax.reload();
      console.log(e);
  })
  .fail(function(e) {
      console.log( e );
  })
  .always(function(e) {
      console.log(e);
  });

});

