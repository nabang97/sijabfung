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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/dasar-hukum.js":
/*!*************************************!*\
  !*** ./resources/js/dasar-hukum.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var container = $('#pagination-dasar-hukum');

var template = function template(e) {
  e.forEach(function (element) {
    "<div class=\"item-news\">\n        <div class=\"layer-items\"></div>\n        <a href=\"/dasar-hukum/view/".concat(element.id, "\">").concat(element.judul, "</a>\n    </div>");
  });
};

var paginationDasarHukum = function paginationDasarHukum(urlApi, input) {
  container.pagination({
    dataSource: function dataSource(done) {
      $.ajax({
        type: 'GET',
        url: urlApi,
        data: {
          data: input
        },
        success: function success(response) {
          done(response);
        }
      });
    },
    pageSize: 6,
    position: 'top',
    showPrevious: true,
    showNext: true,
    callback: function callback(data, pagination) {
      // template method of yourself
      console.log(data);
      $('#newest-dasar-hukum').empty();
      data.forEach(function (element) {
        $('#newest-dasar-hukum').append("<div class=\"item-news\">\n                    <div class=\"layer-items\"></div>\n                    <a href=\"/dasar-hukum/view/".concat(element.id, "\">").concat(element.judul, "</a>\n                </div>"));
      });
    }
  });
};

$(document).ready(function () {
  container.addHook('beforeInit', function () {
    window.console && console.log('beforeInit...');
  });
  paginationDasarHukum('/api/dasar-hukum/all');
  container.addHook('beforePageOnClick', function () {
    window.console && console.log('beforePageOnClick...'); //return false
  });
  $('#searchDasarHukum').click(function () {
    var input = $('#searchInputDasarHukum').val();
    console.log(input);
    paginationDasarHukum('/api/dasar-hukum/all/search', input);
  });
});

/***/ }),

/***/ 2:
/*!*******************************************!*\
  !*** multi ./resources/js/dasar-hukum.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Projects\Git\sibafung-new\resources\js\dasar-hukum.js */"./resources/js/dasar-hukum.js");


/***/ })

/******/ });