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
	}
});
