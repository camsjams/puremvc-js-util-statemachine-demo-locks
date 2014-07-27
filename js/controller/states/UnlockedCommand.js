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
		console.warn('UnlockedCommand execute() our element is unlocked', note);
	}
});
