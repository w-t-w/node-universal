(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./framework/workspace/src/config/framework_config.js":
/*!************************************************************!*\
  !*** ./framework/workspace/src/config/framework_config.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
const PROTO_DIR = path.resolve(process.cwd(), './framework/workspace/src/proto/columns.proto');
const proto_file = fs.readFileSync(PROTO_DIR, 'utf-8');
const framework_config = {
  columns: {
    protocol: 'rpc',
    ip: '127.0.0.1',
    port: 4000,
    timeout: 500,
    protoFile: proto_file,
    requestSchema: 'DetailRequest',
    responseSchema: 'DetailResponse',
    before(data) {
      return data;
    },
    then(data) {
      return data.columns;
    },
    catch() {}
  },
  articles: {
    protocol: 'http',
    url: 'http://127.0.0.1:3000',
    then(data) {
      return JSON.parse(data).data.list;
    }
  }
};
module.exports = framework_config;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./framework/workspace/src/config/framework_config.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});