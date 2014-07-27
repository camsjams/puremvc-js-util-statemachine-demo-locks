/**
 * @author Cameron Manavian
 *
 * @class UnlockedCommand
 */
puremvc.define({
	name: 'lockApp.controller.UnlockedCommand',
	parent: puremvc.SimpleCommand
},
// INSTANCE MEMBERS
{
	/** 
	 * Unlocked state
	 * @override
	 */
	execute: function (note) {
		// tell view to show the content
		this.facade.sendNotification(lockApp.model.type.NotificationTypes.CONTENT_UNLOCKED);
	}
});
