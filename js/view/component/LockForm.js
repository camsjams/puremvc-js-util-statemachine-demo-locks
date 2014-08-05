(function ($) {
	/**
	 * @author Cameron Manavian
	 *
	 * @class LockForm
	 */
	puremvc.define({
		name: 'lockApp.view.component.LockForm',
		constructor: function (appId) {
			// select dom elements
			this.$root = $('#' + appId);
			this.$accessControl = this.$root.find('.accessControl');
			this.$form = this.$root.find('form');

			// do null check
			if (!this.$root || !this.$accessControl || !this.$form) {
				throw new Error('Missing core form elements in lockApp.view.component.LockForm::constructor()');
			}
			this.addFormListeners();
		}
	},
	// INSTANCE MEMBERS
	{
		/* jQuery reference to the root dom element view for this component
		 *
		 * @type {Object}
		 * @private
		 */
		$root: null,

		/**
		 * jQuery reference to the control overlay
		 *
		 * @type {Object}
		 * @private
		 */
		$accessControl: null,

		/**
		 * jQuery reference to the form
		 *
		 * @type {Object}
		 * @private
		 */
		$form: null,

		/**
		 * number of attempts
		 *
		 * @type {Object}
		 * @private
		 */
		attempts: 0,

		addEventListener: function (eventName, listener) {
			lockApp.view.event.ViewEvents.addEventListener(this.$root, eventName, listener);
		},

		dispatchEvent: function (eventName, data) {
			lockApp.view.event.ViewEvents.dispatchEvent(this.$root, eventName, data);
		},

		addFormListeners: function () {
			var self = this;
			// add form submit event
			this.$form.submit(function (e) {
				e.preventDefault();
				var $password = self.$form.find('#password'), 
					password = $password.val();
				$password.removeClass('required');
				// make sure the password isnt empty
				if (password && password !== '') {
					self.attempts++;
					self.dispatchEvent(lockApp.view.event.ViewEvents.PASSWORD_SUBMITTED, {
						'attempts': self.attempts,
						'password': password
					});
				} else {
					$password.addClass('required');
				}
			});
		},

		startContentTimeout: function () {
			var self = this;
			setTimeout(function () {
				self.dispatchEvent(lockApp.view.event.ViewEvents.UNLOCKED_TIMEOUT);
			}, lockApp.view.component.LockForm.TIMEOUT);
		},

		lockContent: function () {
			this.$accessControl.removeClass('unlocked denied').addClass('locked');
			this.$root.find('.title').html('This content is locked. Please enter the password below.');
		},

		unlockContent: function () {
			this.attempts = 0;
			this.$form.find('.attempts').html('');
			this.$root.find('.title').html('Password accepted. This content will be unlocked for ' + lockApp.view.component.LockForm.TIMEOUT / 1000 + ' seconds.');
			this.$accessControl.removeClass('denied locked').addClass('unlocked');
			this.startContentTimeout();
		},

		denyContent: function () {
			this.$accessControl.removeClass('unlocked locked').addClass('denied');
			this.$form.html('You have made the maximum number of attempts (' + this.attempts + ').<br />Please contact Marty McFly.');
		},

		onWrongPassword: function () {
			this.$form.find('.attempts').html('Attempts made:' + this.attempts);
		},

		hintPassword: function () {
			var $hints = this.$form.find('.hints .hint');
			$hints.removeClass('hint' + this.attempts);
		}
	},

	// STATIC MEMBERS
	{
		NAME: 'LockForm',

		SELECTOR: '#lockForm',

		TIMEOUT: 5000
	});
})(jQuery);