var CSRF_TOKEN = $('meta[name="csrf-token"]').attr("content");
const getRumpunJabatan =
    $('#tableRumpunJabatan').DataTable({
        processing: true,
        "ajax": {
            "url": "/api/rumpun-jabatan",
            "dataType": "json",
            "cache": false,
            "dataSrc": "",

        },
        "order": [
            [1, 'asc']
        ],
        columns: [{
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                'data': `nama`
            },
            {
                'data': `instansi_pembina.name`
            },
            {
                'defaultContent': `<button type="button" id="btnEditRumpunJabatan" data-toggle="modal" data-target="#modalEditRumpunJabatan" class="btn btn-sm btn-primary" >Edit</button>
            <button type="button"  id="btnRemoveRumpunJabatan" class="btn btn-sm btn-danger">Remove</button>
            `
            }
        ],
    });

const selectOptionIntansiPembina = () => {

    $.get("/api/instansi-pembina", function (data, status) {
            const selectInstansiPembina = $('select[name="instansi-pembina"]');
            selectInstansiPembina.empty();
            selectInstansiPembina.append(`<option>Pilih Instansi Pembina</option>`);
            data.forEach(element => {
                selectInstansiPembina.append(`<option value=${element.id}>${element.name}</option>`)
            });
        })
        .done(function (e) {})
        .fail(function (e) {})
        .always(function (e) {});
}

const insertRumpunJabatan = async (data) => {


    $.post("/api/rumpun-jabatan/store", {
            _token: CSRF_TOKEN,
            data: data
        })
        .done(function (e) {
            getRumpunJabatan.ajax.reload();
        })
        .fail(function (e) {})
}
const showDataToEdit = (data) => {
    const element = $('.modal-body');

    element.find('select[name="instansi-pembina"').val(data.instansi_pembina.id);
    element.find('input[name="id-rumpun-jabatan"').val(data.id);
    element.find('input[name="nama-rumpun-jabatan"').val(data.nama);

}

const updateRumpunJabatan = async (data) => {
    $.post("/api/rumpun-jabatan/update", {

            data: data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            getRumpunJabatan.ajax.reload();
        })
        .fail(function (e) {

        })
}

const deleteRumpunJabatan = (data) => {
    $.post("/api/rumpun-jabatan/destroy", {
            data: data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            getRumpunJabatan.ajax.reload();
        })
        .fail(function (e) {})
}

$(document).ready(function () {
    getRumpunJabatan;
    selectOptionIntansiPembina();

    // store data
    $('#btnAddRumpunJabatan').click(function () {
        const data = {
            nama: $('input[name="nama-rumpun-jabatan"]').val(),
            instansi: $('select[name="instansi-pembina"]').val()
        }
        insertRumpunJabatan(data);

    })

    // show data in modal to edit
    $('#tableRumpunJabatan tbody ').on('click', 'button', function () {
        var data = getRumpunJabatan.row($(this).parents('tr')).data();

        if (this.id == "btnEditRumpunJabatan") {
            showDataToEdit(data);
        }

        // delete data
        if (this.id == "btnRemoveRumpunJabatan") {
            deleteRumpunJabatan(data);
        }


    });

    // Update data
    $('#btnUpdateRumpunJabatan').click(function () {
        const element = $(this).parents('.modal-content').find('.modal-body');

        let data = {
            id: element.find('input[name="id-rumpun-jabatan"]').val(),
            name: element.find('input[name="nama-rumpun-jabatan"]').val(),
            instansi: element.find('select[name="instansi-pembina"]').val()
        }

        updateRumpunJabatan(data);
    })


});
