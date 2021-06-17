(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define('HMRCFrontend', factory) :
	(factory());
}(this, (function () { 'use strict';

	window.HMRCFrontend.initAll();

})));
