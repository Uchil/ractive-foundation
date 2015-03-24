/**
 * Shared environment for all tests.
 */
var webdriverio = require('webdriverio');
var selenium = require('selenium-standalone');

// @see http://nodejs.org/api/assert.html
// Assertion library of choice.
var assert = require('assert');

// WebdriverIO Browser choices.
const BROWSER_PHANTOMJS = 'phantomjs';
const BROWSER_CHROME = 'chrome';
const BROWSER_FIREFOX = 'firefox';

const WEBDRIVER_TIMEOUT = 5000;

// TODO The port will inevitably need to be dynamic.
var COMPONENT_BASE_PATH = 'http://localhost:9080/test.html#component/';

var WorldConstructor = function WorldConstructor(callback) {

	var options = {
		desiredCapabilities: {
			browserName: BROWSER_PHANTOMJS
		}
	};

	// Start webdriver server.
	selenium.start(function (err, child) {
		// Purely selenium server debugging output.
		//child.stderr.on('data', function(data){
		//	console.log(data.toString());
		//});
	});

	var client = webdriverio.remote(options).init();

	var world = {

		assert: assert,

		client: client,

		defaultTimeout: WEBDRIVER_TIMEOUT

	};

	client.addCommand('loadComponent', function(componentName, callback) {
		this.url(COMPONENT_BASE_PATH + componentName, callback);
	});

	callback(world);

};

exports.World = WorldConstructor;
