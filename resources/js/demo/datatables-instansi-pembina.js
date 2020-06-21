var CSRF_TOKEN = $('meta[name="csrf-token"]').attr("content");
const getInstansiPembina = $("#tableInstansiPembina").DataTable({
    processing: true,
    ajax: {
        url: "/api/instansi-pembina",
        dataType: "json",
        cache: false,
        dataSrc: ""
    },
    order: [[1, "asc"]],
    columns: [
        {
            render: function(data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            }
        },
        {
            data: `name`
        },
        {
            defaultContent: `<button type="button" id="btnEditInstansiPembina" data-toggle="modal" data-target="#modalEditInstansiPembina" class="btn btn-sm btn-primary" >Edit</button>
            <button type="button"  id="btnRemoveInstansiPembina" class="btn btn-sm btn-danger">Remove</button>
            `
        }
    ]
});

const insertInstansiPembina = async data => {
    $.post("/api/instansi-pembina/store", {
        _token: CSRF_TOKEN,
        data: data
    })
        .done(function(e) {
            getInstansiPembina.ajax.reload();
        })
        .fail(function(e) {});
};

const updateInstansiPembina = async data => {
    $.post("/api/instansi-pembina/update", {
        data: data,
        _token: CSRF_TOKEN
    })
        .done(function(e) {
            getInstansiPembina.ajax.reload();
        })
        .fail(function(e) {});
};

const deleteInstansiPembina = data => {
    $.post("/api/instansi-pembina/destroy", {
        data: data,
        _token: CSRF_TOKEN
    })
        .done(function(e) {
            getInstansiPembina.ajax.reload();
        })
        .fail(function(e) {});
};

const showDataToEdit = data => {
    const element = $(".modal-body");
    element.find('input[name="nama-instansi-pembina"').val(data.name);
    element.find('input[name="id-instansi-pembina"').val(data.id);
};

$(document).ready(function() {
    // show data in table
    getInstansiPembina;

    // store data
    $("#btnAddInstansiPembina").click(function() {
        const data = {
            nama: $('input[name="nama-instansi-pembina"]').val()
        };
        insertInstansiPembina(data);
    });

    // show data in modal to edit
    $("#tableInstansiPembina tbody ").on("click", "button", function() {
        var data = getInstansiPembina.row($(this).parents("tr")).data();

        if (this.id == "btnEditInstansiPembina") {
            showDataToEdit(data);
        }

        // delete data
        if (this.id == "btnRemoveInstansiPembina") {
            deleteInstansiPembina(data);
        }
    });

    // Update data
    $("#btnUpdateInstansiPembina").click(function() {
        const element = $(this)
            .parents(".modal-content")
            .find(".modal-body");
        let data = {
            id: element.find('input[name="id-instansi-pembina"]').val(),
            name: element.find('input[name="nama-instansi-pembina"]').val()
        };

        updateInstansiPembina(data);
    });
});
