/**
<<<<<<< HEAD
* Basic sample plugin inserting current date and time into CKEditor editing area.
*
* Created out of the CKEditor Plugin SDK:
* http://docs.ckeditor.com/#!/guide/plugin_sdk_intro
*/
=======
 * Basic sample plugin inserting current date and time into CKEditor editing area.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_intro
 */
>>>>>>> 1af67d74f41716390318ef67505b9c5b520c52bb

// Register the plugin within the editor.
CKEDITOR.plugins.add('twitter', {

<<<<<<< HEAD
// Register the icons. They must match command names.
icons: 'twitter',

// The plugin initialization logic goes inside this method.
init: function(editor) {

// Define an editor command that inserts twitterAPI call.
editor.addCommand('insertTweet', {

// Define the function that will be fired when the command is executed.
exec: function(editor) {
var selection = editor.getSelection();
alert(selection.getType());

// Insert elements into the document.
editor.insertHtml("<a class='twitter-share-button' href='https://twitter.com/intent//tweet?text=" + getSelection + "''> tweet copy </a>");
}
});

// Create the toolbar button that executes the above command.
editor.ui.addButton('Twitter', {
label: 'Insert Tweet',
command: 'insertTweet',
toolbar: 'insert',
icon: CKEDITOR.plugins.getPath('twitter') + 'icons/twitter.png'
});
}
=======
    // Register the icons. They must match command names.
    icons: 'twitter',

    // The plugin initialization logic goes inside this method.
    init: function(editor) {

        // Define an editor command that inserts twitterAPI call.
        editor.addCommand('insertTweet', {

            // Define the function that will be fired when the command is executed.
            exec: function(editor) {
                var selection = editor.getSelection().getSelectedText();
                selection = CKEDITOR.tools.htmlEncode(selection);

                // Insert elements into the document.
                editor.insertHtml("<a class='twitter-share-button' href='https://twitter.com/intent/tweet?text=" + selection + "''> tweet copy </a>");
            }
        });

        // Create the toolbar button that executes the above command.
        editor.ui.addButton('Twitter', {
            label: 'Insert Tweet',
            command: 'insertTweet',
            toolbar: 'insert',
            icon: CKEDITOR.plugins.getPath('twitter') + 'icons/twitter.png'
        });
    }
>>>>>>> 1af67d74f41716390318ef67505b9c5b520c52bb
});