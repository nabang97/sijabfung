var CSRF_TOKEN = $('meta[name="csrf-token"]').attr("content");
const getKategori =
    $('#tableKategori').DataTable({
        processing: true,
        "ajax": {
            "url": "/api/kategori",
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
                'data': `name`
            },
            {
                'defaultContent': `<button type="button" id="btnEditKategori" data-toggle="modal" data-target="#modalEditKategori" class="btn btn-sm btn-primary" >Edit</button>
            <button type="button"  id="btnRemoveKategori" class="btn btn-sm btn-danger">Remove</button>
        `
            }
        ],
    });

const insertKategori = async (data) => {
    $.post("/api/kategori/store", {
            _token: CSRF_TOKEN,
            data: data
        })
        .done(function (e) {
            getKategori.ajax.reload();

        })
        .fail(function (e) {

        })
}

const updateKategori = async (data) => {
    $.post("/api/kategori/update", {
            "_token": '{{csrf_token()}}',
            data: data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            getKategori.ajax.reload();

        })
        .fail(function (e) {

        });
}

const deleteKategori = (data) => {
    $.post("/api/kategori/destroy", {
            data: data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            getKategori.ajax.reload();

        })
        .fail(function (e) {

        })
        .always(function (e) {});
}

const showDataToEdit = (data) => {
    const element = $('.modal-body');
    element.find('input[name="nama-kategori"').val(data.name);
    element.find('input[name="id-kategori"').val(data.id);

}

$(document).ready(function () {

    // show data
    getKategori;

    // store data
    $('#btnAddKategori').click(function () {
        const data = {
            name: $('input[name="nama-kategori"]').val()
        }

        insertKategori(data);

    });

    // show data in modal to edit
    $('#tableKategori tbody ').on('click', 'button', function () {
        var data = getKategori.row($(this).parents('tr')).data();

        if (this.id == "btnEditKategori") {

            showDataToEdit(data);
        }

        // delete data
        if (this.id == "btnRemoveKategori") {
            deleteKategori(data);
        }


    });

    // Update data
    $('#btnUpdateKategori').click(function () {
        const element = $(this).parents('.modal-content').find('.modal-body');

        let data = {
            id: element.find('input[name="id-kategori"]').val(),
            name: element.find('input[name="nama-kategori"]').val()
        }



        updateKategori(data);
    })
});
