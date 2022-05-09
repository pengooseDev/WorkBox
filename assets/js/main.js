/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/main.js":
/*!*******************************!*\
  !*** ./src/client/js/main.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ \"./src/client/scss/style.scss\");\n/* harmony import */ var _videoHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./videoHandler */ \"./src/client/js/videoHandler.js\");\n/* harmony import */ var _videoHandler__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_videoHandler__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _streamMusic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./streamMusic.js */ \"./src/client/js/streamMusic.js\");\n/* harmony import */ var _streamMusic_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_streamMusic_js__WEBPACK_IMPORTED_MODULE_2__);\n/* CSS */\n\n/* JS */\n\n\n\n\n//# sourceURL=webpack://WorkBox/./src/client/js/main.js?");

/***/ }),

/***/ "./src/client/js/streamMusic.js":
/*!**************************************!*\
  !*** ./src/client/js/streamMusic.js ***!
  \**************************************/
/***/ (() => {

eval("//코드 다시짜기\n\n/*import { createFFmpeg, fetchFile } from \"@ffmpeg/ffmpeg\";\r\nimport ytdl from \"ytdl-core\";\r\nimport fs from \"fs\";\r\n\r\nconsole.log(\"FFMEG!\");\r\nconst videoData = ytdl(\"http://www.youtube.com/watch?v=aqz-KE-bpKQ\").pipe(\r\n    fs.createWriteStream(\"video.mp4\")\r\n);\r\n\r\nconst handleDownload = async (videoUrl) => {\r\n    const ffmpeg = createFFmpeg({ log: true });\r\n    await ffmpeg.load();\r\n\r\n    ffmpeg.FS(\"writeFile\", \"mp4name\", await fetchFile(videoUrl));\r\n    await ffmpeg.run(\"-i\", \"mp4name\", \"-r\", \"60\", \"ouput.mp4\");\r\n};*/\n\n//# sourceURL=webpack://WorkBox/./src/client/js/streamMusic.js?");

/***/ }),

/***/ "./src/client/js/videoHandler.js":
/*!***************************************!*\
  !*** ./src/client/js/videoHandler.js ***!
  \***************************************/
/***/ (() => {

eval("var video = document.querySelector(\"video\");\nvar videoController = document.getElementById(\"videoController\");\nvar psBtn = videoController.querySelector(\"#playPauseBtn\");\nvar volumeBtn = videoController.querySelector(\"#volume\");\nvar volumeRange = videoController.querySelector(\"#volumeRange\");\nvar videoTimeValue = document.querySelector(\".video-time\");\nvar timeLine = document.querySelector(\".timeLine\");\nvar videoBackgroundBox = document.querySelector(\".video-box\");\nvar volumeValue = 0.5;\nvideo.volume = volumeValue;\n\nvar handleVideoClickPause = function handleVideoClickPause() {\n  if (video.paused) {\n    video.play();\n    psBtn.className = \"fas fa-pause\";\n  } else {\n    video.pause();\n    psBtn.className = \"fas fa-play\";\n  }\n};\n\nvideoBackgroundBox.addEventListener(\"click\", handleVideoClickPause);\n\nvar handlePlayAndStop = function handlePlayAndStop() {\n  if (video.paused) {\n    video.play();\n    psBtn.className = \"fas fa-pause\";\n  } else {\n    video.pause();\n    psBtn.className = \"fas fa-play\";\n  }\n};\n\nvar handleSound = function handleSound() {\n  if (video.muted) {\n    video.muted = false;\n    volumeRange.value = volumeValue;\n    volumeBtn.className = \"fas fa-volume-up\";\n  } else {\n    video.muted = true;\n    volumeRange.value = 0;\n    volumeBtn.className = \"fas fa-volume-mute\";\n  }\n};\n\nvar handleVolume = function handleVolume(event) {\n  var value = event.target.value;\n\n  if (video.muted) {\n    video.muted = false;\n    volumeBtn.className = \"fas fa-volume-mute\";\n  }\n\n  if (value === \"0\") {\n    volumeBtn.className = \"fas fa-volume-off\";\n  } else {\n    volumeBtn.className = \"fas fa-volume-up\";\n  }\n\n  video.volume = volumeValue = value;\n};\n\nvar setVideoTime = function setVideoTime() {\n  var durationValue = Math.floor(Number(video.duration));\n  var currentTime = Math.floor(video.currentTime); //F'를 눌러 전체 화면 모드로 들어가기, Esc 키를 눌러 전체 화면 모드에서 나오기\n\n  videoTimeValue.innerHTML = \"0:\".concat(currentTime < 10 ? \"0\".concat(currentTime) : currentTime, \" / 0:\").concat(durationValue);\n  var parsedValue = currentTime / durationValue * 100;\n  timeLine.value = parsedValue;\n};\n\nvar keyInputHandler = function keyInputHandler(e) {\n  console.log(e.code);\n  var value = e.code;\n\n  if (value === \"Space\") {\n    handlePlayAndStop();\n  } else if (value === \"KeyF\") {\n    //it is working at VSC with Chrome!\n    video.requestFullscreen();\n  } else if (value === \"KeyM\") {\n    if (!video.muted) {\n      volumeBtn.className = \"fas fa-volume-mute\";\n      return video.muted = true;\n    } else {\n      volumeBtn.className = \"fas fa-volume-up\";\n      return video.muted = false;\n    }\n  } else if (value === \"Escape\") {\n    //it is working at VSC with Chrome!\n    video.exitFullscreen();\n  }\n};\n\nvar timeLineHandler = function timeLineHandler(e) {\n  var inputValue = e.target.value;\n  var parsedValue = video.duration * inputValue * 0.01;\n  video.currentTime = parsedValue;\n};\n\ntimeLine.addEventListener(\"input\", timeLineHandler);\n\nfunction init() {\n  setInterval(setVideoTime, 100);\n  psBtn.addEventListener(\"click\", handlePlayAndStop);\n  volumeBtn.addEventListener(\"click\", handleSound);\n  volumeRange.addEventListener(\"input\", handleVolume);\n  document.onkeyup = keyInputHandler;\n}\n\ninit();\n\n//# sourceURL=webpack://WorkBox/./src/client/js/videoHandler.js?");

/***/ }),

/***/ "./src/client/scss/style.scss":
/*!************************************!*\
  !*** ./src/client/scss/style.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://WorkBox/./src/client/scss/style.scss?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/js/main.js");
/******/ 	
/******/ })()
;