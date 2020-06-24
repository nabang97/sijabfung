const tableJabatanFungsional = $("#tableJabatanFungsional").DataTable({
    processing: true,
    serverSide: true,
    ajax: {
        url: "/api/pegawai",
        dataType: "json",
        cache: false,
        data: {
            jenjang: () => {
                return $('select[name="jenjang-kategori-lingkup"]').val();
            },
            jabfung: () => {
                return $('select[name="jabatan-fungsional"]').val();
            }
        }
    },
    columns: [{
            render: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            }
        },
        {
            data: `name`
        },
        {
            render: function (data, type, row, meta) {
                return `${row.birthday_place}, ${new Date(
                    row.birthday_date
                ).toString('d MMMM yyyy')}`;
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
    return $.get("/api/jabatan-fungsional", function (result, status) {
            const selectJabfung = $('select[name="jabatan-fungsional"]');
            selectJabfung.empty();
            selectJabfung.append(
                `<option value="0">Pilih Jabatan Fungsional</option>
            <option value="all">All</option>`
            );
            result.forEach(element => {
                selectJabfung.append(
                    `<option value=${element.id}>${element.nama}</option>`
                );
            });
        })
        .done(e => {})
        .fail(function (e) {});
};

const selectOptionJenjangKategoriLingkup = data => {
    $.get("/api/jenjang-jabatan/option", data, function (data, status) {
            const selectKategori = $('select[name="jenjang-kategori-lingkup"]');
            selectKategori.empty();
            selectKategori.append(
                `<option value="0">Pilih Jenjang-Kategori-Lingkup</option>
            <option value="all">All</option>`
            );
            data.forEach(element => {
                selectKategori.append(
                    `<option value=${element.id}>${element.jenjang} - ${
                    element.kategori
                } - ${element.linkup == 1 ? "Pusat" : "Daerah"}</option>`
                );
            });
        })
        .done(function (e) {})
        .fail(function (e) {});
};

const getDiklat = data => {
    const tableDiklat = $("#tableDiklat").DataTable();
    tableDiklat.clear().draw();

    $.get("/pegawai/diklat", data, function (data, status) {})
        .done(function (e) {
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
        .fail(function (e) {});
};

$(document).ready(() => {
    selectOptionJabatanFungsional();
    tableJabatanFungsional;

    $('select[name="jabatan-fungsional"]').change(e => {
        const id = $('select[name="jabatan-fungsional"]').val();
        const data = {
            id_jabfung: id
        };
        if (id == "all") {
            const selectKategori = $('select[name="jenjang-kategori-lingkup"]');
            selectKategori.empty();
            selectKategori.append(
                `<option value="0">Pilih Jenjang-Kategori-Lingkup</option>
            <option value="all">All</option>`
            );
        } else {
            selectOptionJenjangKategoriLingkup(data);
        }
    });

    $("#tableJabatanFungsional tbody ").on("click", "button", function () {
        var data = tableJabatanFungsional.row($(this).parents("tr")).data();

        if (this.id == "viewDiklat") {
            getDiklat(data);
        }
    });

    $("#searchJabfung").click(() => {
        const data = {
            jenjang: $('select[name="jenjang-kategori-lingkup"]').val(),
            jabfung: $('select[name="jabatan-fungsional"]').val()
        };

        tableJabatanFungsional.ajax.reload();
    });
});
