$(document).ready(function () {
    $('.datepicker').datepicker({
        dateFormat: "mm-dd-yy",
        todayBtn: "linked",
        clearBtn: true,
        // autoclose: true
    });


    const getGolongan = function () {
        $.get("/api/golongan", function (data, status) {
            data.forEach(element => {
                $('select[name="golongan-pegawai"]').append(`<option value=${element.id}>${element.name}</option>`)
            });
        });
    }

    getGolongan();

});
