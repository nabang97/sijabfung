var CSRF_TOKEN = $('meta[name="csrf-token"]').attr("content");
const tableDiklat = $("#tableDiklat").DataTable({
    processing: true,
    ajax: {
        url: "/api/profile/diklat",
        dataType: "json",
        cache: false,
        dataSrc: ""
    },
    order: [
        [1]
    ],
    columns: [{
            render: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            }
        },
        {
            data: `name`
        },
        {
            data: "tahun_mengikuti"
        },
        {
            defaultContent: `<button type="button" class="btn btn-primary btn-sm br-25" id="btnEditDiklat" data-toggle="modal" data-target="#modalEditDiklat">
                Edit</button> <button type="button" class="btn btn-danger btn-sm br-25" id="btnRemoveDiklat">Remove</button >`
        }
    ]
});

const showDataToEdit = data => {
    const element = $(".modal-body");
    element.find('input[name="id_diklat"').val(data.id);
    element.find('input[name="nama_diklat"').val(data.name);
    element.find('input[name="tahun_diklat"').val(data.tahun_mengikuti);
};
const deleteDiklat = data => {
    $.post("/api/profile/diklat/remove", {
            data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            tableDiklat.ajax.reload();
        })
        .fail(function (e) {})
        .always(function (e) {});
};

// show data in modal to edit
$("#tableDiklat tbody ").on("click", "button", function () {
    var data = tableDiklat.row($(this).parents("tr")).data();

    if (this.id == "btnEditDiklat") {
        showDataToEdit(data);
    }

    // delete data
    if (this.id == "btnRemoveDiklat") {
        deleteDiklat(data);
    }
});

const updateDiklat = data => {
    $.post("/api/profile/diklat/update", {
            data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            tableDiklat.ajax.reload();
            // document.getElementById("form-edit-diklat").reset();
            $(
                'input[name="id_diklat"]'
            ).before(`<div class="alert alert-success" role="alert">
  Data berhasil perbarui! 
</div>`);
        })
        .fail(function (e) {})
        .always(function (e) {});
};
const addDiklat = data => {
    if ($(".alert")) {
        $(".alert").remove();
    }
    $.post("/api/profile/diklat/store", {
            data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            tableDiklat.ajax.reload();
            document.getElementById("form-add-diklat").reset();
            $('#modalAddDiklat').find('.modal-body').prepend(`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
            Data berhasil ditambahkan! 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`);

        })
        .fail(function (e) {
            $('#modalAddDiklat').find('.modal-body').prepend(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            Terjadi kesalahan 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`);
        })
};

$("#modalAddDiklat").on("show.bs.modal", function (e) {
    if ($(".alert")) {
        $(".alert").remove();
    }
    $("#form-add-diklat")[0].reset();
    $("#form-add-diklat")
        .validate()
        .resetForm();
    $(this)
        .find(".error")
        .removeClass("error");
});

$("#modalEditDiklat").on("show.bs.modal", function (e) {
    if ($(".alert")) {
        $(".alert").remove();
    }
    $("#form-edit-diklat")
        .validate()
        .resetForm();
    $(this)
        .find(".error")
        .removeClass("error");
});

$.validator.addMethod(
    "yearCheck",
    function (value, element, arg) {
        const d = new Date();
        const n = d.getFullYear();
        if (value <= n) {
            return true;
        }
        return false;
    },
    "Tahun mengikuti diklat tidak boleh melewati tahun ini"
);

$("#form-add-diklat").validate({
    rules: {
        nama_diklat: {
            required: true
        },
        tahun_diklat: {
            required: true,
            minlength: 4,
            maxlength: 4,
            number: true,
            yearCheck: true
        }
    },
    messages: {
        nama_diklat: {
            required: "Nama harus diisi"
        },
        tahun_diklat: {
            required: "Tahun harus diisi",
            minlength: "Panjang tahun minimal 4 karakter",
            maxlength: "Panjang tahun maksimal 4 karakter",
            number: "Tahun harus berupa angka"
        }
    },
    submitHandler: form => {
        const data = {
            name: $('input[name="nama_diklat"]').val(),
            tahun_mengikuti: $('input[name="tahun_diklat"]').val()
        };
        addDiklat(data);
    }
});

$("#form-edit-diklat").validate({
    rules: {
        nama_diklat: {
            required: true
        },
        tahun_diklat: {
            required: true,
            minlength: 4,
            maxlength: 4,
            number: true,
            yearCheck: true
        }
    },
    messages: {
        nama_diklat: {
            required: "Nama harus diisi"
        },
        tahun_diklat: {
            required: "Tahun harus diisi",
            minlength: "Panjang tahun minimal 4 karakter",
            maxlength: "Panjang tahun maksimal 4 karakter",
            number: "Tahun harus berupa angka"
        }
    },
    submitHandler: form => {
        const data = {
            name: $(form)
                .find('input[name="nama_diklat"]')
                .val(),
            id: $(form)
                .find('input[name="id_diklat"]')
                .val(),
            tahun_mengikuti: $(form)
                .find('input[name="tahun_diklat"]')
                .val()
        };
        updateDiklat(data);
    }
});
