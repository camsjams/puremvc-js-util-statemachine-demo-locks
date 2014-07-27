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
	 * Locked state exit guard
	 * @override
	 */
	execute: function (note) {
		if (!this.isValidPassword(note)) {
			// notify user of bad password
			this.facade.sendNotification(lockApp.model.type.NotificationTypes.PASSWORD_WRONG);
			// first time failure or last attempt
			if (note && note.body) {
				if (note.body.attempts > lockApp.controller.ExitingLockedCommand.MAX_ATTEMPTS) {
					this.facade.sendNotification(lockApp.model.type.NotificationTypes.CONTENT_DENIED);
				} else {
					this.facade.sendNotification(lockApp.model.type.NotificationTypes.CONTENT_HINT);
				}
			}
			// either way, cancel the state change
			this.facade.sendNotification(utilities.statemachine.StateMachine.CANCEL);
		}
	},

	isValidPassword: function (note) {
		var isValid = false;
		if (note && note.body && note.body.password) {
			isValid = lockApp.AppConstants.THE_CONTENT_PASSWORD === note.body.password;
		}
		return isValid;
	}
},
// STATIC MEMBERS
{
	MAX_ATTEMPTS: 3
});
