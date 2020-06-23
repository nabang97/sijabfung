/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/user/profile-edit-detail.js":
/*!**************************************************!*\
  !*** ./resources/js/user/profile-edit-detail.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var CSRF_TOKEN = $('meta[name="csrf-token"]').attr("content");

var messageSuccess = function messageSuccess(element, message) {
  console.log(message);
  $(element).before("<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\n        ".concat(message, "\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>"));
};

if (typeof Storage !== "undefined") {
  if (sessionStorage.getItem("edit") === "true") {
    messageSuccess("#updateProfile", sessionStorage.getItem("messages"));
    sessionStorage.setItem("edit", false);
  }

  if (sessionStorage.getItem("photo-success") === "true") {
    messageSuccess("#form-photo", sessionStorage.getItem("messages"));
    sessionStorage.setItem("photo-success", false);
  }
} else {
  alert("Sorry, your browser does not support Web Storage...");
}

var selectOptionRumpunJabatan = function selectOptionRumpunJabatan(value) {
  return $.get("/api/rumpun-jabatan-option", {
    id: value
  }, function (result, status) {
    var selectRumpunJabatan = $('select[name="rumpun_jabatan"]');
    selectRumpunJabatan.empty();
    selectRumpunJabatan.append("<option value=\"0\">Pilih Rumpun Jabatan</option>");
    result.forEach(function (element) {
      selectRumpunJabatan.append("<option value=".concat(element.id, ">").concat(element.nama, "</option>"));
    });
  }).done(function (e) {
    console.log(e);
  }).fail(function (e) {}).always(function (e) {});
};

var selectOptionJabatanFungsional = function selectOptionJabatanFungsional(value) {
  console.log(value);
  return $.get("/api/jabatan-fungsional-option", {
    id: value
  }, function (result, status) {
    var selectJabfung = $('select[name="jabatan_fungsional"]');
    selectJabfung.empty();
    selectJabfung.append("<option value=\"0\">Pilih Jabatan Fungsional</option>");
    result.forEach(function (element) {
      console.log(element.id);
      selectJabfung.append("<option value=".concat(element.id, ">").concat(element.nama, "</option>"));
    });
  }).fail(function (e) {});
};

var selectOptionJenjangKategoriLingkup = function selectOptionJenjangKategoriLingkup(data) {
  return $.get("/api/jenjang-jabatan/option", data, function (data, status) {
    var selectKategori = $('select[name="jenjang_kategori_lingkup"]');
    selectKategori.empty();
    selectKategori.append("<option value=\"0\">Pilih Jenjang-Kategori-Lingkup</option>");
    data.forEach(function (element) {
      console.log(element);
      selectKategori.append("<option value=".concat(element.id, ">").concat(element.jenjang, " - ").concat(element.kategori, " - ").concat(element.lingkup == 1 ? "Pusat" : "Daerah", "</option>"));
    });
  }).done(function (e) {
    console.log(e);
  }).fail(function (e) {
    console.log(e);
  }).always(function (e) {
    console.log(e);
  });
};

var updateProfile = function updateProfile(data) {
  if ($(".alert-sijabfung")) {
    $(".alert-sijabfung").remove();
  }

  $.post("/profile/update", {
    _token: CSRF_TOKEN,
    data: data
  }).done(function (e) {
    if (e.error) {
      $("#updateProfile").before("<div class=\"alert-sijabfung alert-sijabfung-danger\">".concat(e.message, "</div>"));
    } else {
      if (typeof Storage !== "undefined") {
        sessionStorage.setItem("edit", true);
        sessionStorage.setItem("messages", "Profile berhasil diperbarui");
        window.location.reload();
      } else {
        alert("Sorry, your browser does not support Web Storage...");
      }
    }
  }).fail(function (e) {});
}; // add the rule here


$.validator.addMethod("valueEquals", function (value, element, arg) {
  return arg != value;
}, "Value must equal arg.");
$.validator.addMethod("valueNotEquals", function (value, element, arg) {
  if (value == $('input[name="password"]').val()) {
    return true;
  }

  return false;
}, "Password and confirm password fields do not match");
$.validator.addMethod("passwordCheck", function (value, element, arg) {
  var reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

  if (reg.test(value)) {
    return true;
  }

  return false;
}, "Password must be eight characters or longer, contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character,1 numeric character, least one special character");
$("#form-profile").validate({
  rules: {
    nama: {
      required: true
    },
    nip: {
      required: true,
      maxlength: 9,
      number: true,
      minlength: 9
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
      maxlength: "Panjang data harus 9 karakter",
      minlength: "Panjang data harus 9 karakter",
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
  submitHandler: function submitHandler(form) {
    var data = {
      nip: $('input[name="nip"]').val(),
      name: $('input[name="nama"]').val(),
      birthday_place: $('input[name="tempat_lahir"]').val(),
      birthday_date: $('input[name="tanggal_lahir"]').val() != null ? Date.parse($('input[name="tanggal_lahir"]').val()).toString("yyyy-MM-dd") : null,
      golongan: $('select[name="golongan"]').val(),
      id_jenjang_jabfung: $('select[name="jenjang_kategori_lingkup"]').val(),
      unit_kerja: $('input[name="unit_kerja_saat_ini"]').val()
    };
    updateProfile(data);
  }
});
$(".datepicker").datepicker({
  dateFormat: "mm-dd-yy",
  todayBtn: "linked",
  clearBtn: true,
  changeYear: true,
  changeMonth: true,
  yearRange: "c-60:c"
}); // show option rumpun jabatan

$('select[name="instansi_pembina"]').change(function () {
  console.log($(this).val());
  selectOptionRumpunJabatan($(this).val());
  $('select[name="jabatan_fungsional"]').empty();
  $('select[name="jabatan_fungsional"]').append("<option>Pilih Jabatan Fungsional</option>");
  $('select[name="jenjang_kategori_lingkup"]').empty();
  $('select[name="jenjang_kategori_lingkup"]').append("<option>Pilih Jenjang - Kategori - Lingkup</option>");
}); // show option jabatan fungsional

$('select[name="rumpun_jabatan"]').change(function () {
  $('select[name="jenjang_kategori_lingkup"]').empty();
  $('select[name="jenjang_kategori_lingkup"]').append("<option>Pilih Jenjang - Kategori - Lingkup</option>");
  selectOptionJabatanFungsional($(this).val());
});
$('select[name="jabatan_fungsional"]').change(function () {
  var data = {
    id_jabfung: $(this).val()
  };
  selectOptionJenjangKategoriLingkup(data);
});
$('input[name="photo-profile"]').change(function (e) {
  console.log($("#form-photo")[0]);
  var formData = new FormData();
  var files = $('input[name = "photo-profile"]')[0].files[0];
  formData.append("file", files);
  formData.append("_token", CSRF_TOKEN);
  $.ajax({
    url: "/profile/photo",
    //server script to process data
    type: "POST",
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function success(result) {
      console.log(result);

      if (result.error === false) {
        if (typeof Storage !== "undefined") {
          sessionStorage.setItem("photo-success", true);
          sessionStorage.setItem("messages", "Foto profile berhasil diperbarui");
          window.location.reload();
        } else {
          alert("Sorry, your browser does not support Web Storage...");
        }
      }
    },
    error: function error(responseError) {
      $("#form-photo").before("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n    Terjadi kesalahan saat mengubah password. Silakan hubungi kontak yang tersedia.\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n        <span aria-hidden=\"true\">&times;</span>\n    </button>\n</div>");
    }
  });
});

/***/ }),

/***/ 19:
/*!********************************************************!*\
  !*** multi ./resources/js/user/profile-edit-detail.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Projects\Git\sibafung-new\resources\js\user\profile-edit-detail.js */"./resources/js/user/profile-edit-detail.js");


/***/ })

/******/ });