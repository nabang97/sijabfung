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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/jabatan-fungsional.js":
/*!********************************************!*\
  !*** ./resources/js/jabatan-fungsional.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var tableJabatanFungsional = $("#tableJabatanFungsional").DataTable({
  processing: true,
  ajax: {
    url: "/api/pegawai",
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
    data: {
      birthday_date: "birthday_date",
      birthday_place: "birthday_place"
    },
    render: function render(data, type, row, meta) {
      return "".concat(data.birthday_place, ", ").concat(data.birthday_date);
    }
  }, {
    data: "golongans.name"
  }, {
    data: "jenjang_jabatan.detail_jabfung.jabfung.nama"
  }, {
    defaultContent: "<center><button type=\"button\" class=\"btn btn-primary btn-sm\" id=\"viewDiklat\" data-toggle=\"modal\" data-target=\"#modalViewDiklat\">View</button></center>"
  }]
});

var selectOptionJabatanFungsional = function selectOptionJabatanFungsional() {
  return $.get("/api/jabatan-fungsional", function (result, status) {
    var selectJabfung = $('select[name="jabatan-fungsional"]');
    selectJabfung.empty();
    selectJabfung.append("<option>Pilih Jabatan Fungsional</option>");
    result.forEach(function (element) {
      console.log(element.id);
      selectJabfung.append("<option value=".concat(element.id, ">").concat(element.nama, "</option>"));
    });
  }).done(function (e) {}).fail(function (e) {});
};

var selectOptionJenjangKategoriLingkup = function selectOptionJenjangKategoriLingkup(data) {
  $.get("/api/jenjang-jabatan/option", data, function (data, status) {
    var selectKategori = $('select[name="jenjang-kategori-lingkup"]');
    selectKategori.empty();
    selectKategori.append("<option>Pilih Jenjang-Kategori-Lingkup</option>");
    data.forEach(function (element) {
      console.log(element);
      selectKategori.append("<option value=".concat(element.id, ">").concat(element.jenjang, " - ").concat(element.kategori, " - ").concat(element.linkup == 1 ? "Pusat" : "Daerah", "</option>"));
    });
  }).done(function (e) {
    console.log(e);
  }).fail(function (e) {
    console.log(e);
  });
};

var getDiklat = function getDiklat(data) {
  var tableDiklat = $("#tableDiklat").DataTable();
  tableDiklat.clear().draw();
  $.get("/pegawai/diklat", data, function (data, status) {}).done(function (e) {
    if (e.length != 0) {
      var no = 0;
      e.forEach(function (element) {
        no = no + 1;
        tableDiklat.row.add([no, element.name, element.tahun_mengikuti]).draw();
      });
    }

    $("#modalViewDiklatLabel").html(data.name);
  }).fail(function (e) {
    console.log(e);
  });
};

$(document).ready(function () {
  selectOptionJabatanFungsional();
  tableJabatanFungsional;
  $('select[name="jabatan-fungsional"]').change(function (e) {
    var id = $('select[name="jabatan-fungsional"]').val();
    var data = {
      id_jabfung: id
    };
    selectOptionJenjangKategoriLingkup(data);
  });
  $("#tableJabatanFungsional tbody ").on("click", "button", function () {
    var data = tableJabatanFungsional.row($(this).parents("tr")).data();

    if (this.id == "viewDiklat") {
      getDiklat(data);
    }
  });
});

/***/ }),

/***/ 4:
/*!**************************************************!*\
  !*** multi ./resources/js/jabatan-fungsional.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Projects\Git\sibafung-new\resources\js\jabatan-fungsional.js */"./resources/js/jabatan-fungsional.js");


/***/ })

/******/ });