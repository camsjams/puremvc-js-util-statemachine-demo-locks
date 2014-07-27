/**
 * @author Cameron Manavian
 *
 * @class AccessControlMediator
 */
puremvc.define({
	name: 'lockApp.view.mediator.AccessControlMediator',
	parent: puremvc.Mediator
},
// INSTANCE MEMBERS
{
	// Notifications this mediator is interested in
	listNotificationInterests: function () {
		return [
		lockApp.model.type.NotificationTypes.CONTENT_LOCKED,
		lockApp.model.type.NotificationTypes.CONTENT_UNLOCKED,
		lockApp.model.type.NotificationTypes.CONTENT_DENIED,
		lockApp.model.type.NotificationTypes.CONTENT_HINT,
		lockApp.model.type.NotificationTypes.PASSWORD_WRONG];
	},

	// Code to be executed when the Mediator instance is registered with the View
	onRegister: function () {
		this.setViewComponent(new lockApp.view.component.LockForm);
		this.viewComponent.addEventListener(lockApp.view.event.ViewEvents.PASSWORD_SUBMITTED, this);
		this.viewComponent.addEventListener(lockApp.view.event.ViewEvents.UNLOCKED_TIMEOUT, this);
	},

	// Handle events from the view component
	handleEvent: function (event, data) {
		var self = event.data.self;
		switch (event.type) {
			case lockApp.view.event.ViewEvents.PASSWORD_SUBMITTED:
				// try to move on to next state, unlock element
				self.facade.sendNotification(utilities.statemachine.StateMachine.ACTION, data, lockApp.model.type.StateMachineType.ACTION_UNLOCKED);
				break;
			case lockApp.view.event.ViewEvents.UNLOCKED_TIMEOUT:
				// the content has been showing for too long, time to lock it again
				self.facade.sendNotification(utilities.statemachine.StateMachine.ACTION, data, lockApp.model.type.StateMachineType.ACTION_IDLE_TIMEOUT);
				break;
		}
	},

	// Handle notifications from other PureMVC actors
	handleNotification: function (note) {
		switch (note.getName()) {
			case lockApp.model.type.NotificationTypes.CONTENT_LOCKED:
				this.viewComponent.lockContent();
				break;
			case lockApp.model.type.NotificationTypes.CONTENT_UNLOCKED:
				this.viewComponent.unlockContent();
				break;
			case lockApp.model.type.NotificationTypes.CONTENT_DENIED:
				this.viewComponent.denyContent();
				break;
			case lockApp.model.type.NotificationTypes.CONTENT_HINT:
				this.viewComponent.hintPassword();
				break;
			case lockApp.model.type.NotificationTypes.PASSWORD_WRONG:
				this.viewComponent.onWrongPassword();
				break;
		}
	},
},
// STATIC MEMBERS
{
	NAME: 'AccessControlMediator'
});
