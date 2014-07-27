/**
 * @author Cameron Manavian
 *
 * @class StartingCommand
 */
puremvc.define({
	name: 'lockApp.controller.StartingCommand',
	parent: puremvc.SimpleCommand
},
// INSTANCE MEMBERS
{
	/** 
	 * Register Commands with the Controller
	 * @override
	 */
	execute: function (note) {
		this._initializeProxies();
	},
	
	_initializeProxies: function() {
		console.warn('StartingCommand _initializeProxies()');
	}
});
