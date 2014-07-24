/**
 * Basic sample plugin inserting current date and time into CKEditor editing area.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_intro
 */

// Register the plugin within the editor.
CKEDITOR.plugins.add( 'twitter', {

	// Register the icons. They must match command names.
	icons: 'twitter',

	// The plugin initialization logic goes inside this method.
	init: function( editor ) {

		// Define an editor command that inserts twitterAPI call.
		editor.addCommand( 'insertTweet', {

			// Define the function that will be fired when the command is executed.
			exec: function( editor ) {
				var selection = CKEDITOR.instances.editor1.getSelection();
					alert( selection.getType() );

				// Insert elements into the document.
				editor.insertHtml( "<a class='twitter-share-button' href='https://twitter.com/intent//tweet?text="+getSelection+"''> tweet copy </a>");
			}
		});

		// Create the toolbar button that executes the above command.
		editor.ui.addButton( 'Twitter', {
			label: 'Insert Tweet',
			command: 'insertTweet',
			toolbar: 'insert'
		});
	}
});