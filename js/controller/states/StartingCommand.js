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
		console.log('StartingCommand execute() switch to lock');
		// move on to next state, lock element
		this.facade.sendNotification(utilities.statemachine.StateMachine.ACTION, null, lockApp.model.type.StateMachineType.ACTION_STARTED);
	},
	
	_initializeProxies: function() {
		console.log('StartingCommand _initializeProxies()');
	}
});
