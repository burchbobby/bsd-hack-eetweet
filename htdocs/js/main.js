jQuery.noConflict();

function prepInputs(){
	jQuery('input, textarea').placeholder()
		.filter('[type="text"], [type="email"], [type="tel"], [type="password"]').addClass('text').end()
		.filter('[type="checkbox"]').addClass('checkbox').end()
		.filter('[type="radio"]').addClass('radiobutton').end()
		.filter('[type="submit"]').addClass('submit').end()
		.filter('[type="image"]').addClass('buttonImage');
}

jQuery(document).ready(function($) {
    prepInputs();

    // display share and tweet boxes in popup window
    $('.sharer-tw').click(function(e) {
        var $target = $(e.currentTarget),
            tweet = $target.data('tweet'),
            url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet);

        e.preventDefault();
        window.open(url, 'tweet', 'width=500,height=384,menubar=no,status=no,toolbar=no');
    });

    $('.sharer-fb').click(function(e) {
        var $target = $(e.currentTarget),
            fbLink = $target.data('fblink'),
            url = 'http://www.facebook.com/share.php?u=' + encodeURIComponent(fbLink);

        e.preventDefault();
        window.open(url, 'share', 'width=500,height=300,menubar=no,status=no,toolbar=no');
    });

});