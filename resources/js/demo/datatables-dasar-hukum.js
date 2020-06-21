var CSRF_TOKEN = $('meta[name="csrf-token"]').attr("content");

const getDasarHukum = $("#tableDasarHukum").DataTable({
    processing: true,
    ajax: {
        url: "/api/dasar-hukum",
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
            data: `judul`
        },
        {
            data: {
                id: "id",
                status: "status"
            },
            render: function (data, type, row, meta) {
                let classNames;
                if (data.status == 1) {
                    classNames = "btn btn-sm btn-success";
                    textPost = "Unpost";
                } else {
                    classNames = "btn btn-sm btn-primary";
                    textPost = "Post";
                }
                return `<a href="/dasar-hukum/view/${data.id}" target="_blank" class="btn btn-sm btn-primary">Download PDF file </a>                
                <button type="button"  id="btnEditDasarHukum" data-toggle="modal" data-target="#modalEditDasarHukum" class="btn btn-sm btn-primary">Edit</button>
                <button type="button"  id="btnPostDasarHukum" class="${classNames}">${textPost}</button>
                <button type="button"  id="btnRemoveDasarHukum" class="btn btn-sm btn-danger">Remove</button>
                `;
            }
        }
    ]
});

const deleteDasarHukum = data => {
    $.post("/api/dasar-hukum/destroy", {
            id: data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            getDasarHukum.ajax.reload();
            console.log(e);
        })
        .fail(function (e) {})
        .always(function (e) {
            console.log(e);
        });
};

const postDasarHukum = data => {
    $.post("/api/dasar-hukum/post", {
            id: data.id,
            status: !data.status,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            getDasarHukum.ajax.reload();
            console.log(e);
        })
        .fail(function (e) {
            console.log(e);
        })
};

const updateDasarHukum = data => {
    return $.post("/api/dasar-hukum/update", {
            data: data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            getDasarHukum.ajax.reload();
        })
        .fail(function (e) {})
        .always(function (e) {});
};

$(document).ready(() => {
    $("#tableDasarHukum tbody ").on("click", "button", function () {
        var data = getDasarHukum.row($(this).parents("tr")).data();

        // delete data
        if (this.id == "btnPostDasarHukum") {
            postDasarHukum(data);
        }

        if (this.id == "btnEditDasarHukum") {
            $('input[name="idDasarHukum"]').val(data.id);
            $('input[name="namaDasarHukum"]').val(data.judul);
        }

        if (this.id == "btnRemoveDasarHukum") {
            deleteDasarHukum(data.id);
        }
    });

    // Update data
    $("#btnUpdateDasarHukum").click(function () {
        const element = $(this)
            .parents(".modal-content")
            .find(".modal-body");
        console.log(element);
        let data = {
            id: element.find('input[name="idDasarHukum"]').val(),
            judul: element.find('input[name="namaDasarHukum"]').val()
        };

        console.log(data);

        updateDasarHukum(data);
    });

});
