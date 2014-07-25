CKEDITOR.dialog.add('insertTweet', function(editor) {

    var selection = editor.getSelection().getSelectedText();
    var livetext = '';
    var tweet = '';
    var via = '';
    var url = '';

    function getRemainingChars(element) {
        tweet = livetext + ' ' + via + ' ' + url;
        console.log('Tweet: ' + tweet);
        var tweetLength = tweet.length;
        var remainingChars = 140 - tweetLength;
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
                onChange: function(element) {
                    livetext = this.getValue();
                    getRemainingChars(this);
                },
                setup: function(element) {
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
                onChange: function(element) {
                    via = this.getValue();
                    console.log('Via : ' + via);
                    if (via.length > 1) {
                        via = 'via @' + via;
                    } else {
                        via = '';
                    }
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
                onChange: function(element) {
                    url = this.getValue();
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
            element = selection.getStartElement();
            if (element) {
                element = element.getAscendant('blockquote', true);
            }
            if (!element || element.getName() != 'blockquote' || element.data('cke-realelement')) {

                element = editor.document.createElement('blockquote');
                element.setAttribute('class', 'tweet');

                this.insertMode = true;

                this.getContentElement('tab-basic', 'livetext').setValue(selectedText);

            } else {
                this.insertMode = false;
            }

            this.element = element;

            if (!this.insertMode) {
                this.setupContent(this.element);
            } else {

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