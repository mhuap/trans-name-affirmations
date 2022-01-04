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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/firebase-messaging-sw.js":
/*!*****************************************!*\
  !*** ./public/firebase-messaging-sw.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Scripts for firebase and firebase messaging\n// eslint-disable-next-line no-undef\nimportScripts(\"https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js\"); // eslint-disable-next-line no-undef\n\nimportScripts(\"https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js\"); // Initialize the Firebase app in the service worker by passing the generated config\n// const firebaseConfig = {\n//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,\n//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,\n//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,\n//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,\n//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,\n//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,\n//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,\n// };\n\nvar firebaseConfig = {\n  apiKey: \"AIzaSyDuglzUVxGekBmYF_EF2tajpMIPylOKUBw\",\n  authDomain: \"trans-name-affirmations.firebaseapp.com\",\n  projectId: \"trans-name-affirmations\",\n  storageBucket: \"trans-name-affirmations.appspot.com\",\n  messagingSenderId: \"151056753007\",\n  appId: \"1:151056753007:web:8266a48732378d704f489a\",\n  measurementId: \"G-WJRWZQ0GBG\"\n}; // eslint-disable-next-line no-undef\n\nfirebase.initializeApp(firebaseConfig);\nconsole.log(\"initialized\"); // Retrieve firebase messaging\n// eslint-disable-next-line no-undef\n\nvar messaging = firebase.messaging(); // messaging.onBackgroundMessage(function (payload) {\n//   console.log(\"Received background message \", payload);\n//\n//   return self.clients.matchAll().then(all => all.forEach(client => {\n//     client.postMessage(\"BACKGROUND PAYLOAD\");\n//    }));\n//\n//   // const notificationTitle = payload.notification.title;\n//   // const notificationOptions = {\n//   //   body: payload.notification.body,\n//   //   icon: \"/icons/icon-256x256.png\",\n//   // };\n//   // eslint-disable-next-line no-restricted-globals\n//   // return self.registration.showNotification(\n//   //   notificationTitle,\n//   //   notificationOptions\n//   // );\n// });\n//\n// self.addEventListener(\"notificationClick\", (e) => {\n//   e.notification.close();\n//   console.log(self.registration.scope);\n// })\n\n//# sourceURL=webpack:///./public/firebase-messaging-sw.js?");

/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi ./public/firebase-messaging-sw.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./public/firebase-messaging-sw.js */\"./public/firebase-messaging-sw.js\");\n\n\n//# sourceURL=webpack:///multi_./public/firebase-messaging-sw.js?");

/***/ })

/******/ });