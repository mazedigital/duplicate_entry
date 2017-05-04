/*
 * Duplicate entry
 */
(function ($) {
	Symphony.Language.add({
		"Duplicate Entry": false,
	});


	var DuplicateEntry = {
		
		init: function() {
			var save_button = $('div#field-33');
			
			var form = $('form');
			var form_action = form.attr('action');
			
			var current_section = Symphony.Context.get('duplicate-entry')['current-section'];
			var duplicate_sections = Symphony.Context.get('duplicate-entry')['duplicate-sections'];
			var sections = '';


			// when duplicate_sections is not a blank array
			if (duplicate_sections != null && duplicate_sections != 'null') {
				sections = '<select style="width:auto;float:right;" id="duplicate-section">';
				for(var section in duplicate_sections) {
					selected = '';
					if (section == current_section) selected = ' selected="selected"';
					sections += '<option value="'+section+'"'+selected+'>'+duplicate_sections[section]+'</option>';
				}
				sections += '</select>';
			}
			
			save_button.after('<div style="padding-bottom: 30px; margin-top: -15px; margin-right: -10px;"><span id="duplicate-entry" style="display:block;float:right;"></span></div>');
			$('#duplicate-entry')
			
			.append('<input type="button" class="button" value="' + Symphony.Language.get("Duplicate Entry") + '" id="duplicate-button" name="action[save-duplicate]"/>')
			.append(sections);
			
			$('#duplicate-button').click(function() {


				var clearFields = Symphony.Context.get('duplicate-entry')['clear-fields'];


				for (var i = clearFields.length - 1; i >= 0; i--) {


					$element = $('input[name="fields['+clearFields[i]+']"]');


					if ($element.attr('type')=='checkbox'){
						$element.attr('checked',false);
					} else {
						$element.val('');


					}
				}




				$(this).attr('name', 'action[save]');
				var action = form_action.replace(/edit\/[0-9]+\/(.+)?/, 'new/');
				if (duplicate_sections != null) {
					action = form_action.replace(/publish\/([a-zA-Z0-9-_]+)\/(.+)?/, 'publish/' + jQuery('#duplicate-section').val() + '/new/');
				}
				form.attr('action', action);
			});
		}
		
	}


	$(function() {
		// do not show when in Subsection Manager
		if (!$('#body').hasClass('subsection')) {
			DuplicateEntry.init();
		}
	});
})(jQuery);