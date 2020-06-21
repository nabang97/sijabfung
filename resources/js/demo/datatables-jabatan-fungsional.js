var CSRF_TOKEN = $('meta[name="csrf-token"]').attr("content");
const getJabatanFungsional =
    $('#tableJabFung').DataTable({
        processing: true,
        "ajax": {
            "url": "/api/jabatan-fungsional",
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
                'data': `rumpun_jabatan.nama`
            },
            {
                'data': `rumpun_jabatan.instansi_pembina.name`
            },
            {
                'defaultContent': `<button type="button" id="btnEditJabFung" data-toggle="modal" data-target="#modalEditJabFung" class="btn btn-sm btn-primary" >Edit</button>
            <button type="button"  id="btnRemoveJabFung" class="btn btn-sm btn-danger">Remove</button>
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

const selectOptionRumpunJabatan = (value) => {

    return $.get("/api/rumpun-jabatan-option", {
            id: value
        }, function (result, status) {
            const selectRumpunJabatan = $('select[name="rumpun-jabatan"]');
            selectRumpunJabatan.empty();
            selectRumpunJabatan.append(`<option>Pilih Rumpun Jabatan</option>`);
            result.forEach(element => {
                selectRumpunJabatan.append(`<option value=${element.id}>${element.nama}</option>`)
            });
        })
        .done(function (e) {

        })
        .fail(function (e) {})

}

const selectOptionKategori = () => {
    $.get("/api/kategori", function (data, status) {
            const selectKategori = $('#checkbox-kategori');
            selectKategori.empty();
            selectKategori.append(`<label for="selectJabatan">Kategori</label> <br>`);
            let no = 0;
            data.forEach(element => {
                no = no + 1;
                selectKategori.append(`
            <div class="form-check form-check-inline">
                <input class="form-check-input check-kategori" type="checkbox" id="checkbox${no}" value="${element.id}">
                <label class="form-check-label" for="inlineCheckbox1">${element.name}</label>
            </div>
            `);
            });
        })
        .done(function (e) {

        })
        .fail(function (e) {})
        .always(function (e) {});
}

const insertJabFung = async (data) => {

    $.post("/api/jabatan-fungsional/store", {
            data: data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            getJabatanFungsional.ajax.reload();
        })
        .fail(function (e) {

        })
}

const showDataToEdit = (data) => {


    const element = $('.modal-body');
    element.find('input[name="id-jabatan-fungsional"').val(data.id);
    element.find('input[name="nama-jabatan-fungsional"').val(data.nama);
    element.find('select[name="instansi-pembina"]').val(data.rumpun_jabatan.id_instansi);
    selectOptionRumpunJabatan(data.rumpun_jabatan.id_instansi).done(() => {
        element.find('select[name="rumpun-jabatan"]').val(data.id_rumpun_jabatan);
    });
    element.find('select[name="lingkup-jabatan"]').val(data.lingkup);


}

const updateJabFung = async (data) => {
    $.post("/api/jabatan-fungsional/update", {
            data: data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            getJabatanFungsional.ajax.reload();

        })
        .fail(function (e) {

        })
}

const deleteJabFung = (data) => {
    $.post("/api/jabatan-fungsional/destroy", {
            data: data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            getJabatanFungsional.ajax.reload();

        })
        .fail(function (e) {

        })
}

$(document).ready(function () {
    getJabatanFungsional;
    selectOptionIntansiPembina();
    // show option rumpun jabatan
    $('select[name="instansi-pembina"]').click(function () {
        selectOptionRumpunJabatan($(this).val());
    });

    // store data
    $('#btnAddJabFung').click(function () {
        const data = {
            name: $('input[name="nama-jabatan-fungsional"]').val(),
            instansi: $('select[name="instansi-pembina"]').val(),
            rumpun: $('select[name="rumpun-jabatan"]').val(),
        }
        insertJabFung(data);
    });

    // show data in modal to edit
    $('#tableJabFung tbody ').on('click', 'button', function () {
        var data = getJabatanFungsional.row($(this).parents('tr')).data();


        if (this.id == "btnEditJabFung") {
            showDataToEdit(data);
        }

        // delete data
        if (this.id == "btnRemoveJabFung") {
            deleteJabFung(data);
        }



    });

    // Update data
    $('#btnUpdateJabFung').click(function () {
        const element = $(this).parents('.modal-content').find('.modal-body');
        let data = {
            id: element.find('input[name="id-jabatan-fungsional"]').val(),
            nama: element.find('input[name="nama-jabatan-fungsional"]').val(),
            rumpun: element.find('select[name="rumpun-jabatan"]').val(),
            lingkup: element.find('select[name="lingkup-jabatan"]').val()
        }

        updateJabFung(data);
    })
});
