Ractive.extend({

	template: RactiveF.templates.uxiconbar,

	computed: {

		/**
		 * TODO Move to generic helpers location?
		 * @returns {string} The number of child items as a css class, e.g. "one-up", "three-up", etc.
		 */
		upNum: function () {

			var data = this.get();
			var num = _.isArray(data.items) ? data.items.length : 0;

			var supportedWords = [
				'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'
			];

			if (!supportedWords[num]) {
				console.error('uxiconbar#numberToWord: num NOT supported: ' + num);
				return '';
			}

			return supportedWords[num] + '-up';

		}

	},

	oninit: function () {

		var items = this.findAllComponents('uxiconbaritem');

		var childCount = items.length;
		if (childCount < 1 || childCount > 8) {
			console.error('uxiconbar only supports between 1-8 items.');
		}

		// Store for later use.
		this.set('items', items);

	}

});
