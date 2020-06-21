// Call the dataTables jQuery plugin

var tableJabatan = $('#tableJabatan').DataTable({
    processing: true,
    "ajax": {
        "url": "/api/jabatan",
        "dataType": "json",
        "cache": false,
        "dataSrc": "",
        
    },
    "order": [[1, 'asc']],
    columns: [
                { 'data': 'id' ,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                  }},
                { 'data': 'name' },
                {'defaultContent': '<button type="button" id="btnEditJabatan" data-toggle="modal" data-target="#modalEditJabatan" class="btn btn-sm btn-primary" >Edit</button> <button type="button"  id="btnRemoveJabatan" class="btn btn-sm btn-primary">Remove</button>'}
            ],
    
});
  
  tableJabatan.on( 'order.dt search.dt', function () {
    tableJabatan.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
        cell.innerHTML = i+1;
    } );
  } ).draw();
  
  $('#tableJabatan tbody ').on( 'click', 'button', function () {
    var data = tableJabatan.row( $(this).parents('tr') ).data();
    
    if(this.id == "btnEditJabatan"){
       
        $('#modalEditJabatan').on('show.bs.modal', function (e) {
          $(this).find('input[name="idJabatan"]').val(data.id);
          $(this).find('input[name="namaJabatan"]').val(data.name);
        })
        
    }
    if(this.id == "btnRemoveJabatan"){
      deleteJabatan(data.id);
    }
  
  } );
  
  $('#btnUpdateJabatan').click(function(){
    let nama = $('input[name="namaJabatan"]').val();
    let id = $(this).parent().parent().find('.modal-body').find('input[name="idJabatan"]').val();
    updateJabatan(id,nama);
  });
  
  const deleteJabatan = (data) => {
      $.post("/api/jabatan/destroy", {id: data})
      .done(function(e) {
          tableJabatan.ajax.reload();
          console.log(e);
      })
      .fail(function(e) {
          console.log( e );
      })
      .always(function(e) {
          console.log(e);
      });
  }
  
  const updateJabatan = (id, name) => {
    $.post("/api/jabatan/update", {id: id, name:name})
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
  
  $('#btnAddJabatan').click(function(event){
    event.preventDefault();
    let nama = $('input[name="namaJabatan"]').val();
    console.log(nama);
    $.post("/api/jabatan/store", {"_token": '{{csrf_token()}}',  name: nama })
    .done(function(e) {
        tableJabatan.ajax.reload();
        console.log(e);
    })
    .fail(function(e) {
        console.log( e );
    })
    .always(function(e) {
        console.log(e);
    });
  
  });
  
  