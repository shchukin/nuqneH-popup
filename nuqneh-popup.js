(function($) {

    $(function() {


        /*
         * Page lock
         */

        var documentWidthWithScroll = 0;
        var documentWidthWithoutScroll = 0;
        var documentScrollWidth = 0;
        var currentHtmlPadding = 0;

        var $html = $('html');


        function lockPage() {

            if ( ! $html.hasClass('locked') ) {
                documentWidthWithScroll = $(window).width();
                currentHtmlPadding = parseInt( $html.css('padding-right'), 10 );
                $html.addClass('locked');
                documentWidthWithoutScroll = $(window).width();
                documentScrollWidth = documentWidthWithoutScroll - documentWidthWithScroll;
                $html.css( 'padding-right', (currentHtmlPadding + documentScrollWidth) + 'px' );
                console.log( documentWidthWithoutScroll );
            }
        }

        function unlockPage() {
            if ( $html.hasClass('locked') ) {
                $html.css( 'padding-right', '' );
                $html.removeClass('locked');
            }
        }




        /*
         * Popup
         */

        function popupShow(popup){
            lockPage();
            popup.fadeIn();
        }


        function popupHide(popup){
            if( ! popup ) {               //in case of Esc or something
                popup = $('.gl-popup');
            }

            popup.fadeOut(300,function(){ //hide popup THAN show page
                unlockPage();
            });

        }



        /* show popup by handler click */

        $('[data-popup]').on('click', function(event){
            event.preventDefault();
            popupShow( $($(this).data('popup')) );
        });


        /* hide popup by window close click */

        $('.gl-popup__container__viewport__slot__close').on('click', function(event){
            event.preventDefault();
            popupHide( $(this).parents('.gl-popup') );
        });


        /* hide popup by overlay click */

        $('.gl-popup__container__overlay').on('click', function(){
            popupHide( $(this).parents('.gl-popup') );
        });


        /* hide popup by Esc push */

        $(document).on('keyup', function(event) {
            if (event.keyCode == 27) {
                popupHide();
            }
        });

    });


})(jQuery);

