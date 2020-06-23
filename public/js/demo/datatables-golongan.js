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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/demo/datatables-golongan.js":
/*!**************************************************!*\
  !*** ./resources/js/demo/datatables-golongan.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var CSRF_TOKEN = $('meta[name="csrf-token"]').attr("content");
var tableGolongan = $("#tableGolongan").DataTable({
  processing: true,
  ajax: {
    url: "/api/golongan",
    dataType: "json",
    cache: true,
    dataSrc: ""
  },
  order: [[1, "asc"]],
  columns: [{
    data: "id",
    render: function render(data, type, row, meta) {
      return meta.row + meta.settings._iDisplayStart + 1;
    }
  }, {
    data: "name"
  }, {
    defaultContent: '<button type="button" id="btnEditGolongan" data-toggle="modal" data-target="#modalEditGolongan" class="btn btn-sm btn-primary" >Edit</button> <button type="button"  id="btnRemoveGolongan" class="btn btn-sm btn-primary">Remove</button>'
  }]
});
$(document).ready(function () {
  tableGolongan.on("order.dt search.dt", function () {
    tableGolongan.column(0, {
      search: "applied",
      order: "applied"
    }).nodes().each(function (cell, i) {
      cell.innerHTML = i + 1;
    });
  }).draw();
});
$("#tableGolongan tbody ").on("click", "button", function () {
  var data = tableGolongan.row($(this).parents("tr")).data();

  if (this.id == "btnEditGolongan") {
    $("#modalEditGolongan").on("show.bs.modal", function (e) {
      $(this).find('input[name="idGolongan"]').val(data.id);
      $(this).find('input[name="namaGolongan"]').val(data.name);
    });
  }

  if (this.id == "btnRemoveGolongan") {
    deleteGolongan(data.id);
  }
});
$("#btnUpdateGolongan").click(function () {
  var nama = $('input[name="namaGolongan"]').val();
  var id = $(this).parent().parent().find(".modal-body").find('input[name="idGolongan"]').val();
  updateGolongan(id, nama);
});

var deleteGolongan = function deleteGolongan(data) {
  $.post("/api/golongan/destroy", {
    id: data,
    _token: CSRF_TOKEN
  }).done(function (e) {
    tableGolongan.ajax.reload();
  }).fail(function (e) {}).always(function (e) {});
};

var updateGolongan = function updateGolongan(id, name) {
  $.post("/api/golongan/update", {
    id: id,
    name: name,
    _token: CSRF_TOKEN
  }).done(function (e) {
    tableGolongan.ajax.reload();
  }).fail(function (e) {}).always(function (e) {});
};

$("#btnAddGolongan").click(function (event) {
  event.preventDefault();
  var nama = $("#namaGolongan").val();
  console.log(nama);
  $.post("/api/golongan/store", {
    _token: CSRF_TOKEN,
    name: nama
  }).done(function (e) {
    tableGolongan.ajax.reload();
  }).fail(function (e) {}).always(function (e) {});
});

/***/ }),

/***/ 10:
/*!********************************************************!*\
  !*** multi ./resources/js/demo/datatables-golongan.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Projects\Git\sibafung-new\resources\js\demo\datatables-golongan.js */"./resources/js/demo/datatables-golongan.js");


/***/ })

/******/ });