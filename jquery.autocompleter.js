/*
   jQuery.Autocompleter
   Copyright (C) 2009  Michael Croes <mycroes@gmail.com and
   Frank Groeneveld <frankgroeneveld@gmail.com>

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

/* attach to jquery function object */
jQuery.fn.autocompleter = function(options) {
	/*
	 * this now holds the jquery object.
	 * see also: http://docs.jquery.com/Plugins/Authoring
	 */

	/* extend the options with the default values (only sets if not set yet) */
	options = jQuery.extend({
			/* default debug beforeSend */
			beforeSend: function(xhr) {
				console.log('before send');
			},
			/* default debug error */
			error: function(xhr, textStatus, errorThrown) {
				console.log(textStatus);
				console.log(errorThrown);
			},
			/* Default data */
			data: {},
			/* use json by default */
			dataType: 'json',
			/* require at least 3 characters before doing a search */
			minChars: 3,
			/* set a default success handler */
			success: handleData
	}, options || {});

	/* returns the result list and create one if needed */
	function getResultList() {
		/* get result list */
		var res = jQuery(this).next();

		/* Check if we have the list */
		if (!res.length || !res.hasClass('ac_results')) {
			/* Not yet, create it */
			res = jQuery('<ul class="ac_results"></ul>')
					.insertAfter(this);
		}

		/* Return the result list */
		return res;
	}

	/* default success handler for the ajax request */
	function handleData(data, textStatus) {
		var resultList = getResultList.call(this);
		/* empty the list */
		resultList.empty();

		/* for each of the results received */
		jQuery(data.matches).each(function() {
			/* add it to the list */
			resultList.append('<li>' + this.toString() + '</li>');
		});

		resultList.show();
	}

	/* KeyUp event handler. */
	function keyUp(e) {
		/* Get the input object */
		var el = jQuery(this);
		
		/* Check minimum character */
		if (el.val().length < options.minChars) {
			return true;
		}
		
		/* Check if value is changed */
		if (el.data('_ac_val') == el.val()) {
			return true;
		}

		/* Store data so we can check if it's changed. */
		el.data('_ac_val', el.val());

		/* Do a deep extend of options */
		var sendOpts = jQuery.extend(true, {}, options, {data: {q: el.val()}});
		sendOpts.success = function(data, textStatus) {
			handleData.call(el, data, textStatus);
		};

		/* Send the request */
		var req = jQuery.ajax(sendOpts);
	}

	/* Hide result list on blur */
	function blur(e) {
		/* Hide the result list */
		jQuery(getResultList.call(this)).hide();
		
		/* Don't prevent other handlers. */
		return true;
	}

	/* bind a function to the key up event of the input box */
	this.keyup(keyUp);

	/* bind a function to the blur event of the input box */
	this.blur(blur);
	
	/* always return jQuery (this) */
	return this;
};
