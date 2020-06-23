var CSRF_TOKEN = $('meta[name="csrf-token"]').attr("content");
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
        if (value == $('input[name="new_password"]').val()) {
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
    `Password must be eight characters or longer, contain at least 1 lowercase alphabetical character, 1 uppercase
    alphabetical character, 1 numeric character, least one special character `
);
const changeEmail = data => {
    if ($("#form-email").find(".alert")) {
        $("#form-email")
            .find(".alert")
            .remove();
    }
    $.post("/profile/setting/email", {
        _token: CSRF_TOKEN,
        data
    })
        .done(function(e) {
            if (e.error === false) {
                $("#btnUpdateEmail")
                    .before(`<div class="alert alert-success alert-dismissible fade show" role="alert">
    ${e.message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>`);
            } else {
                $("#btnUpdateEmail")
                    .before(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
    ${e.message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>`);
            }
        })
        .fail(function(e) {
            console.log(e);
        });
};
const changePassword = data => {
    if ($("#form-password").find(".alert")) {
        $("#form-password")
            .find(".alert")
            .remove();
    }
    $.post("/profile/setting/password", {
        _token: CSRF_TOKEN,
        data
    })
        .done(function(e) {
            if (e.error === false) {
                $("#form-password")[0].reset();
                $("#btnUpdatePassword")
                    .before(`<div class="alert alert-success alert-dismissible fade show" role="alert">
    ${e.message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>`);
            } else {
                $("#btnUpdatePassword")
                    .before(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
    ${e.message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>`);
            }
        })
        .fail(function(e) {
            $(
                "#btnUpdatePassword"
            ).before(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
    Terjadi kesalahan saat mengubah password. Silakan hubungi kontak yang tersedia.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>`);
        });
};
$("#form-email").validate({
    rules: {
        email: {
            required: true,
            email: true
        }
    },
    messages: {
        email: {
            required: "Email is required"
        }
    },
    submitHandler: function(form) {
        const data = {
            email: $(form)
                .find('input[name="email"]')
                .val()
        };
        changeEmail(data);
    }
});
$("#form-password").validate({
    rules: {
        old_password: {
            required: true,
            passwordCheck: true
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
        old_password: {
            required: "Sandi is required",
            passwordCheck: `Password must be eight characters or longer, contain at least 1 lowercase alphabetical character, 1
            uppercase alphabetical character,
            1 numeric character,
            least one special character `
        },
        new_password: {
            required: "Sandi is required",
            passwordCheck: `Password must be eight characters or longer, contain at least 1 lowercase alphabetical character, 1
            uppercase alphabetical character, 1 numeric character, least one special character `
        },
        confirm_password: {
            required: "Konfirm Sandi is required",
            valueNotEquals: "Sandi dan Konfirmasi Sandi tidak cocok"
        }
    },
    submitHandler: function(form) {
        const data = {
            oldPassword: $(form)
                .find('input[name="old_password"]')
                .val(),
            newPassword: $(form)
                .find('input[name="new_password"]')
                .val()
        };
        changePassword(data);
    }
});
