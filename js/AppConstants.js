/**
 * @author Cameron Manavian
 *
 * @class AppConstants
 */
puremvc.define({
	name: 'lockApp.AppConstants'
},
// INSTANCE MEMBERS
{},
// STATIC MEMBERS
{
	// The multiton key for this app's single core
	CORE_NAME: 'LockApp',
	
	// The password for the lock
	// for demonstration only
	// this is not a good place to store passwords - please dont do this!!
	THE_CONTENT_PASSWORD: 'DeLorean',

	// Notifications 
	STARTUP: 'startup'
});
