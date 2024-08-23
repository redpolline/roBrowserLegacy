/**
 * UI/Components/NavigationUI/NavigationUI.js
 *
 * Navigation windows
 *
 * Note: For different versions, please use different Object names and main div IDs to avoid conflicts in settings and styles
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 */
define(function (require)
{
	'use strict';

	var publicName = 'NavigationUI';

	var NavigationUIV0 = require('./NavigationUIV0/NavigationUIV0');
	//var NavigationUIV3 = require('./NavigationUIV3/NavigationUIV3');

	var UIVersionManager = require('UI/UIVersionManager');

	var versionInfo = {
		default: NavigationUIV0,
		common: {
			//20131211:	NavigationUIV3,
			20120208:       NavigationUIV0
		},
		re: {

		},
		prere:{

		}
	};

	var NavigationUIController = UIVersionManager.getUIController(publicName, versionInfo);

	return NavigationUIController;
});
