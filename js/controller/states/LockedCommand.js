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
		// tell view to lock up that content
		this.facade.sendNotification(lockApp.model.type.NotificationTypes.CONTENT_LOCKED);
	}
});
