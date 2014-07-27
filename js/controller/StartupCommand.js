/**
 * @author Cameron Manavian
 *
 * @class StartupCommand
 */
puremvc.define({
	name: 'lockApp.controller.StartupCommand',
	parent: puremvc.MacroCommand
},
// INSTANCE MEMBERS 
{
	/** 
	 * Add the sub-commands for this MacroCommand
	 * @override
	 */
	initializeMacroCommand: function () {
		this.addSubCommand(lockApp.controller.InjectFSMCommand);
		this.addSubCommand(lockApp.controller.StartingCommand);
	}
});
