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

	var input = this;

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
			/* use json by default */
			dataType: 'json',
			/* require at least 3 characters before doing a search */
			minChars: 3,
			/* set a default success handler */
			success: handleData
	}, options);

	/* save the original url, because jquery.ajax modfies it */
	var originalUrl = options.url;

	/* default success handler for the ajax request */
	function handleData(data, textStatus) {
		var resultList;
		/* is there a result list in the dom already? */
		if (input.next().attr('class') == 'ac_results') {
			/* use it */
			resultList = input.next();
			/* empty the list */
			resultList.empty();
		} else {
			/* create a result list */
			resultList = jQuery('<ul class="ac_results"></ul>');
			/* add the list after the autocompleted element */
			input.after(resultList);
		}

		/* for each of the results received */
		jQuery(data).each(function() {
			/* add it to the list */
			resultList.append('<li>' + this.toString() + '</li>');
		});
	}

	/* input changed handler */
	function inputKeyUp(eventObject) {
		/* if there are more character in the input box than minChars */
		if (input.val().length >= options.minChars) {
			/* set the query parameter for the url */
			options.data = { q: input.val() };
			options.url = originalUrl;
			/* do the actual request */
			jQuery.ajax(options);
		}
	}

	/* bind a function to the key up event of the input box */
	input.keyup(inputKeyUp);
	
	/* always return this */
	return this;
};
