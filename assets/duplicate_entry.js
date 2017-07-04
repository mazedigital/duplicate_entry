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
			
			.append('<input type="submit" class="button" value="' + Symphony.Language.get("Duplicate Entry") + '" id="duplicate-button" name="action[save-duplicate]"/> ')
			// .append('<button type="submit" class="button" value="' + Symphony.Language.get("Duplicate Entry") + '" id="duplicate-button" name="action[save-duplicate]">'+ Symphony.Language.get("Duplicate Entry") + '</button>')
			.append(sections);

			$( 'form' ).bind('keypress', function(e){
			    if ( e.keyCode == 13 ) {
			    	$("input[name='action[save-duplicate]']").prop("type", "button");
			    }
			});

			$(document).on('click','#duplicate-button',function(){
				$("input[name='action[save-duplicate]']").prop("type", "button");
			});


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

			$('#duplicate-entry').keypress(function(e) {
			    if(e.which == 13) { // Checks for the enter key
			        e.preventDefault(); // Stops IE from triggering the button to be clicked
			    }
			});

		
				// $("#duplicate-button").keypress(function(e) {
				// 	if (e.keyCode == 13) {
				// 	    self.validateNightModalForm();
				// 	    e.preventDefault()
				// 	    return false;
				// 	}
				// });
			  // $("#duplicate-button").keypress(function(e) {
			  //   if (e.which == 13) {
			  //     $('#submit').click();
			  //     return false;
			  //   }

			  //   return true;
			  // });

			// $("#duplicate-button").keypress(function(e){
			// 	if(e1.keyCode==13){          // if user is hitting enter
			//        e.preventDefault();
			//     }
			// });
		}
		
	}


	$(function() {
		// do not show when in Subsection Manager
		if (!$('#body').hasClass('subsection')) {
			DuplicateEntry.init();
		}
	});
})(jQuery);