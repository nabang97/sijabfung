const tableJabatanFungsional = $("#tableJabatanFungsional").DataTable({
    processing: true,
    ajax: {
        url: "/api/pegawai",
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
            data: `name`
        },
        {
            data: {
                birthday_date: "birthday_date",
                birthday_place: "birthday_place"
            },
            render: function(data, type, row, meta) {
                return `${data.birthday_place}, ${data.birthday_date}`;
            }
        },
        {
            data: "golongans.name"
        },
        {
            data: "jenjang_jabatan.detail_jabfung.jabfung.nama"
        },
        {
            defaultContent: `<center><button type="button" class="btn btn-primary btn-sm" id="viewDiklat" data-toggle="modal" data-target="#modalViewDiklat">View</button></center>`
        }
    ]
});

const selectOptionJabatanFungsional = () => {
    return $.get("/api/jabatan-fungsional", function(result, status) {
        const selectJabfung = $('select[name="jabatan-fungsional"]');
        selectJabfung.empty();
        selectJabfung.append(`<option>Pilih Jabatan Fungsional</option>`);
        result.forEach(element => {
            selectJabfung.append(
                `<option value=${element.id}>${element.nama}</option>`
            );
        });
    })
        .done(e => {})
        .fail(function(e) {});
};

const selectOptionJenjangKategoriLingkup = data => {
    $.get("/api/jenjang-jabatan/option", data, function(data, status) {
        const selectKategori = $('select[name="jenjang-kategori-lingkup"]');
        selectKategori.empty();
        selectKategori.append(
            `<option>Pilih Jenjang-Kategori-Lingkup</option>`
        );
        data.forEach(element => {
            selectKategori.append(
                `<option value=${element.id}>${element.jenjang} - ${
                    element.kategori
                } - ${element.linkup == 1 ? "Pusat" : "Daerah"}</option>`
            );
        });
    })
        .done(function(e) {})
        .fail(function(e) {});
};

const getDiklat = data => {
    const tableDiklat = $("#tableDiklat").DataTable();
    tableDiklat.clear().draw();

    $.get("/pegawai/diklat", data, function(data, status) {})
        .done(function(e) {
            if (e.length != 0) {
                let no = 0;
                e.forEach(element => {
                    no = no + 1;
                    tableDiklat.row
                        .add([no, element.name, element.tahun_mengikuti])
                        .draw();
                });
            }
            $("#modalViewDiklatLabel").html(data.name);
        })
        .fail(function(e) {});
};

$(document).ready(() => {
    selectOptionJabatanFungsional();
    tableJabatanFungsional;

    $('select[name="jabatan-fungsional"]').change(e => {
        const id = $('select[name="jabatan-fungsional"]').val();
        const data = {
            id_jabfung: id
        };
        selectOptionJenjangKategoriLingkup(data);
    });

    $("#tableJabatanFungsional tbody ").on("click", "button", function() {
        var data = tableJabatanFungsional.row($(this).parents("tr")).data();

        if (this.id == "viewDiklat") {
            getDiklat(data);
        }
    });
});
