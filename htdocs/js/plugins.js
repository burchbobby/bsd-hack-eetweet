// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

// hish highlight to share plugins
+ function($) {
    "use strict";

    var Hish = function(element, options) {
        this.init(element, options)
    }

    Hish.prototype.init = function(element, options) {
        this.$element = $(element)

        //this.loadStyles();
        this.loadWidgets();
        this.loadPopover();
        this.bindEvents();
    }

    Hish.prototype.bindEvents = function() {
        var _this = this;

        // checks for highlighted text
        _this.$element.mouseup(function(e) {
            _this.checkTextSelection(_this);
            e.stopPropagation();
        });

        // hides the popover if user clicks on unregistered elements
        $(document).mouseup(function(e) {
            _this.hide();
        });

        // $('#hish-share-facebook').click(function(e) {
        //   var facebook_dialog_url = "https://www.facebook.com/sharer/sharer.php?u=" + document.URL;
        //   var facebook_popup = window.open(facebook_dialog_url,'facebook-share','height=600,width=500');
        //   if (window.focus) {facebook_popup.focus()}
        //   _this.hide();
        // });

        //fb-sharer 
        jQuery('#hish-share-facebook').on('click', function(e) {        
            e.preventDefault();

                    
            var $this = jQuery(this),
                            name = 'Hackathon Project',
                           link = 'http://www.bluestatedigital.com/',
                            picture = 'http://www.bluestatedigital.com/page/-/agency-new/site/images/blue-state-digital.jpg',
                            description = 'Hackathon project to highlight and share to facebook and twitter',
                caption = _this.getText();
            console.log('Name: ' + name + ' Link: ' + link + ' Picture: ' + picture + ' Description: ' + description);          
            FB.init({            
                appId: '327572920728706',
                            status: true,
                            cookie: true        
            });         
            FB.ui({            
                method: 'feed',
                            display: 'popup',
                            name: name,
                            link: link,
                caption: caption,
                            picture: picture + "?nocdn=1", //serve the non-CDN version of the image
                            description: description        
            });   
        });

        (function(d, s, id) {    
            var js, fjs = d.getElementsByTagName(s)[0];    
            if (d.getElementById(id)) {
                return;
            }    
            js = d.createElement(s);
            js.id = id;    
            js.src = "http://connect.facebook.net/en_US/all.js";    
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        $('#hish-share-twitter').click(function(e) {
            var twitter_intent_url = "https://twitter.com/intent/tweet?text=" + _this.getText() + "&url=" + document.URL;
            var twitter_popup = window.open(twitter_intent_url, 'twitter-share', 'height=600,width=500');
            if (window.focus) {
                twitter_popup.focus()
            }
            _this.hide();
        });

        // prevent text from automatically unhighlighting upon sharing
        $('#hish-share-facebook').mousedown(function(e) {
            e.preventDefault();
        })
        $('#hish-share-twitter').mousedown(function(e) {
            e.preventDefault();
        })
    }

    Hish.prototype.getText = function() {
        var highlighted = window.getSelection().toString();
        var text = highlighted.length > 115 ? '' + window.getSelection().toString().substring(0, 112) + '...' : highlighted;
        text = '"' + text + '"';
        return text;
    }

    Hish.prototype.loadPopover = function() {
        if (!document.getElementById('hish-share-wrapper')) {
            $("<div id='hish-share-wrapper'>" +
                "<div id='hish-share-popover-inner'>" +
                "<span id='hish-share-facebook'> <i class='ss-icon'> &#xF610; </i> </span>" +
                "<span id='hish-share-twitter'> <i class='ss-icon'> &#xF611; </i> </span>" +
                "</div>" +
                "<div id='hish-share-arrow-wrapper'>" +
                "<span id='hish-share-arrow'></span>" +
                "</div>" +
                "</div>"
            ).appendTo('body');
        }
    }

    //Hish.prototype.loadStyles = function() {}

    Hish.prototype.loadWidgets = function() {
        var twitter_widget = "http://platform.twitter.com/widgets.js";
        if (!$("script[src='" + twitter_widget + "']").length) {
            $("<script type='text/javascript' src='" + twitter_widget + "'></script>").appendTo('body');
        }
    }

    Hish.prototype.show = function(x, y) {
        x = x - 40;
        y = y - 20 - 40;
        $("#hish-share-wrapper").css({
            top: y + 'px',
            left: x + 'px'
        });
        $("#hish-share-wrapper").fadeIn(100);
    }

    Hish.prototype.hide = function() {
        $("#hish-share-wrapper").fadeOut(100);
    }

    Hish.prototype.checkTextSelection = function(popover) {
        var selected_text = "";
        if (typeof window.getSelection != "undefined") {
            selected_text = window.getSelection().toString();
        } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
            selected_text = document.selection.createRange().text;
        }

        if (selected_text && selected_text.length > 0) {
            // find the bounding box of the highlighted text
            var rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
            var y = rect.bottom - rect.height + document.body.scrollTop + 6;
            var x = rect.left + rect.width / 2 + document.body.scrollLeft;
            popover.show(x, y);
        } else {
            popover.hide();
        }
    }

    var old = $.fn.hish
    $.fn.hish = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('hish')
            var options = typeof option == 'object' && option

            if (!data) $this.data('hish', (data = new Hish(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }
    $.fn.hish.Constructor = Hish

}(window.jQuery);