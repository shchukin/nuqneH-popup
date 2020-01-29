(function($) {
    $(function() {



        /*
         * Page lock
         */

        var documentWidthWithScroll = 0;
        var documentWidthWithoutScroll = 0;
        var scrollWidth = 0;

        var $html = $('html');


        function lockPage() {
            if ( ! $html.hasClass('html-lock') ) {
                documentWidthWithScroll = $(window).width();
                $html.addClass('html-lock');
                documentWidthWithoutScroll = $(window).width();
                $html.css( 'padding-right', (documentWidthWithoutScroll - documentWidthWithScroll) + 'px' );
            }
        }

        function unlockPage() {
            if ( $html.hasClass('html-lock') ) {
                $html.css( 'padding-right', '' );
                $html.removeClass('html-lock');
            }
        }



        /*
         * Popup
         */

        function popupShow(popup){
            lockPage();
            popup.fadeIn();
            popup.scrollTop(0);
        }

        function popupHide(popup){
            if( ! popup ) {                //in case of Esc or something
                popup = $('.popup');
            }

            popup.fadeOut(300,function(){  //hide popup THAN unlock page
                unlockPage();
            });
        }

        /* show popup by handler click */

        $('[data-popup-handler]').on('click', function(event){
            event.preventDefault();
            popupShow( $($(this).attr('href')) );
        });


        /* hide popup by window close click */

        $('[data-close-popup]').on('click', function(event){
            event.preventDefault();
            popupHide( $(this).parents('.popup') );
        });


        /* hide popup by overlay click ( goo.gl/SJG2Hw ) */

        $('.popup').on('click', function(event) {
            if (!$(event.target).closest('.popup__slot').length) {
                popupHide( $('.popup') );
            }
        });


        /* hide popup by Esc press */

        $(document).on('keyup', function(event) {
            if (event.keyCode == 27) {
                popupHide();
            }
        });

    });
})(jQuery);

