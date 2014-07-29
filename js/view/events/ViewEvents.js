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

	// Add event listener using jQuery.bind()
	addEventListener: function (object, eventName, listener) {
		object.bind(eventName, {self: listener}, listener.handleEvent);
	},

	// Dispatch event using jQuery.trigger()
	dispatchEvent: function (object, eventName, data) {
		object.trigger(eventName, data);
	}
});
