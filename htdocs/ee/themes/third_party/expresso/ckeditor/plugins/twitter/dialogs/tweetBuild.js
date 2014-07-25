CKEDITOR.dialog.add('insertTweet', function(editor) {

    var selection = editor.getSelection().getSelectedText();
    var livetext = '';
    var tweet = '';
    var via = '';
    var url = '';

    function getRemainingChars(element) {
        var tweetLength = element.getDialog().getContentElement('tab-basic', 'tweet').getElement().getHtml().length;
        console.log(tweetLength);
        var remainingChars = 140 - tweetLength;
        console.log(remainingChars);
        var remainingElement = element.getDialog().getContentElement('tab-basic', 'remainingchars').getElement();
        remainingElement.setHtml('Remaining Characters: ' + remainingChars);
    }

    return {
        title: 'Tweet Properties',
        minWidth: 400,
        minHeight: 200,
        contents: [{
            id: 'tab-basic',
            label: 'Basic Settings',
            elements: [{
                type: 'textarea',
                id: 'livetext',
                label: 'Text',
                onChange: function() {
                    getRemainingChars(this);
                },
                onLoad: function(element) {
                    var selection = editor.getSelection();
                    var selectedText = selection.getSelectedText();
                    this.setValue(selectedText);
                },
                setup: function(element) {
                    console.log('Getting text: ' + element.getText());
                    this.setValue(element.getText());
                },
                commit: function(element) {
                    element.setText(this.getValue());
                }
            }, {
                type: 'html',
                id: 'tweet',
                label: '',
                html: ''
            }, {
                type: 'html',
                id: 'remainingchars',
                html: ''
            }]
        }, {
            id: 'tab-adv',
            label: 'Advanced Settings',
            elements: [{
                type: 'text',
                id: 'via',
                label: 'Via',
                onChange: function() {
                    getRemainingChars(this);
                },
                setup: function(element) {
                    this.setValue(element.getAttribute("data-via"));
                },
                commit: function(element) {
                    element.setAttribute("data-via", this.getValue());
                }
            }, {
                type: 'text',
                id: 'url',
                label: 'URL',
                onChange: function() {
                    getRemainingChars(this);
                },
                setup: function(element) {
                    this.setValue(element.getAttribute("data-url"));
                },
                commit: function(element) {
                    element.setAttribute("data-url", this.getValue());
                }
            }]
        }],
        onShow: function() {
            var selection = editor.getSelection();
            var selectedText = selection.getSelectedText();

            console.log(selectedText);
            element = selection.getStartElement();
            if (element) {
                element = element.getAscendant('blockquote', true);
            }
            if (!element || element.getName() != 'blockquote' || element.data('cke-realelement')) {

                element = editor.document.createElement('blockquote');
                element.setAttribute('class', 'tweet');

                this.insertMode = true;
            } else {
                this.insertMode = false;
            }

            this.element = element;

            if (!this.insertMode) {
                this.setupContent(this.element);
            }

        },
        onOk: function() {
            var dialog = this,
                tweet = this.element;

            this.commitContent(tweet);

            if (this.insertMode)
                editor.insertElement(tweet);
        }
    };
});