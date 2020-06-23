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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/user/profile-account-setting.js":
/*!******************************************************!*\
  !*** ./resources/js/user/profile-account-setting.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content'); // add the rule here

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
  var reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  if (reg.test(value)) {
    return true;
  }

  return false;
}, "Password must be eight characters or longer, contain at least 1 lowercase alphabetical character, 1 uppercase\n    alphabetical character, 1 numeric character, least one special character ");

var changeEmail = function changeEmail(data) {
  if ($('#form-email').find('.alert')) {
    $('#form-email').find('.alert').remove();
  }

  $.post("/profile/setting/email", {
    _token: CSRF_TOKEN,
    data: data
  }).done(function (e) {
    if (e.error === false) {
      $('#btnUpdateEmail').before("<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\n    ".concat(e.message, "\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n        <span aria-hidden=\"true\">&times;</span>\n    </button>\n</div>"));
    } else {
      $('#btnUpdateEmail').before("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n    ".concat(e.message, "\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n        <span aria-hidden=\"true\">&times;</span>\n    </button>\n</div>"));
    }
  }).fail(function (e) {
    console.log(e);
  });
};

var changePassword = function changePassword(data) {
  if ($('#form-password').find('.alert')) {
    $('#form-password').find('.alert').remove();
  }

  $.post("/profile/setting/password", {
    _token: CSRF_TOKEN,
    data: data
  }).done(function (e) {
    if (e.error === false) {
      $('#form-password')[0].reset();
      $('#btnUpdatePassword').before("<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\n    ".concat(e.message, "\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n        <span aria-hidden=\"true\">&times;</span>\n    </button>\n</div>"));
    } else {
      $('#btnUpdatePassword').before("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n    ".concat(e.message, "\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n        <span aria-hidden=\"true\">&times;</span>\n    </button>\n</div>"));
    }
  }).fail(function (e) {
    $('#btnUpdatePassword').before("<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n    Terjadi kesalahan saat mengubah password. Silakan hubungi kontak yang tersedia.\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n        <span aria-hidden=\"true\">&times;</span>\n    </button>\n</div>");
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
  submitHandler: function submitHandler(form) {
    var data = {
      email: $(form).find('input[name="email"]').val()
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
      passwordCheck: true
    },
    confirm_password: {
      required: true,
      valueNotEquals: true
    }
  },
  messages: {
    old_password: {
      required: "Sandi is required",
      passwordCheck: "Password must be eight characters or longer, contain at least 1 lowercase alphabetical character, 1\n            uppercase alphabetical character,\n            1 numeric character,\n            least one special character "
    },
    new_password: {
      required: "Sandi is required",
      passwordCheck: "Password must be eight characters or longer, contain at least 1 lowercase alphabetical character, 1\n            uppercase alphabetical character, 1 numeric character, least one special character "
    },
    confirm_password: {
      required: "Konfirm Sandi is required",
      valueNotEquals: "Sandi dan Konfirmasi Sandi tidak cocok"
    }
  },
  submitHandler: function submitHandler(form) {
    var data = {
      oldPassword: $(form).find('input[name="old_password"]').val(),
      newPassword: $(form).find('input[name="new_password"]').val()
    };
    changePassword(data);
  }
});

/***/ }),

/***/ 20:
/*!************************************************************!*\
  !*** multi ./resources/js/user/profile-account-setting.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Projects\Git\sibafung-new\resources\js\user\profile-account-setting.js */"./resources/js/user/profile-account-setting.js");


/***/ })

/******/ });