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
		try {
			// prepare view
			this.facade.registerMediator(new lockApp.view.mediator.AccessControlMediator());
			// move on to next state, lock element
			this.facade.sendNotification(utilities.statemachine.StateMachine.ACTION, null, lockApp.model.type.StateMachineType.ACTION_STARTED);
		} catch (e) {
			// view wasn't happy, fail state
			this.facade.sendNotification(utilities.statemachine.StateMachine.ACTION, e, lockApp.model.type.StateMachineType.ACTION_FAILED_STARTING);
		}
	},
});
