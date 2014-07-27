/**
 * @author Cameron Manavian
 *
 * @class ViewEvents
 */
puremvc.define({
	name: 'lockApp.view.event.ViewEvents'
}, {},
// STATIC MEMBERS   
{
	// Event name constants
	PASSWORD_SUBMITTED: 'PASSWORD_SUBMITTED',
	UNLOCKED_TIMEOUT: 'UNLOCKED_TIMEOUT',

	// Add event listener
	addEventListener: function (object, eventName, listener) {
		object.bind(eventName, {self: listener}, listener.handleEvent);
	},

	// Dispatch event
	dispatchEvent: function (object, eventName, data) {
		object.trigger(eventName, data);
	},
});
