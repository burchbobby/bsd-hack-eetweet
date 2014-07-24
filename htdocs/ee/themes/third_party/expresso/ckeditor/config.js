/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function(config) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';

    // Referencing the new plugin
    config.extraPlugins = 'twitter';

    // Define the toolbar buttons you want to have available
    config.toolbar = 'Twitter';

    config.toolbar_Twitter =
        [
        ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Scayt'],
        ['Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat']
        ['Tweet', 'Preview'],
    ];

    config.stylesSet = 'default';
};