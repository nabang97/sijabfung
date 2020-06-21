var CSRF_TOKEN = $('meta[name="csrf-token"]').attr("content");

const getJabatanFungsional = $("#tableJabFung").DataTable({
    processing: true,
    ajax: {
        url: "/api/detail-jabfung",
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
            data: `jabfung.nama`
        },
        {
            data: `kategori.name`
        },
        {
            data: `lingkup`,
            render: function (data, type, row, meta) {
                switch (data) {
                    case 1:
                        return "Pusat";
                        break;

                    case 2:
                        return "Daerah";
                        break;

                    default:
                        return "-";
                        break;
                }
            }
        },
        {
            data: `jabfung.rumpun_jabatan.nama`
        },
        {
            data: `jabfung.rumpun_jabatan.instansi_pembina.name`
        },
        {
            defaultContent: `<button type="button" id="btnEditJabFung" data-toggle="modal" data-target="#modalEditJabFung" class="btn btn-sm btn-primary" >Edit</button>
            <button type="button"  id="btnRemoveJabFung" class="btn btn-sm btn-danger">Remove</button>
            `
        }
    ]
});

const selectOptionIntansiPembina = () => {
    $.get("/api/instansi-pembina", function (data, status) {
            const selectInstansiPembina = $('select[name="instansi-pembina"]');
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
    return $.get("/api/rumpun-jabatan-option", {
            id: value
        }, function (
            result,
            status
        ) {
            const selectRumpunJabatan = $('select[name="rumpun-jabatan"]');
            selectRumpunJabatan.empty();
            selectRumpunJabatan.append(`<option>Pilih Rumpun Jabatan</option>`);
            result.forEach(element => {
                selectRumpunJabatan.append(
                    `<option value=${element.id}>${element.nama}</option>`
                );
            });
        })
        .done(function (e) {})
        .fail(function (e) {})
};

const selectOptionKategori = () => {
    $.get("/api/kategori", function (data, status) {
            const selectKategori = $("#checkbox-kategori");
            selectKategori.empty();
            selectKategori.append(
                `<label for="selectJabatan">Kategori</label> <br>`
            );
            let no = 0;

            data.forEach(element => {

                no = no + 1;
                selectKategori.append(`
            <div class="form-check form-check-inline">
                <input class="form-check-input check-kategori" type="checkbox" id="checkbox${no}" value="${element.id}">
                <label class="form-check-label" for="checkbox${no}">${element.name}</label>
            </div>
            `);
            });
        })
        .done(function (e) {})
        .fail(function (e) {})
        .always(function (e) {});
};

const selectOptionJabatanFungsional = value => {

    return $.get("/api/jabatan-fungsional-option", {
            id: value
        }, function (
            result,
            status
        ) {
            const selectJabfung = $('select[name="jabatan-fungsional"]');
            selectJabfung.empty();
            selectJabfung.append(`<option>Pilih Jabatan Fungsional</option>`);
            result.forEach(element => {
                selectJabfung.append(
                    `<option value=${element.id}>${element.nama}</option>`
                );
            });
        })
        .done(function (e) {
            console.log(e);

        })
        .fail(function (e) {})
        .always(function (e) {});
};

const insertDetailJabFung = async data => {

    $.post("/api/detail-jabfung/store", {
            data: data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            getJabatanFungsional.ajax.reload();
        })
        .fail(function (e) {})
        .always(function (e) {});
};

const checkDetailJabfung = async data => {
    $.post("/api/detail-jabfung/check", {
            data: data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            if (e == "") {
                insertDetailJabFung(data);
            } else {
                alert(`data ${data.message} already exist`);
            }
        })
        .fail(function (e) {})
        .always(function (e) {});
};

const showDataToEdit = data => {
    const element = $(".modal-body");
    element.find('input[name="id-jabatan-fungsional"]').val(data.id);
    element.find('input[name="kategori"]').val(data.kategori);
    element.find('input[name="lingkup"]').val(data.lingkup);
    element.find('input[name="nama-jabatan-fungsional"').val(data.nama);
    element
        .find('select[name="instansi-pembina"]')
        .val(data.jabfung.rumpun_jabatan.id_instansi);
    selectOptionRumpunJabatan(data.jabfung.rumpun_jabatan.id_instansi).done(() => {
        element
            .find('select[name="rumpun-jabatan"]')
            .val(data.jabfung.id_rumpun_jabatan);
    }).then(() => {
        return new Promise(() => {
            selectOptionJabatanFungsional(data.jabfung.id_rumpun_jabatan).done(() => {
                element
                    .find('select[name="jabatan-fungsional"]')
                    .val(data.jabfung.id);
            })
        })
    });
    element.find('select[name="lingkup-jabatan"]').val(data.lingkup);
};

const updateJabFung = async data => {
    $.post("/api/detail-jabfung/update", {
            data: data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            getJabatanFungsional.ajax.reload();
            console.log(e);

        })
        .fail(function (e) {
            console.log(e);
        })
};

const deleteJabFung = data => {
    $.post("/api/detail-jabfung/destroy", {
            data: data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            getJabatanFungsional.ajax.reload();
        })
        .fail(function (e) {})
        .always(function (e) {});
};

$(document).ready(function () {
    getJabatanFungsional;
    selectOptionIntansiPembina();

    // show option rumpun jabatan
    $('select[name="instansi-pembina"]').change(function () {

        selectOptionRumpunJabatan($(this).val());
    });

    $('select[name="rumpun-jabatan"]').change(function () {

        selectOptionJabatanFungsional($(this).val());
    });

    selectOptionKategori();

    // store data
    $("#btnAddJabFung").click(function () {
        $(".check-kategori:checkbox:checked").each((index, element) => {
            let kategoriValue = $(element).val();

            $(".check-lingkup:checkbox:checked").each((idx, el) => {
                let linkupValue = $(el).val();
                let data = {
                    instansi: $('select[name="instansi-pembina"]').val(),
                    rumpun: $('select[name="rumpun-jabatan"]').val(),
                    jabatan: $('select[name="jabatan-fungsional"]').val(),
                    kategori: kategoriValue,
                    lingkup: linkupValue,
                    message: `${$(
                        'select[name="jabatan-fungsional"] option:selected'
                    ).html()} - ${$(element)
                        .next()
                        .text()} - ${$(el)
                        .next()
                        .text()} `
                };

                checkDetailJabfung(data);

                // insertDetailJabFung(data);
            });
        });

        // insertJabFung(data);
    });

    // show data in modal to edit
    $("#tableJabFung tbody ").on("click", "button", function () {
        var data = getJabatanFungsional.row($(this).parents("tr")).data();
        if (this.id == "btnEditJabFung") {
            console.log(data);

            showDataToEdit(data);
        }

        // delete data
        if (this.id == "btnRemoveJabFung") {
            deleteJabFung(data);
        }
    });

    // Update data
    $("#btnUpdateJabFung").click(function () {
        const element = $(this)
            .parents(".modal-content")
            .find(".modal-body");
        let data = {
            id: element.find('input[name="id-jabatan-fungsional"]').val(),
            jabfung: element.find('select[name="jabatan-fungsional"]').val(),
            kategori: element.find('input[name="kategori"]').val(),
            lingkup: element.find('input[name="lingkup"]').val()
        };
        console.log(data);

        updateJabFung(data);
    });
});
