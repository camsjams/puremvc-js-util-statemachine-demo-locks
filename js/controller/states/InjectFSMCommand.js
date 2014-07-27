/**
 * @author Cameron Manavian
 *
 * @class InjectFSMCommand
 */
puremvc.define({
	name: 'lockApp.controller.InjectFSMCommand',
	parent: puremvc.SimpleCommand
},
// INSTANCE MEMBERS
{
	/** 
	 * create and inject the StateMachine
	 * @override
	 */
	execute: function (note) {
		console.warn('InjectFSMCommand()', note);
		console.log('fsm:', this._getFsm());
		// register the commands for our other states
		this._registerStateCommands();
		// Create and inject the StateMachine
		var injector = new utilities.statemachine.FSMInjector(this._getFsm());
		injector.initializeNotifier(this.multitonKey);
		injector.inject();
	},
	
	_registerStateCommands: function() {
		console.info('_registerStateCommands()');
		this.facade.registerCommand(lockApp.model.type.StateMachineType.CHANGED_TO_LOCKED, lockApp.controller.LockedCommand);
		this.facade.registerCommand(lockApp.model.type.StateMachineType.CHANGED_TO_UNLOCKED, lockApp.controller.UnlockedCommand);
		this.facade.registerCommand(lockApp.model.type.StateMachineType.CHANGED_TO_FAILING, lockApp.controller.FailingCommand);
	},
	/**
	 * Get our FSM json Object
	 * 
	 * we could also load this in via an AJAX request
	 * but it is also nice to have the state/action names 
	 * as constants for later use
	 * 
	 * Have an existing XML file for an AS3 state machine perhaps?
	 * http://www.freeformatter.com/xml-to-json-converter.html
	 * 
	 * @return {Object}
	 * 		The FSM config
	 * @private
	 */
	_getFsm: function () {
		var appStates = lockApp.model.type.StateMachineType;
		return {
			"@initial": appStates.STATE_STARTING,
			"state": [
				{
					"@name": appStates.STATE_STARTING,
					"transition": [
						{
							"@action": appStates.ACTION_STARTED,
							"@target": appStates.STATE_LOCKED
						},
						{
							"@action": appStates.ACTION_FAILED_STARTING,
							"@target": appStates.STATE_FAILING
						}
					]
				},
				{
					"@name": appStates.STATE_LOCKED,
					"@exiting": appStates.EXITING_LOCKED,
					"@changed": appStates.CHANGED_TO_LOCKED,
					"transition": [
						{
							"@action": appStates.ACTION_UNLOCKED,
							"@target": appStates.STATE_UNLOCKED
						},
						{
							"@action": appStates.ACTION_TOO_MANY_ATTEMPTS,
							"@target": appStates.STATE_FAILING
						}
					]
				},
				{
					"@name": appStates.STATE_UNLOCKED,
					"@changed": appStates.CHANGED_TO_UNLOCKED,
					"transition": [
						{
							"@action": appStates.ACTION_LOCKED,
							"@target": appStates.STATE_LOCKED
						},
						{
							"@action": appStates.ACTION_IDLE_TIMEOUT,
							"@target": appStates.STATE_LOCKED
						}
					]
				},
				{
					"@name": appStates.STATE_FAILING,
					"@changed": appStates.CHANGED_TO_FAILING
				}
			]
		};
	}
});
