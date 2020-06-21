const getJenjangJabatan = 
    $('#tableJabfungPegawai').DataTable({
        processing: true,
        "ajax": {
            "url": "/api/jenjang-jabatan",
            "dataType": "json",
            "cache": false,
            "dataSrc": "",
            
        },
        "order": [[1, 'asc']],
        columns: [  
            { 
            render: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
                }},
            { 'data': `nama`},
            { 'data': `jabfung.nama`},
            
            {'defaultContent': `<button type="button" id="btnEditJenjangJabatan" data-toggle="modal" data-target="#modalEditJenjangJabatan" class="btn btn-sm btn-primary" >Edit</button>
            <button type="button"  id="btnRemoveJenjangJabatan" class="btn btn-sm btn-primary">Remove</button>
            `}
        ],        
});