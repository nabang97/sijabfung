var CSRF_TOKEN = $('meta[name="csrf-token"]').attr("content");

const messageSuccess = (element, message) => {
    console.log(message);

    $(element).before(
        `<div class="alert alert-success alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`
    );
}

if (typeof Storage !== "undefined") {
    if (sessionStorage.getItem("edit") === "true") {
        messageSuccess("#updateProfile", sessionStorage.getItem("messages"));
        sessionStorage.setItem("edit", false);
    }

    if (sessionStorage.getItem("photo-success") === "true") {
        messageSuccess("#form-photo", sessionStorage.getItem("messages"));
        sessionStorage.setItem("photo-success", false);
    }
} else {
    alert("Sorry, your browser does not support Web Storage...");
}


const selectOptionRumpunJabatan = value => {
    return $.get(
            "/api/rumpun-jabatan-option", {
                id: value
            },
            function (result, status) {
                const selectRumpunJabatan = $('select[name="rumpun_jabatan"]');
                selectRumpunJabatan.empty();
                selectRumpunJabatan.append(
                    `<option value="0">Pilih Rumpun Jabatan</option>`
                );
                result.forEach(element => {
                    selectRumpunJabatan.append(
                        `<option value=${element.id}>${element.nama}</option>`
                    );
                });
            }
        )
        .done(function (e) {
            console.log(e);
        })
        .fail(function (e) {})
        .always(function (e) {});
};

const selectOptionJabatanFungsional = value => {
    console.log(value);

    return $.get(
        "/api/jabatan-fungsional-option", {
            id: value
        },
        function (result, status) {
            const selectJabfung = $('select[name="jabatan_fungsional"]');
            selectJabfung.empty();
            selectJabfung.append(
                `<option value="0">Pilih Jabatan Fungsional</option>`
            );
            result.forEach(element => {
                console.log(element.id);
                selectJabfung.append(
                    `<option value=${element.id}>${element.nama}</option>`
                );
            });
        }
    ).fail(function (e) {});
};

const selectOptionJenjangKategoriLingkup = data => {
    return $.get("/api/jenjang-jabatan/option", data, function (data, status) {
            const selectKategori = $('select[name="jenjang_kategori_lingkup"]');
            selectKategori.empty();
            selectKategori.append(
                `<option value="0">Pilih Jenjang-Kategori-Lingkup</option>`
            );
            data.forEach(element => {
                console.log(element);

                selectKategori.append(
                    `<option value=${element.id}>${element.jenjang} - ${
                    element.kategori
                } - ${element.lingkup == 1 ? "Pusat" : "Daerah"}</option>`
                );
            });
        })
        .done(function (e) {
            console.log(e);
        })
        .fail(function (e) {
            console.log(e);
        })
        .always(function (e) {
            console.log(e);
        });
};

const updateProfile = data => {
    if ($(".alert-sijabfung")) {
        $(".alert-sijabfung").remove();
    }
    $.post("/profile/update", {
            _token: CSRF_TOKEN,
            data: data
        })
        .done(function (e) {
            if (e.error) {
                $("#updateProfile").before(
                    `<div class="alert-sijabfung alert-sijabfung-danger">${e.message}</div>`
                );
            } else {
                if (typeof Storage !== "undefined") {
                    sessionStorage.setItem("edit", true);
                    sessionStorage.setItem("messages", "Profile berhasil diperbarui");
                    window.location.reload();
                } else {
                    alert(
                        "Sorry, your browser does not support Web Storage..."
                    );
                }
            }
        })
        .fail(function (e) {});
};

// add the rule here
$.validator.addMethod(
    "valueEquals",
    function (value, element, arg) {
        return arg != value;
    },
    "Value must equal arg."
);

$.validator.addMethod(
    "valueNotEquals",
    function (value, element, arg) {
        if (value == $('input[name="password"]').val()) {
            return true;
        }
        return false;
    },
    "Password and confirm password fields do not match"
);

$.validator.addMethod(
    "passwordCheck",
    function (value, element, arg) {
        var reg = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        );
        if (reg.test(value)) {
            return true;
        }
        return false;
    },
    "Password must be eight characters or longer, contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character,1 numeric character, least one special character"
);

$("#form-profile").validate({
    rules: {
        nama: {
            required: true
        },
        nip: {
            required: true,
            maxlength: 9,
            number: true,
            minlength: 9
        },
        tempat_lahir: {
            required: true
        },
        tanggal_lahir: {
            required: true,
            date: true
        },
        golongan: {
            required: true,
            valueEquals: 0
        },
        instansi_pembina: {
            required: true,
            valueEquals: 0
        },
        rumpun_jabatan: {
            required: true,
            valueEquals: 0
        },
        jabatan_fungsional: {
            required: true,
            valueEquals: 0
        },
        jenjang_kategori_lingkup: {
            required: true,
            valueEquals: 0
        },
        unit_kerja_saat_ini: {
            required: true,
            valueEquals: 0
        }
    },
    messages: {
        nama: {
            required: "Nama is required"
        },
        nip: {
            required: "NIP is required",
            maxlength: "Panjang data harus 9 karakter",
            minlength: "Panjang data harus 9 karakter",
            number: "Data harus berupa angka"
        },
        tempat_lahir: {
            required: "Tempat lahir is required"
        },
        tanggal_lahir: {
            required: "Tanggal lahir is required"
        },
        golongan: {
            required: "Golongan is required",
            valueEquals: "Please select an item!"
        },
        instansi_pembina: {
            required: "Instansi Pembina is required",
            valueEquals: "Please select an item!"
        },
        rumpun_jabatan: {
            required: "Instansi Pembina is required",
            valueEquals: "Please select an item!"
        },
        jabatan_fungsional: {
            required: "Instansi Pembina is required",
            valueEquals: "Please select an item!"
        },
        jenjang_kategori_lingkup: {
            required: "Instansi Pembina is required",
            valueEquals: "Please select an item!"
        },
        unit_kerja_saat_ini: {
            required: "Unit kerja is required"
        }
    },
    submitHandler: function (form) {
        const data = {
            nip: $('input[name="nip"]').val(),
            name: $('input[name="nama"]').val(),
            birthday_place: $('input[name="tempat_lahir"]').val(),
            birthday_date: $('input[name="tanggal_lahir"]').val() != null ?
                Date.parse(
                    $('input[name="tanggal_lahir"]').val()
                ).toString("yyyy-MM-dd") : null,
            golongan: $('select[name="golongan"]').val(),
            id_jenjang_jabfung: $(
                'select[name="jenjang_kategori_lingkup"]'
            ).val(),
            unit_kerja: $('input[name="unit_kerja_saat_ini"]').val()
        };

        updateProfile(data);
    }
});

$(".datepicker").datepicker({
    dateFormat: "mm-dd-yy",
    todayBtn: "linked",
    clearBtn: true,
    changeYear: true,
    changeMonth: true,
    yearRange: "c-60:c"
});
// show option rumpun jabatan
$('select[name="instansi_pembina"]').change(function () {
    console.log($(this).val());

    selectOptionRumpunJabatan($(this).val());
    $('select[name="jabatan_fungsional"]').empty();
    $('select[name="jabatan_fungsional"]').append(
        `<option>Pilih Jabatan Fungsional</option>`
    );
    $('select[name="jenjang_kategori_lingkup"]').empty();
    $('select[name="jenjang_kategori_lingkup"]').append(
        `<option>Pilih Jenjang - Kategori - Lingkup</option>`
    );
});
// show option jabatan fungsional
$('select[name="rumpun_jabatan"]').change(function () {
    $('select[name="jenjang_kategori_lingkup"]').empty();
    $('select[name="jenjang_kategori_lingkup"]').append(
        `<option>Pilih Jenjang - Kategori - Lingkup</option>`
    );
    selectOptionJabatanFungsional($(this).val());
});

$('select[name="jabatan_fungsional"]').change(function () {
    const data = {
        id_jabfung: $(this).val()
    };
    selectOptionJenjangKategoriLingkup(data);
});

$('input[name="photo-profile"]').change(e => {
    console.log($("#form-photo")[0]);

    const formData = new FormData();
    const files = $('input[name = "photo-profile"]')[0].files[0];
    formData.append("file", files);
    formData.append("_token", CSRF_TOKEN);
    $.ajax({
        url: "/profile/photo", //server script to process data
        type: "POST",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: result => {
            console.log(result);

            if (result.error === false) {
                if (typeof Storage !== "undefined") {
                    sessionStorage.setItem("photo-success", true);
                    sessionStorage.setItem("messages", "Foto profile berhasil diperbarui");
                    window.location.reload();
                } else {
                    alert("Sorry, your browser does not support Web Storage...");
                }
            }

        },
        error: responseError => {
            $("#form-photo").before(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
    Terjadi kesalahan saat mengubah password. Silakan hubungi kontak yang tersedia.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>`);
        }
    });
});
