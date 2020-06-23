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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/demo/datatables-pegawai.js":
/*!*************************************************!*\
  !*** ./resources/js/demo/datatables-pegawai.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var CSRF_TOKEN = $('meta[name="csrf-token"]').attr("content");
var nipBeforeUpdate;
var tablePegawai = $("#tablePegawai").DataTable({
  processing: true,
  ajax: {
    url: "/api/pegawai",
    dataType: "json",
    cache: false,
    dataSrc: ""
  },
  order: [[1, "asc"]],
  columns: [{
    render: function render(data, type, row, meta) {
      return meta.row + meta.settings._iDisplayStart + 1;
    }
  }, {
    data: "nip"
  }, {
    data: "name"
  }, {
    data: "birthday_place"
  }, {
    data: "birthday_date",
    render: function render(data, type, row, meta) {
      return Date.parse(data).toString("dd MMMM yyyy");
    }
  }, {
    data: "golongans.name"
  }, {
    data: "jenjang_jabatan.detail_jabfung.jabfung.nama"
  }, {
    data: "jenjang_jabatan.nama"
  }, {
    defaultContent: '<button type="button" id="btnEditPegawai" data-toggle="modal" data-target="#modalEditPegawai" class="btn btn-sm btn-primary" >Edit</button> <button type="button"  id="btnRemovePegawai" class="btn btn-sm btn-primary">Remove</button>'
  }]
});

var deletePegawai = function deletePegawai(data) {
  $.post("/api/pegawai/destroy", {
    nip: data
  }).done(function (e) {
    tablePegawai.ajax.reload();
    console.log(e);
  }).fail(function (e) {
    console.log(e);
  }).always(function (e) {
    console.log(e);
  });
};

var getGolongan = function getGolongan() {
  $.get("/api/golongan", function (data, status) {
    data.forEach(function (element) {
      $('select[name="golongan"]').append("<option value=".concat(element.id, ">").concat(element.name, "</option>"));
    });
  });
};

getGolongan();

var updatePegawai = function updatePegawai(data) {
  $.post("/api/pegawai/update", {
    data: data,
    _token: CSRF_TOKEN
  }).done(function (e) {
    tablePegawai.ajax.reload();

    if (!e.error) {
      nipBeforeUpdate = data.nip;
    }

    console.log(e);
  }).fail(function (e) {
    console.log(e);
  }).always(function (e) {
    console.log(e);
  });
};

var selectOptionIntansiPembina = function selectOptionIntansiPembina() {
  return $.get("/api/instansi-pembina", function (data, status) {
    var selectInstansiPembina = $('select[name="instansi_pembina"]');
    selectInstansiPembina.empty();
    selectInstansiPembina.append("<option>Pilih Instansi Pembina</option>");
    data.forEach(function (element) {
      selectInstansiPembina.append("<option value=".concat(element.id, ">").concat(element.name, "</option>"));
    });
  }).done(function (e) {}).fail(function (e) {}).always(function (e) {});
};

var selectOptionRumpunJabatan = function selectOptionRumpunJabatan(value) {
  return $.get("/api/rumpun-jabatan-option", {
    id: value
  }, function (result, status) {
    var selectRumpunJabatan = $('select[name="rumpun_jabatan"]');
    selectRumpunJabatan.empty();
    selectRumpunJabatan.append("<option>Pilih Rumpun Jabatan</option>");
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
    selectJabfung.append("<option>Pilih Jabatan Fungsional</option>");
    result.forEach(function (element) {
      console.log(element.id);
      selectJabfung.append("<option value=".concat(element.id, ">").concat(element.nama, "</option>"));
    });
  }).done(function (e) {
    console.log(e);
  }).fail(function (e) {}).always(function (e) {});
};

var selectOptionJenjangJabatan = function selectOptionJenjangJabatan(data) {
  console.log(data);
  return $.get("/api/jenjang-jabatan-option", {
    data: data
  }, function (result, status) {
    var selectJabfung = $('select[name="jenjang_jabatan"]');
    selectJabfung.empty();
    selectJabfung.append("<option>Pilih Jenjang Jabatan</option>");
    result.forEach(function (element) {
      console.log(element.id);
      selectJabfung.append("<option value=".concat(element.id, ">").concat(element.nama, "</option>"));
    });
  }).done(function (e) {
    console.log(e);
  }).fail(function (e) {}).always(function (e) {});
};

var selectOptionJenjangKategoriLingkup = function selectOptionJenjangKategoriLingkup(data) {
  console.log("Jenajng kateg", data);
  return $.get("/api/jenjang-jabatan/option", {
    id_jabfung: data,
    _token: CSRF_TOKEN
  }, function (data, status) {
    var selectKategori = $('select[name="jenjang_kategori_lingkup"]');
    selectKategori.empty();
    selectKategori.append("<option>Pilih Jenjang-Kategori-Lingkup</option>");
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

var selectOptionKategori = function selectOptionKategori(data) {
  return $.get("/api/kategori-option", data, function (data, status) {
    var selectKategori = $('select[name="kategori"]');
    selectKategori.empty();
    selectKategori.append("<option>Pilih Kategori</option>");
    data.forEach(function (element) {
      selectKategori.append("<option value=".concat(element.id, ">").concat(element.name, "</option>"));
    });
  }).done(function (e) {}).fail(function (e) {}).always(function (e) {});
};

var getAccount = function getAccount(data) {
  return $.post("/api/pegawai/account", {
    nip: data,
    _token: CSRF_TOKEN
  }).done(function (response) {
    $('input[name="email"]').val(response.email);
  }).fail(function (e) {}).always(function (e) {});
};

var showDataEdit = function showDataEdit(data) {
  var element = $(".modal-body");
  nipBeforeUpdate = data.nip;
  element.find('input[name="nip"]').val(data.nip);
  element.find('input[name="unit_kerja_saat_ini"]').val(data.unit_kerja);
  element.find('input[name="nama"]').val(data.name);
  element.find('input[name="tempat_lahir"]').val(data.birthday_place);
  element.find('input[name="tanggal_lahir"]').val(Date.parse(data.birthday_date).toString("dd-MM-yyyy"));
  element.find('select[name="golongan"]').val(data.golongan);
  selectOptionIntansiPembina().done(function () {
    element.find('select[name="instansi_pembina"]').val(data.jenjang_jabatan.detail_jabfung.jabfung.rumpun_jabatan.instansi_pembina.id);
  }).then(function () {
    return new Promise(function () {
      selectOptionRumpunJabatan(data.jenjang_jabatan.detail_jabfung.jabfung.rumpun_jabatan.id_instansi).done(function () {
        element.find('select[name="rumpun_jabatan"]').val(data.jenjang_jabatan.detail_jabfung.jabfung.rumpun_jabatan.id);
      }).then(function () {
        return new Promise(function () {
          selectOptionJabatanFungsional(data.jenjang_jabatan.detail_jabfung.jabfung.rumpun_jabatan.id).done(function () {
            element.find('select[name="jabatan_fungsional"]').val(data.jenjang_jabatan.detail_jabfung.jabfung.id);
          }).then(function () {
            return new Promise(function () {
              selectOptionJenjangKategoriLingkup(data.jenjang_jabatan.detail_jabfung.jabfung.id).done(function () {
                element.find('select[name="jenjang_kategori_lingkup"]').val(data.jenjang_jabatan.id);
              });
            });
          });
        });
      });
    });
  });
  getAccount(data.nip);
};

var insertPegawai = function insertPegawai(data) {
  $.post("/api/pegawai/store", {
    data: data,
    _token: CSRF_TOKEN
  }).done(function (e) {
    tablePegawai.ajax.reload();
  }).fail(function (e) {
    console.log(e);
  }).always(function (e) {
    console.log(e);
  });
};

var register = function register(data) {
  if ($(".alert-sijabfung")) {
    $(".alert-sijabfung").remove();
  }

  return $.post("/api/register/create", {
    data: data,
    _token: CSRF_TOKEN
  }).done(function (response) {
    if (response.error) {
      $(".data-alert").before("<div class=\"alert alert-danger\">".concat(response.message, "</div>"));
    } else {
      createAccount(data);
    }
  }).fail(function (e) {
    console.log(e);
  });
};

var createAccount = function createAccount(data) {
  if ($(".alert")) {
    $(".alert").remove();
  }

  return $.post("/api/register/create/account", {
    data: data,
    _token: CSRF_TOKEN
  }).done(function (response) {
    if (response.error) {
      $(".data-alert").before("<div class=\"alert alert-danger\">".concat(response.message, "</div>"));
    } else {
      $(".data-alert").before("<div class=\"alert alert-success\">".concat(response.message, "</div>"));
      tablePegawai.ajax.reload();
      document.getElementById("form-regis").reset();
    }
  }).fail(function (data) {});
};

var updateProfile = function updateProfile(data) {
  if ($(".alert")) {
    $(".alert").remove();
  }

  $.post("/profile/update", {
    _token: CSRF_TOKEN,
    data: data
  }).done(function (e) {
    if (e.error) {
      $("#updateProfile").before("<div class=\"alert alert-danger\">".concat(e.message, "</div>"));
    } else {
      console.log("something wrong");
      var url = window.location.href;

      if (url.indexOf("?") > -1) {
        url += "&status=success";
      } else {
        url += "?&status=success";
      }

      window.location.href = url;
      $(window).bind("load");
      $("#updateProfile").before("<div class=\"alert alert-success\">".concat(e.message, "</div>"));
    }
  }).fail(function (e) {
    console.log(e);
  });
};

var updateAccount = function updateAccount(data) {
  console.log(data);
  $.post("/api/pegawai/account/update", {
    _token: CSRF_TOKEN,
    data: data
  }).done(function (e) {
    console.log(e);
  }).fail(function (e) {
    console.log(e);
  });
};

$(document).ready(function () {
  tablePegawai;
  $("#addPegawai").click(function () {
    selectOptionIntansiPembina();
  }); // show option rumpun jabatan

  $('select[name="instansi_pembina"]').change(function () {
    console.log($(this).val());
    selectOptionRumpunJabatan($(this).val());
    $('select[name="jabatan_fungsional"]').empty();
    $('select[name="jabatan_fungsional"]').append("<option>Pilih Jabatan Fungsional</option>");
  }); // show option jabatan fungsional

  $('select[name="rumpun_jabatan"]').change(function () {
    console.log($(this).val());
    selectOptionJabatanFungsional($(this).val());
  });
  $('select[name="jabatan_fungsional"]').change(function () {
    var data = {
      id_jabfung: $(this).val()
    };
    selectOptionJenjangKategoriLingkup(data);
  });
  tablePegawai.on("order.dt search.dt", function () {
    tablePegawai.column(0, {
      search: "applied",
      order: "applied"
    }).nodes().each(function (cell, i) {
      cell.innerHTML = i + 1;
    });
  }).draw();
  $("#tablePegawai tbody ").on("click", "button", function () {
    var data = tablePegawai.row($(this).parents("tr")).data();

    if (this.id == "btnEditPegawai") {
      showDataEdit(data);
    }

    if (this.id == "btnRemovePegawai") {
      deletePegawai(data.nip);
    }
  }); // add the rule here

  $.validator.addMethod("valueEquals", function (value, element, arg) {
    return arg != value;
  }, "Value must equal arg.");
  $.validator.addMethod("valueNotEquals", function (value, element, arg) {
    if (value == $('input[name="new_password"]').val()) {
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
  var validationRules = {
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      passwordCheck: false
    },
    confirm_password: {
      required: true,
      valueNotEquals: true
    },
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
  };
  var validationMessages = {
    email: {
      required: "Email is required"
    },
    password: {
      required: "Sandi is required",
      passwordCheck: "Password must be eight characters or longer, contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character,1 numeric character, least one special character"
    },
    confirm_password: {
      required: "Konfirm Sandi is required",
      valueNotEquals: "Sandi dan Konfirmasi Sandi tidak cocok"
    },
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
  };

  var dataForm = function dataForm() {
    var email = $('input[name="email"]').val();
    var password = $('input[name="new_password"]').val();
    var confirmPassword = $('input[name="confirm_password"]').val();
    var nip = $('input[name="nip"]').val();
    var nama = $('input[name="nama"]').val();
    var tempatLahir = $('input[name="tempat_lahir"]').val();
    var tanggalLahir = $('input[name="tanggal_lahir"]').val() != null ? Date.parse($('input[name="tanggal_lahir"]').val()).toString("yyyy-MM-dd") : null;
    var jenjangJabatan = $('select[name="jenjang_kategori_lingkup"]').val();
    var unitKerja = $('input[name="unit_kerja_saat_ini"]').val();
    var golongan = $('select[name="golongan"]').val();
    var data = {
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
    return data;
  };

  $("#form-regis").validate({
    rules: validationRules,
    messages: validationMessages,
    submitHandler: function submitHandler(form) {
      register(dataForm());
    }
  });
  $("#form-update-account").validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      new_password: {
        required: true,
        passwordCheck: true
      },
      confirm_password: {
        required: true,
        valueNotEquals: true
      }
    },
    messages: {
      email: {
        required: "Email is required"
      },
      new_password: {
        required: "Sandi is required",
        passwordCheck: "Password must be eight characters or longer, contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character,1 numeric character, least one special character"
      },
      confirm_password: {
        required: "Konfirm Sandi is required",
        valueNotEquals: "Sandi dan Konfirmasi Sandi tidak cocok"
      }
    },
    submitHandler: function submitHandler(form) {
      var data = {
        email: $(form).find('input[name="email"]').val(),
        password: $(form).find('input[name="new_password"]').val(),
        nip: nipBeforeUpdate
      };
      updateAccount(data);
    }
  });
  $("#form-update-pegawai").validate({
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
        nipBeforeUpdate: nipBeforeUpdate,
        nip: $(form).find('input[name="nip"]').val(),
        name: $(form).find('input[name="nama"]').val(),
        birthday_date: Date.parse($(form).find('input[name="tanggal_lahir"]').val()).toString("yyyy-MM-dd"),
        birthday_place: $(form).find('input[name="tempat_lahir"]').val(),
        golongan: $(form).find('select[name="golongan"]').val(),
        id_jenjang_jabfung: $(form).find('select[name="jenjang_kategori_lingkup"]').val(),
        unit_kerja: $(form).find('input[name="unit_kerja_saat_ini"]').val()
      };
      console.log(data);
      updatePegawai(data);
    }
  });
  $(".datepicker").datepicker({
    dateFormat: "mm-dd-yy",
    todayBtn: "linked",
    clearBtn: true,
    changeYear: true,
    changeMonth: true,
    yearRange: "c-60:c" // autoclose: true

  });
});

/***/ }),

/***/ 17:
/*!*******************************************************!*\
  !*** multi ./resources/js/demo/datatables-pegawai.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Projects\Git\sibafung-new\resources\js\demo\datatables-pegawai.js */"./resources/js/demo/datatables-pegawai.js");


/***/ })

/******/ });