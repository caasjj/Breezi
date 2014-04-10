define(function(require, exports, module) {
	var Engine  = require('famous/core/Engine');
	var Utility = require('famous/utilities/Utility');
	var AppView = require('views/AppView');
	var appView = new AppView();

	var mainContext = Engine.createContext();

    // This is in place only to workaround a Chrome bug
	var isAndroid = function() {
        var userAgent = navigator.userAgent.toLowerCase();
        return userAgent.indexOf("android") > -1;
    }
	if (isAndroid()) {
	  mainContext.setPerspective(5000);
	}

	mainContext.add(appView);
});
