/**
 * @author Cameron Manavian
 *
 * @class FailingCommand
 */
puremvc.define({
	name: 'lockApp.controller.FailingCommand',
	parent: puremvc.SimpleCommand
},
// INSTANCE MEMBERS
{
	/** 
	 * Failing state - something went wrong!
	 * @override
	 */
	execute: function (note) {
		console.warn('FailingCommand execute() lockApp failed with error message:');
		console.warn(note.body);
	}
});
