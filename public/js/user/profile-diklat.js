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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/user/profile-diklat.js":
/*!*********************************************!*\
  !*** ./resources/js/user/profile-diklat.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var CSRF_TOKEN = $('meta[name="csrf-token"]').attr("content");
var tableDiklat = $("#tableDiklat").DataTable({
  processing: true,
  ajax: {
    url: "/api/profile/diklat",
    dataType: "json",
    cache: false,
    dataSrc: ""
  },
  order: [[1]],
  columns: [{
    render: function render(data, type, row, meta) {
      return meta.row + meta.settings._iDisplayStart + 1;
    }
  }, {
    data: "name"
  }, {
    data: "tahun_mengikuti"
  }, {
    defaultContent: "<button type=\"button\" class=\"btn btn-primary btn-sm br-25\" id=\"btnEditDiklat\" data-toggle=\"modal\" data-target=\"#modalEditDiklat\">\n                Edit</button> <button type=\"button\" class=\"btn btn-danger btn-sm br-25\" id=\"btnRemoveDiklat\">Remove</button >"
  }]
});

var showDataToEdit = function showDataToEdit(data) {
  var element = $(".modal-body");
  element.find('input[name="id_diklat"').val(data.id);
  element.find('input[name="nama_diklat"').val(data.name);
  element.find('input[name="tahun_diklat"').val(data.tahun_mengikuti);
};

var deleteDiklat = function deleteDiklat(data) {
  $.post("/api/profile/diklat/remove", {
    data: data,
    _token: CSRF_TOKEN
  }).done(function (e) {
    tableDiklat.ajax.reload();
  }).fail(function (e) {}).always(function (e) {});
}; // show data in modal to edit


$("#tableDiklat tbody ").on("click", "button", function () {
  var data = tableDiklat.row($(this).parents("tr")).data();

  if (this.id == "btnEditDiklat") {
    showDataToEdit(data);
  } // delete data


  if (this.id == "btnRemoveDiklat") {
    deleteDiklat(data);
  }
});

var updateDiklat = function updateDiklat(data) {
  $.post("/api/profile/diklat/update", {
    data: data,
    _token: CSRF_TOKEN
  }).done(function (e) {
    tableDiklat.ajax.reload(); // document.getElementById("form-edit-diklat").reset();

    $('input[name="id_diklat"]').before("<div class=\"alert alert-success\" role=\"alert\">\n  Data berhasil perbarui! \n</div>");
  }).fail(function (e) {}).always(function (e) {});
};

var addDiklat = function addDiklat(data) {
  if ($(".alert")) {
    $(".alert").remove();
  }

  $.post("/api/profile/diklat/store", {
    data: data,
    _token: CSRF_TOKEN
  }).done(function (e) {
    tableDiklat.ajax.reload();
    document.getElementById("form-add-diklat").reset();
    $('#modalAddDiklat').find('.modal-body').prepend("\n            <div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\n            Data berhasil ditambahkan! \n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>");
  }).fail(function (e) {
    $('#modalAddDiklat').find('.modal-body').prepend("\n            <div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n            Terjadi kesalahan \n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>");
  });
};

$("#modalAddDiklat").on("show.bs.modal", function (e) {
  if ($(".alert")) {
    $(".alert").remove();
  }

  $("#form-add-diklat")[0].reset();
  $("#form-add-diklat").validate().resetForm();
  $(this).find(".error").removeClass("error");
});
$("#modalEditDiklat").on("show.bs.modal", function (e) {
  if ($(".alert")) {
    $(".alert").remove();
  }

  $("#form-edit-diklat").validate().resetForm();
  $(this).find(".error").removeClass("error");
});
$.validator.addMethod("yearCheck", function (value, element, arg) {
  var d = new Date();
  var n = d.getFullYear();

  if (value <= n) {
    return true;
  }

  return false;
}, "Tahun mengikuti diklat tidak boleh melewati tahun ini");
$("#form-add-diklat").validate({
  rules: {
    nama_diklat: {
      required: true
    },
    tahun_diklat: {
      required: true,
      minlength: 4,
      maxlength: 4,
      number: true,
      yearCheck: true
    }
  },
  messages: {
    nama_diklat: {
      required: "Nama harus diisi"
    },
    tahun_diklat: {
      required: "Tahun harus diisi",
      minlength: "Panjang tahun minimal 4 karakter",
      maxlength: "Panjang tahun maksimal 4 karakter",
      number: "Tahun harus berupa angka"
    }
  },
  submitHandler: function submitHandler(form) {
    var data = {
      name: $('input[name="nama_diklat"]').val(),
      tahun_mengikuti: $('input[name="tahun_diklat"]').val()
    };
    addDiklat(data);
  }
});
$("#form-edit-diklat").validate({
  rules: {
    nama_diklat: {
      required: true
    },
    tahun_diklat: {
      required: true,
      minlength: 4,
      maxlength: 4,
      number: true,
      yearCheck: true
    }
  },
  messages: {
    nama_diklat: {
      required: "Nama harus diisi"
    },
    tahun_diklat: {
      required: "Tahun harus diisi",
      minlength: "Panjang tahun minimal 4 karakter",
      maxlength: "Panjang tahun maksimal 4 karakter",
      number: "Tahun harus berupa angka"
    }
  },
  submitHandler: function submitHandler(form) {
    var data = {
      name: $(form).find('input[name="nama_diklat"]').val(),
      id: $(form).find('input[name="id_diklat"]').val(),
      tahun_mengikuti: $(form).find('input[name="tahun_diklat"]').val()
    };
    updateDiklat(data);
  }
});

/***/ }),

/***/ 21:
/*!***************************************************!*\
  !*** multi ./resources/js/user/profile-diklat.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Projects\Git\sibafung-new\resources\js\user\profile-diklat.js */"./resources/js/user/profile-diklat.js");


/***/ })

/******/ });