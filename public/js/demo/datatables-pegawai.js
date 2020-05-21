// Call the dataTables jQuery plugin
var tablePegawai = $('#tablePegawai').DataTable({
    processing: true,
    "ajax": {
        "url": "/api/pegawai",
        "dataType": "json",
        "cache": false,
        "dataSrc": "",
        
    },
    "order": [[1, 'asc']],
    columns: [
                { 'data': 'nip',
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                  }},
                { 'data': 'name' },
                { 'data': 'birthday_place'},
                { 'data':  'birthday_date',
                render: function (data, type, row, meta) {
                    return Date.parse(data).toString("dd MMMM yyyy");
                  }
                },
                { 'data': 'golongans.name'},
                {'defaultContent': '<button type="button" id="btnEditPegawai" data-toggle="modal" data-target="#modalEditPegawai" class="btn btn-sm btn-primary" >Edit</button> <button type="button"  id="btnRemovePegawai" class="btn btn-sm btn-primary">Remove</button>'}
            ],
    
});
  
  tablePegawai.on( 'order.dt search.dt', function () {
    tablePegawai.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
        cell.innerHTML = i+1;
    } );
  } ).draw();
  
  $('#tablePegawai tbody ').on( 'click', 'button', function () {
    var data = tableJabatan.row( $(this).parents('tr') ).data();
    
    if(this.id == "btnEditPegawai"){
       
        $('#modalEditPegawai').on('show.bs.modal', function (e) {
          $(this).find('input[name="idPegawai"]').val(data.id);
          $(this).find('input[name="namaPegawai"]').val(data.name);
        })
        
    }
    if(this.id == "btnRemovePegawai"){
      deletePegawai(data.id);
    }
  
  } );
  
  $('#btnUpdatePegawai').click(function(){
    let nama = $('input[name="namaPegawai"]').val();
    let id = $(this).parent().parent().find('.modal-body').find('input[name="idPegawai"]').val();
    updatePegawai(id,nama);
  });
  
  const deletePegawai = (data) => {
      $.post("/api/pegawai/destroy", {id: data})
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
  
  const updatePegawai = (id, name) => {
    $.post("/api/pegawai/update", {id: id, name:name})
    .done(function(e) {
        tablePegawai.ajax.reload();
        console.log(e);
    })
    .fail(function(e) {
        console.log( e );
    })
    .always(function(e) {
        console.log(e);
    });
  }
  
  $('#btnAddPegawai').click(function(event){
    event.preventDefault();
    let nip = $('input[name="nipPegawai"]').val();
    let nama = $('input[name="namaPegawai"]').val();
    let tempatLahir = $('input[name="tempat-lahir"]').val();
    let tanggalLahir = Date.parse($('input[name="tanggal-lahir"]').val()).toString('yyyy-MM-dd'); 
    let golongan = $('select[name="golongan-pegawai"]').val();
    
    $.post("/api/pegawai/store", {"_token": '{{csrf_token()}}',  
            nip: nip,
            name: nama ,
            birthday_place : tempatLahir,
            birthday_date : tanggalLahir,
            golongan : golongan
        })
    .done(function(e) {
        tablePegawai.ajax.reload();
        console.log(e);
    })
    .fail(function(e) {
        console.log( e );
    })
    .always(function(e) {
        console.log(e);
    });
  
  });
  
  