var CSRF_TOKEN = $('meta[name="csrf-token"]').attr("content");

const selectOptionIntansiPembina = () => {
    return $.get("/api/instansi-pembina", function(data, status) {
        const selectInstansiPembina = $('select[name="instansi_pembina"]');
        selectInstansiPembina.empty();
        selectInstansiPembina.append(
            `<option value="0" >Pilih Instansi Pembina</option>`
        );
        data.forEach(element => {
            selectInstansiPembina.append(
                `<option value=${element.id}>${element.name}</option>`
            );
        });
    })
        .done(function(e) {})
        .fail(function(e) {})
        .always(function(e) {});
};

const selectOptionRumpunJabatan = value => {
    return $.get(
        "/api/rumpun-jabatan-option",
        {
            id: value
        },
        function(result, status) {
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
        .done(function(e) {})
        .fail(function(e) {})
        .always(function(e) {});
};

const selectOptionJabatanFungsional = value => {
    return $.get(
        "/api/jabatan-fungsional-option",
        {
            id: value
        },
        function(result, status) {
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
    ).fail(function(e) {});
};

const selectOptionJenjangKategoriLingkup = data => {
    return $.get("/api/jenjang-jabatan/option", data, function(data, status) {
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
        .done(function(e) {})
        .fail(function(e) {});
};

const register = data => {
    console.log(data);

    if ($(".alert")) {
        $(".alert").remove();
    }
    $.post("/api/register/create", {
        data,
        _token: CSRF_TOKEN
    })
        .done(response => {
            if (response.error) {
                $(".register-button").before(
                    `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    ${response.message}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`
                );
            } else {
                createAccount(data);
            }
        })
        .fail(function(e) {
            $(".register-button").before(
                `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                Terjadi kesalahan kesalahan. Silakan hubungi operator dan coba beberapa saat lagi
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`
            );
        });
};

const createAccount = data => {
    if ($(".alert")) {
        $(".alert").remove();
    }
    $.post("/api/register/create/account", {
        data,
        _token: CSRF_TOKEN
    })
        .done(response => {
            if (response.error) {
                $(".register-button").before(
                    `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    ${response.message}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`
                );
            } else {
                $(".register-button").before(
                    `<div class="alert alert-success alert-dismissible fade show" role="alert">
                    ${response.message}. Silakan login untuk menambahkan data diklat menggunakan Email/NIP yang telah anda daftarkan <a href="/login" style="color:blue">disini</a> 
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`
                );

                document.getElementById("form-regis").reset();
            }
        })
        .fail(function(e) {
            $(".register-button").before(
                `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                Terjadi kesalahan kesalahan. Silakan hubungi operator dan coba beberapa saat lagi
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`
            );
        });
};

const getGolongan = function() {
    $.get("/api/golongan", function(data, status) {
        data.forEach(element => {
            $('select[name="golongan"]').append(
                `<option value=${element.id}>${element.name}</option>`
            );
        });
    })
        .done(e => {})
        .fail(e => {});
};

$(document).ready(() => {
    selectOptionIntansiPembina();
    getGolongan();

    $(".datepicker").datepicker({
        dateFormat: "mm-dd-yy",
        todayBtn: "linked",
        clearBtn: true,
        changeYear: true,
        changeMonth: true,
        yearRange: "c-65:c"
        // autoclose: true
    });

    // show option rumpun jabatan
    $('select[name="instansi_pembina"]').change(function() {
        selectOptionRumpunJabatan($(this).val());
        $('select[name="jabatan_fungsional"]').empty();
        $('select[name="jabatan_fungsional"]').append(
            `<option>Pilih Jabatan Fungsional</option>`
        );
    });
    // show option jabatan fungsional
    $('select[name="rumpun_jabatan"]').change(function() {
        selectOptionJabatanFungsional($(this).val());
    });

    $('select[name="jabatan_fungsional"]').change(function() {
        const data = {
            id_jabfung: $(this).val()
        };
        selectOptionJenjangKategoriLingkup(data);
    });

    // add the rule here
    $.validator.addMethod(
        "valueEquals",
        function(value, element, arg) {
            return arg != value;
        },
        "Value must equal arg."
    );

    $.validator.addMethod(
        "valueNotEquals",
        function(value, element, arg) {
            if (value == $('input[name="password"]').val()) {
                return true;
            }
            return false;
        },
        "Password and confirm password fields do not match"
    );

    $.validator.addMethod(
        "passwordCheck",
        function(value, element, arg) {
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

    $("#form-regis").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            nama: {
                required: true
            },
            password: {
                required: true,
                passwordCheck: false
            },
            confirm_password: {
                required: true,
                valueNotEquals: true
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
            email: {
                required: "Email is required"
            },
            nama: {
                required: "Nama is required"
            },
            password: {
                required: "Sandi is required",
                passwordCheck:
                    "Password must be eight characters or longer, contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character,1 numeric character, least one special character"
            },
            confirm_password: {
                required: "Konfirm Sandi is required",
                valueNotEquals: "Sandi dan Konfirmasi Sandi tidak cocok"
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
        submitHandler: function(form) {
            const email = $('input[name="email"]').val();
            const password = $('input[name="password"]').val();
            const confirmPassword = $('input[name="confirm_password"]').val();
            const nip = $('input[name="nip"]').val();
            const nama = $('input[name="nama"]').val();
            const tempatLahir = $('input[name="tempat_lahir"]').val();
            const tanggalLahir =
                $('input[name="tanggal_lahir"]').val() != null
                    ? Date.parse(
                          $('input[name="tanggal_lahir"]').val()
                      ).toString("yyyy-MM-dd")
                    : null;
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

            register(data);
        }
    });
});
