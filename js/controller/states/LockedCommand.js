/**
 * @author Cameron Manavian
 *
 * @class LockedCommand
 */
puremvc.define({
	name: 'lockApp.controller.LockedCommand',
	parent: puremvc.SimpleCommand
},
// INSTANCE MEMBERS
{
	/** 
	 * Locked state
	 * @override
	 */
	execute: function (note) {
		console.warn('LockedCommand execute() our element is locked', note);
		// move on to next state, unlock element
		this.facade.sendNotification(utilities.statemachine.StateMachine.ACTION, null, lockApp.model.type.StateMachineType.ACTION_UNLOCKED);
	}
});
