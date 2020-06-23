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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/demo/datatables-dasar-hukum.js":
/*!*****************************************************!*\
  !*** ./resources/js/demo/datatables-dasar-hukum.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var CSRF_TOKEN = $('meta[name="csrf-token"]').attr("content");
var getDasarHukum = $("#tableDasarHukum").DataTable({
  processing: true,
  ajax: {
    url: "/api/dasar-hukum",
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
    data: "judul"
  }, {
    data: {
      id: "id",
      status: "status"
    },
    render: function render(data, type, row, meta) {
      var classNames;

      if (data.status == 1) {
        classNames = "btn btn-sm btn-success";
        textPost = "Unpost";
      } else {
        classNames = "btn btn-sm btn-primary";
        textPost = "Post";
      }

      return "<a href=\"/dasar-hukum/view/".concat(data.id, "\" target=\"_blank\" class=\"btn btn-sm btn-primary\">Download PDF file </a>                \n                <button type=\"button\"  id=\"btnEditDasarHukum\" data-toggle=\"modal\" data-target=\"#modalEditDasarHukum\" class=\"btn btn-sm btn-primary\">Edit</button>\n                <button type=\"button\"  id=\"btnPostDasarHukum\" class=\"").concat(classNames, "\">").concat(textPost, "</button>\n                <button type=\"button\"  id=\"btnRemoveDasarHukum\" class=\"btn btn-sm btn-danger\">Remove</button>\n                ");
    }
  }]
});

var deleteDasarHukum = function deleteDasarHukum(data) {
  $.post("/api/dasar-hukum/destroy", {
    id: data,
    _token: CSRF_TOKEN
  }).done(function (e) {
    getDasarHukum.ajax.reload();
    console.log(e);
  }).fail(function (e) {}).always(function (e) {
    console.log(e);
  });
};

var postDasarHukum = function postDasarHukum(data) {
  $.post("/api/dasar-hukum/post", {
    id: data.id,
    status: !data.status,
    _token: CSRF_TOKEN
  }).done(function (e) {
    getDasarHukum.ajax.reload();
    console.log(e);
  }).fail(function (e) {
    console.log(e);
  });
};

var updateDasarHukum = function updateDasarHukum(data) {
  return $.post("/api/dasar-hukum/update", {
    data: data,
    _token: CSRF_TOKEN
  }).done(function (e) {
    getDasarHukum.ajax.reload();
  }).fail(function (e) {}).always(function (e) {});
};

$(document).ready(function () {
  $("#tableDasarHukum tbody ").on("click", "button", function () {
    var data = getDasarHukum.row($(this).parents("tr")).data(); // delete data

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
  }); // Update data

  $("#btnUpdateDasarHukum").click(function () {
    var element = $(this).parents(".modal-content").find(".modal-body");
    console.log(element);
    var data = {
      id: element.find('input[name="idDasarHukum"]').val(),
      judul: element.find('input[name="namaDasarHukum"]').val()
    };
    console.log(data);
    updateDasarHukum(data);
  });
});

/***/ }),

/***/ 8:
/*!***********************************************************!*\
  !*** multi ./resources/js/demo/datatables-dasar-hukum.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Projects\Git\sibafung-new\resources\js\demo\datatables-dasar-hukum.js */"./resources/js/demo/datatables-dasar-hukum.js");


/***/ })

/******/ });