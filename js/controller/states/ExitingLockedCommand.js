/**
 * @author Cameron Manavian
 *
 * @class ExitingLockedCommand
 */
puremvc.define({
	name: 'lockApp.controller.ExitingLockedCommand',
	parent: puremvc.SimpleCommand
},
// INSTANCE MEMBERS
{
	/** 
	 * Locked state
	 * @override
	 */
	execute: function (note) {
		console.warn('ExitingLockedCommand execute() make sure element is unlocked');
		if (this.isValidPassword()) {
			console.warn("permit change state");
		} else {
			console.warn("cancel change state");
			this.facade.sendNotification(utilities.statemachine.StateMachine.CANCEL);
		}
	},
	
	isValidPassword: function() {
		console.warn("permit change state");
		return false;
	}
});
