/**
 * Basic sample plugin inserting current date and time into CKEditor editing area.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_intro
 */

// Register the plugin within the editor.


CKEDITOR.plugins.add('twitter', {
    icons: 'twitter',
    init: function(editor) {
        editor.addCommand('insertTweet', new CKEDITOR.dialogCommand('insertTweet'));
        editor.ui.addButton('Twitter', {
            label: 'Insert Tweet',
            command: 'insertTweet',
            toolbar: 'insert',
            icon: CKEDITOR.plugins.getPath('twitter') + 'icons/twitter.png'
        });

        CKEDITOR.dialog.add('insertTweet', this.path + 'dialogs/tweetBuild.js');
    }
});