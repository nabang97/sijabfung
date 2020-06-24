var CSRF_TOKEN = $('meta[name="csrf-token"]').attr("content");

var nipBeforeUpdate;
const tablePegawai = $("#tablePegawai").DataTable({
    processing: true,
    ajax: {
        url: "/api/pegawai",
        dataType: "json",
        cache: false,
        dataSrc: ""
    },
    order: [
        [1, "asc"]
    ],
    columns: [{
            render: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            }
        },
        {
            data: "nip"
        },
        {
            data: "name"
        },
        {
            data: "birthday_place"
        },
        {
            data: "birthday_date",
            render: function (data, type, row, meta) {
                return Date.parse(data).toString("dd MMMM yyyy");
            }
        },
        {
            data: "golongans.name"
        },
        {
            data: "jenjang_jabatan.detail_jabfung.jabfung.nama"
        },
        {
            data: "jenjang_jabatan.nama"
        },
        {
            defaultContent: '<button type="button" id="btnEditPegawai" data-toggle="modal" data-target="#modalEditPegawai" class="btn btn-sm btn-primary" >Edit</button> <button type="button"  id="btnRemovePegawai" class="btn btn-sm btn-primary">Remove</button>'
        }
    ]
});

const deletePegawai = data => {
    $.post("/api/pegawai/destroy", {
            nip: data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            tablePegawai.ajax.reload();
        })
        .fail(function (e) {})
        .always(function (e) {});
};

const getGolongan = function () {
    $.get("/api/golongan", function (data, status) {
        data.forEach(element => {
            $('select[name="golongan"]').append(
                `<option value=${element.id}>${element.name}</option>`
            );
        });
    });
};

getGolongan();

const updatePegawai = data => {
    if ($(".alert")) {
        $(".alert").remove();
    }

    $.post("/api/pegawai/profile/update", {
            data: data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            console.log(e);
            if (e.error) {
                $(".data-alert").before(
                    `<div class="alert alert-danger">${e.message}</div>`
                );
            } else {
                nipBeforeUpdate = data.nip;
                $(".data-alert").before(
                    `<div class="alert alert-success">${e.message}</div>`
                );
                tablePegawai.ajax.reload();
            }
        })
        .fail(function (e) {
            console.log(e);

            $(".data-alert").before(
                `<div class="alert alert-danger">Terjadi kesalahan pada server. Silakan hubungi operator dan coba beberapa saat lagi.</div>`
            );
        })
        .always(function (e) {});
};

const selectOptionIntansiPembina = () => {
    return $.get("/api/instansi-pembina", function (data, status) {
            const selectInstansiPembina = $('select[name="instansi_pembina"]');
            selectInstansiPembina.empty();
            selectInstansiPembina.append(`<option>Pilih Instansi Pembina</option>`);
            data.forEach(element => {
                selectInstansiPembina.append(
                    `<option value=${element.id}>${element.name}</option>`
                );
            });
        })
        .done(function (e) {})
        .fail(function (e) {})
        .always(function (e) {});
};

const selectOptionRumpunJabatan = value => {
    return $.get(
            "/api/rumpun-jabatan-option", {
                id: value
            },
            function (result, status) {
                const selectRumpunJabatan = $('select[name="rumpun_jabatan"]');
                selectRumpunJabatan.empty();
                selectRumpunJabatan.append(`<option>Pilih Rumpun Jabatan</option>`);
                result.forEach(element => {
                    selectRumpunJabatan.append(
                        `<option value=${element.id}>${element.nama}</option>`
                    );
                });
            }
        )
        .done(function (e) {})
        .fail(function (e) {})
        .always(function (e) {});
};

const selectOptionJabatanFungsional = value => {
    return $.get(
            "/api/jabatan-fungsional-option", {
                id: value
            },
            function (result, status) {
                const selectJabfung = $('select[name="jabatan_fungsional"]');
                selectJabfung.empty();
                selectJabfung.append(`<option>Pilih Jabatan Fungsional</option>`);
                result.forEach(element => {
                    selectJabfung.append(
                        `<option value=${element.id}>${element.nama}</option>`
                    );
                });
            }
        )
        .done(function (e) {})
        .fail(function (e) {})
        .always(function (e) {});
};

const selectOptionJenjangJabatan = data => {
    return $.get(
            "/api/jenjang-jabatan-option", {
                data: data
            },
            function (result, status) {
                const selectJabfung = $('select[name="jenjang_jabatan"]');
                selectJabfung.empty();
                selectJabfung.append(`<option>Pilih Jenjang Jabatan</option>`);
                result.forEach(element => {
                    selectJabfung.append(
                        `<option value=${element.id}>${element.nama}</option>`
                    );
                });
            }
        )
        .done(function (e) {})
        .fail(function (e) {})
        .always(function (e) {});
};

const selectOptionJenjangKategoriLingkup = data => {
    return $.get(
            "/api/jenjang-jabatan/option", {
                id_jabfung: data,
                _token: CSRF_TOKEN
            },
            function (data, status) {
                const selectKategori = $('select[name="jenjang_kategori_lingkup"]');
                selectKategori.empty();
                selectKategori.append(
                    `<option>Pilih Jenjang-Kategori-Lingkup</option>`
                );
                data.forEach(element => {
                    selectKategori.append(
                        `<option value=${element.id}>${element.jenjang} - ${
                        element.kategori
                    } - ${element.lingkup == 1 ? "Pusat" : "Daerah"}</option>`
                    );
                });
            }
        )
        .done(function (e) {})
        .fail(function (e) {});
};

const selectOptionKategori = data => {
    return $.get("/api/kategori-option", data, function (data, status) {
            const selectKategori = $('select[name="kategori"]');
            selectKategori.empty();
            selectKategori.append(`<option>Pilih Kategori</option>`);
            data.forEach(element => {
                selectKategori.append(
                    `<option value=${element.id}>${element.name}</option>`
                );
            });
        })
        .done(function (e) {})
        .fail(function (e) {})
        .always(function (e) {});
};

const getAccount = data => {
    return $.post("/api/pegawai/account", {
            nip: data,
            _token: CSRF_TOKEN
        })
        .done(function (response) {
            $('input[name="email"]').val(response.email);
        })
        .fail(function (e) {})
        .always(function (e) {});
};

const showDataEdit = data => {
    if ($(".alert")) {
        $(".alert").remove();
    }
    const element = $(".modal-body");
    nipBeforeUpdate = data.nip;
    element.find('input[name="nip"]').val(data.nip);
    element.find('input[name="unit_kerja_saat_ini"]').val(data.unit_kerja);
    element.find('input[name="nama"]').val(data.name);
    element.find('input[name="tempat_lahir"]').val(data.birthday_place);
    element
        .find('input[name="tanggal_lahir"]')
        .val(Date.parse(data.birthday_date).toString("MM-dd-yyyy"));
    element.find('select[name="golongan"]').val(data.golongan);
    selectOptionIntansiPembina()
        .done(() => {
            element
                .find('select[name="instansi_pembina"]')
                .val(
                    data.jenjang_jabatan.detail_jabfung.jabfung.rumpun_jabatan
                    .instansi_pembina.id
                );
        })
        .then(() => {
            return new Promise(() => {
                selectOptionRumpunJabatan(
                        data.jenjang_jabatan.detail_jabfung.jabfung.rumpun_jabatan
                        .id_instansi
                    )
                    .done(() => {
                        element
                            .find('select[name="rumpun_jabatan"]')
                            .val(
                                data.jenjang_jabatan.detail_jabfung.jabfung
                                .rumpun_jabatan.id
                            );
                    })
                    .then(() => {
                        return new Promise(() => {
                            selectOptionJabatanFungsional(
                                    data.jenjang_jabatan.detail_jabfung.jabfung
                                    .rumpun_jabatan.id
                                )
                                .done(() => {
                                    element
                                        .find(
                                            'select[name="jabatan_fungsional"]'
                                        )
                                        .val(
                                            data.jenjang_jabatan.detail_jabfung
                                            .jabfung.id
                                        );
                                })
                                .then(() => {
                                    return new Promise(() => {
                                        selectOptionJenjangKategoriLingkup(
                                            data.jenjang_jabatan.detail_jabfung
                                            .jabfung.id
                                        ).done(() => {
                                            element
                                                .find(
                                                    'select[name="jenjang_kategori_lingkup"]'
                                                )
                                                .val(data.jenjang_jabatan.id);
                                        });
                                    });
                                });
                        });
                    });
            });
        });

    getAccount(data.nip);
};

const insertPegawai = data => {
    $.post("/api/pegawai/store", {
            data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            tablePegawai.ajax.reload();
        })
        .fail(function (e) {});
};

const register = data => {
    if ($(".alert-sijabfung")) {
        $(".alert-sijabfung").remove();
    }
    return $.post("/api/register/create", {
            data,
            _token: CSRF_TOKEN
        })
        .done(response => {
            if (response.error) {
                $(".data-alert").before(
                    `<div class="alert alert-danger">${response.message}</div>`
                );
            } else {
                createAccount(data);
            }
        })
        .fail(function (e) {});
};

const createAccount = data => {
    if ($(".alert")) {
        $(".alert").remove();
    }
    return $.post("/api/register/create/account", {
            data,
            _token: CSRF_TOKEN
        })
        .done(response => {
            if (response.error) {
                $(".data-alert").before(
                    `<div class="alert alert-danger">${response.message}</div>`
                );
            } else {
                $(".data-alert").before(
                    `<div class="alert alert-success">${response.message}</div>`
                );
                tablePegawai.ajax.reload();
                document.getElementById("form-regis").reset();
            }
        })
        .fail(function (data) {});
};

const updateProfile = data => {
    if ($(".alert")) {
        $(".alert").remove();
    }
    $.post("/profile/update", {
            _token: CSRF_TOKEN,
            data: data
        })
        .done(function (e) {
            if (e.error) {
                $("#updateProfile").before(
                    `<div class="alert alert-danger">${e.message}</div>`
                );
            } else {
                var url = window.location.href;
                if (url.indexOf("?") > -1) {
                    url += "&status=success";
                } else {
                    url += "?&status=success";
                }
                window.location.href = url;
                $(window).bind("load");
                $("#updateProfile").before(
                    `<div class="alert alert-success">${e.message}</div>`
                );
            }
        })
        .fail(function (e) {});
};

const updateAccount = data => {
    $.post("/api/pegawai/account/update", {
            _token: CSRF_TOKEN,
            data
        })
        .done(function (e) {})
        .fail(function (e) {
            console.log(e);
        });
};

$(document).ready(function () {
    tablePegawai;

    $("#addPegawai").click(function () {
        selectOptionIntansiPembina();
    });

    // show option rumpun jabatan
    $('select[name="instansi_pembina"]').change(function () {
        selectOptionRumpunJabatan($(this).val());
        $('select[name="jabatan_fungsional"]').empty();
        $('select[name="jabatan_fungsional"]').append(
            `<option>Pilih Jabatan Fungsional</option>`
        );
    });

    // show option jabatan fungsional
    $('select[name="rumpun_jabatan"]').change(function () {
        selectOptionJabatanFungsional($(this).val());
    });

    $('select[name="jabatan_fungsional"]').change(function () {
        const data = {
            id_jabfung: $(this).val()
        };
        selectOptionJenjangKategoriLingkup(data);
    });

    tablePegawai
        .on("order.dt search.dt", function () {
            tablePegawai
                .column(0, {
                    search: "applied",
                    order: "applied"
                })
                .nodes()
                .each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
        })
        .draw();

    $("#tablePegawai tbody ").on("click", "button", function () {
        var data = tablePegawai.row($(this).parents("tr")).data();

        if (this.id == "btnEditPegawai") {
            showDataEdit(data);
        }
        if (this.id == "btnRemovePegawai") {
            deletePegawai(data.nip);
        }
    });

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
            if (value == $('input[name="new_password"]').val()) {
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

    var validationRules = {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            passwordCheck: false
        },
        confirm_password: {
            required: true,
            valueNotEquals: true
        },
        nama: {
            required: true
        },
        nip: {
            required: true,
            maxlength: 18,
            number: true,
            minlength: 18
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
    };

    var validationMessages = {
        email: {
            required: "Email is required"
        },
        password: {
            required: "Sandi is required",
            passwordCheck: "Password must be eight characters or longer, contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character,1 numeric character, least one special character"
        },
        confirm_password: {
            required: "Konfirm Sandi is required",
            valueNotEquals: "Sandi dan Konfirmasi Sandi tidak cocok"
        },
        nama: {
            required: "Nama is required"
        },

        nip: {
            required: "NIP is required",
            maxlength: "Panjang data harus 18 karakter",
            minlength: "Panjang data harus 18 karakter",
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
    };

    const dataForm = () => {
        const email = $('input[name="email"]').val();
        const password = $('input[name="new_password"]').val();
        const confirmPassword = $('input[name="confirm_password"]').val();
        const nip = $('input[name="nip"]').val();
        const nama = $('input[name="nama"]').val();
        const tempatLahir = $('input[name="tempat_lahir"]').val();
        const tanggalLahir =
            $('input[name="tanggal_lahir"]').val() != null ?
            Date.parse($('input[name="tanggal_lahir"]').val()).toString(
                "yyyy-MM-dd"
            ) :
            null;
        const jenjangJabatan = $(
            'select[name="jenjang_kategori_lingkup"]'
        ).val();
        const unitKerja = $('input[name="unit_kerja_saat_ini"]').val();
        const golongan = $('select[name="golongan"]').val();
        const data = {
            email: email,
            password: password,
            confirm_password: confirmPassword,
            nip: nip,
            name: nama,
            golongan: golongan,
            tempat_lahir: tempatLahir,
            tanggal_lahir: tanggalLahir,
            jenjang_kategori_lingkup: jenjangJabatan,
            unit_kerja_saat_ini: unitKerja
        };
        return data;
    };

    $("#form-regis").validate({
        rules: validationRules,
        messages: validationMessages,
        submitHandler: function (form) {
            register(dataForm());
        }
    });

    $("#form-update-account").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            new_password: {
                required: true,
                passwordCheck: false
            },
            confirm_password: {
                required: true,
                valueNotEquals: true
            }
        },
        messages: {
            email: {
                required: "Email is required"
            },
            new_password: {
                required: "Sandi is required",
                passwordCheck: "Password must be eight characters or longer, contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character,1 numeric character, least one special character"
            },
            confirm_password: {
                required: "Konfirm Sandi is required",
                valueNotEquals: "Sandi dan Konfirmasi Sandi tidak cocok"
            }
        },
        submitHandler: function (form) {
            const data = {
                email: $(form)
                    .find('input[name="email"]')
                    .val(),
                password: $(form)
                    .find('input[name="new_password"]')
                    .val(),
                nip: nipBeforeUpdate
            };

            updateAccount(data);
        }
    });

    $("#form-update-pegawai").validate({
        rules: {
            nama: {
                required: true
            },
            nip: {
                required: true,
                maxlength: 18,
                number: true,
                minlength: 18
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
                maxlength: "Panjang data harus 18 karakter",
                minlength: "Panjang data harus 18 karakter",
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
        submitHandler: form => {
            let data = {
                nipBeforeUpdate: nipBeforeUpdate,
                nip: $(form)
                    .find('input[name="nip"]')
                    .val(),
                name: $(form)
                    .find('input[name="nama"]')
                    .val(),
                birthday_date: Date.parse(
                    $(form)
                    .find('input[name="tanggal_lahir"]')
                    .val()
                ).toString("yyyy-MM-dd"),
                birthday_place: $(form)
                    .find('input[name="tempat_lahir"]')
                    .val(),
                golongan: $(form)
                    .find('select[name="golongan"]')
                    .val(),
                id_jenjang_jabfung: $(form)
                    .find('select[name="jenjang_kategori_lingkup"]')
                    .val(),
                unit_kerja: $(form)
                    .find('input[name="unit_kerja_saat_ini"]')
                    .val()
            };
            console.log(data);

            updatePegawai(data);
        }
    });

    $(".datepicker").datepicker({
        dateFormat: "mm-dd-yy",
        todayBtn: "linked",
        clearBtn: true,
        changeYear: true,
        changeMonth: true,
        yearRange: "c-65:c"
        // autoclose: true
    });
});
