var CSRF_TOKEN = $('meta[name="csrf-token"]').attr("content");

const getSlider = $("#tableSlider").DataTable({
    processing: true,
    ajax: {
        url: "/admin/slider/index",
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
            data: "file_path",
            render: (data, type, row, meta) => {
                return `<img src="/storage/sliders/${data}" width="300px" />`
            }
        },
        {
            'defaultContent': `<button class="btn btn-danger" id="deleteSlider">Delete</button>`
        }
    ]
});

const deleteSlider = data => {
    $.post("/admin/slider/destroy", {
            id: data,
            _token: CSRF_TOKEN
        })
        .done(function (e) {
            getSlider.ajax.reload();

        })
        .fail(function (e) {


        })
};

$("#tableSlider tbody ").on("click", "button", function () {
    var data = getSlider.row($(this).parents("tr")).data();

    if (this.id == "deleteSlider") {
        deleteSlider(data.id);
    }
});
