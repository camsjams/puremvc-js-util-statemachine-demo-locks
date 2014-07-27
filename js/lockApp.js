/**
 * @author Cameron Manavian
 *
 * @class lockApp.Application
 */
puremvc.define({
	name: 'lockApp.Application',
	constructor: function () {
		console.log('lockApp constructor()');
		// register the startup command and trigger it.
		this.facade.registerCommand(lockApp.AppConstants.STARTUP, lockApp.controller.StartupCommand);
		this.facade.sendNotification(lockApp.AppConstants.STARTUP);
	}
},

// INSTANCE MEMBERS
{
	// Define the startup notification name
	STARTUP: 'startup',

	// Get an instance of the PureMVC Facade. This creates the Model, View, and Controller instances.
	facade: puremvc.Facade.getInstance(lockApp.AppConstants.CORE_NAME)
});