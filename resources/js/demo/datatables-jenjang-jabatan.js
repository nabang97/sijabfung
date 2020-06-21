var CSRF_TOKEN = $('meta[name="csrf-token"]').attr("content");
const getJenjangJabatan = $("#tableJenjangJabatan").DataTable({
    processing: true,
    ajax: {
        url: "/api/jenjang-jabatan",
        dataType: "json",
        cache: false,
        dataSrc: ""
    },
    order: [[1]],
    columns: [
        {
            render: function(data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            }
        },
        {
            data: `nama`
        },
        {
            data: `detail_jabfung.jabfung.nama`
        },
        {
            data: `detail_jabfung.kategori.name`
        },
        {
            data: `detail_jabfung.lingkup`,
            render: function(data, type, row, meta) {
                return data == 1 ? "Pusat" : "Daerah";
            }
        },
        {
            defaultContent: `<button type="button" id="btnEditJenjangJabatan" data-toggle="modal" data-target="#modalEditJenjangJabatan" class="btn btn-sm btn-primary" >Edit</button>
            <button type="button"  id="btnRemoveJenjangJabatan" class="btn btn-sm btn-primary">Remove</button>
            `
        }
    ]
});

const selectOptionIntansiPembina = () => {
    return $.get("/api/instansi-pembina", function(data, status) {
        const selectInstansiPembina = $('select[name="instansi-pembina"]');
        selectInstansiPembina.empty();
        selectInstansiPembina.append(`<option>Pilih Instansi Pembina</option>`);
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
            const selectRumpunJabatan = $('select[name="rumpun-jabatan"]');
            selectRumpunJabatan.empty();
            selectRumpunJabatan.append(`<option>Pilih Rumpun Jabatan</option>`);
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
            const selectJabfung = $('select[name="jabatan-fungsional"]');
            selectJabfung.empty();
            selectJabfung.append(`<option>Pilih Jabatan Fungsional</option>`);
            result.forEach(element => {
                selectJabfung.append(
                    `<option value=${element.id}>${element.nama}</option>`
                );
            });
        }
    ).fail(function(e) {});
};

const selectOptionKategoriLingkup = data => {
    return $.get(
        "/api/detail-jabfung/kategori-lingkup",
        {
            id_jabfung: data
        },
        function(result, status) {
            const selectKategori = $('select[name="kategori"]');
            selectKategori.empty();
            selectKategori.append(`<option>Kategori - Lingkup</option>`);
            result.forEach(element => {
                selectKategori.append(
                    `<option value="${element.id}">${element.kategori.name} - ${
                        element.lingkup == 1 ? "Pusat" : "Daerah"
                    }</option>`
                );
            });
        }
    )
        .done(function(e) {})
        .fail(function(e) {})
        .always(function(e) {});
};

const insertJenjangJabatan = async data => {
    $.post("/api/jenjang-jabatan/store", {
        data: data,
        _token: CSRF_TOKEN
    })
        .done(function(e) {
            getJenjangJabatan.ajax.reload();
        })
        .fail(function(e) {});
};

const showDataToEdit = data => {
    const element = $(".modal-body");
    element.find('input[name="id-jenjang-jabatan"').val(data.id);
    element.find('input[name="nama-jenjang-jabatan"').val(data.nama);
    selectOptionIntansiPembina()
        .done(() => {
            element
                .find('select[name="instansi-pembina"]')
                .val(data.detail_jabfung.jabfung.rumpun_jabatan.id_instansi);
        })
        .then(() => {
            return new Promise(() => {
                selectOptionRumpunJabatan(
                    data.detail_jabfung.jabfung.rumpun_jabatan.id_instansi
                )
                    .done(() => {
                        element
                            .find('select[name="rumpun-jabatan"]')
                            .val(data.detail_jabfung.jabfung.id_rumpun_jabatan);
                    })
                    .then(() => {
                        return new Promise(() => {
                            selectOptionJabatanFungsional(
                                element
                                    .find('select[name="rumpun-jabatan"]')
                                    .val()
                            )
                                .done(() => {
                                    element
                                        .find(
                                            'select[name="jabatan-fungsional"]'
                                        )
                                        .val(data.detail_jabfung.jabfung.id);
                                })
                                .then(() => {
                                    return new Promise(() => {
                                        selectOptionKategoriLingkup(
                                            element
                                                .find(
                                                    'select[name="jabatan-fungsional"]'
                                                )
                                                .val()
                                        ).done(() => {
                                            element
                                                .find('select[name="kategori"]')
                                                .val(data.detail_jabfung.id);
                                        });
                                    });
                                });
                        });
                    });
            });
        });
};

const updateJenjangJabatan = async data => {
    $.post("/api/jenjang-jabatan/update", {
        data: data,
        _token: CSRF_TOKEN
    })
        .done(function(e) {
            getJenjangJabatan.ajax.reload();
        })
        .fail(function(e) {})
        .always(function(e) {});
};

const deleteJenjangJabatan = data => {
    $.post("/api/jenjang-jabatan/destroy", {
        data: data,
        _token: CSRF_TOKEN
    })
        .done(function(e) {
            getJenjangJabatan.ajax.reload();
        })
        .fail(function(e) {})
        .always(function(e) {});
};

$(document).ready(function() {
    getJenjangJabatan;

    $("#addJenjangJabatan").click(function() {
        selectOptionIntansiPembina();
    });

    // show option rumpun jabatan
    $('select[name="instansi-pembina"]').change(function() {
        selectOptionRumpunJabatan($(this).val());
        $('select[name="jabatan-fungsional"]').empty();
        $('select[name="jabatan-fungsional"]').append(
            `<option>Pilih Jabatan Fungsional</option>`
        );
    });

    // show option jabatan fungsional
    $('select[name="rumpun-jabatan"]').change(function() {
        selectOptionJabatanFungsional($(this).val());
    });
    $('select[name="jabatan-fungsional"]').change(function() {
        selectOptionKategoriLingkup($(this).val());
    });

    // store data
    $("#btnAddJenjangJabatan").click(function() {
        const data = {
            nama: $('input[name="nama-jenjang-jabatan"]').val(),
            detail_jabfung: $('select[name="kategori"]').val()
        };

        insertJenjangJabatan(data);
    });

    // show data in modal to edit
    $("#tableJenjangJabatan tbody ").on("click", "button", function() {
        var data = getJenjangJabatan.row($(this).parents("tr")).data();

        if (this.id == "btnEditJenjangJabatan") {
            showDataToEdit(data);
        }

        // delete data
        if (this.id == "btnRemoveJenjangJabatan") {
            deleteJenjangJabatan(data);
        }
    });

    // Update data
    $("#btnUpdateJenjangJabatan").click(function() {
        const element = $(this)
            .parents(".modal-content")
            .find(".modal-body");
        let data = {
            id: element.find('input[name="id-jenjang-jabatan"]').val(),
            nama: $('input[name="nama-jenjang-jabatan"]').val(),
            detail_jabfung: $('select[name="kategori"]').val()
        };

        updateJenjangJabatan(data);
    });
});
