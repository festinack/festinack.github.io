/********************************/
// ThShopManiaWooLib Custom Function
/********************************/
(function ($) {
    var ThShopManiaWooLib = {
        init: function (){
            this.bindEvents();
        },
        bindEvents: function (){
            var $this = this;
            $this.OffCanvas();
            $this.sticky_header();
            $this.sticky_footer();
            $this.singleProduct();
            if (th_shop_mania.th_shop_mania_checkout_page_layout == 'stepped') {
            $this.stepped_checkout_page();
        }
            $this.MobilenavBar();
            $this.popup_login();
          },
         popup_login: function () {
            let wrapperpopup = jQuery('.thsm-popup-simple');
            if (wrapperpopup.length) {
               jQuery(".thunk-icon-market .account").on("click", function(event){
                  event.preventDefault();
                  jQuery('.thsm-popup-simple,.thsm-popup-header .col-1,#customer_login .u-column1').addClass("active");
                });

               jQuery(".thsm-popup-simple .overlay,.thsm-popup-content .close").on("click", function(event){
                  event.preventDefault();
                  jQuery('.thsm-popup-simple, .u-columns > div,.thsm-popup-header .col-2').removeClass("active");
                }); 

                } 

               jQuery(".thsm-popup-header a").on("click", function(event){
                  event.preventDefault();
                  let $this = this;
                  jQuery('.thsm-popup-header a').removeClass("active");
                  let getcolTab = jQuery($this).addClass("active").data("col");
                  jQuery('.u-columns > div').removeClass("active");
                  jQuery('.u-columns > div.'+getcolTab).addClass("active");
            
                }); 

    jQuery(document).ready(function () {
        if(jQuery('.thsm-acc-popup2').length){  
        jQuery(".thsm-acc-popup2 .thunk-icon-market > .account ,.thsm-acc-popup2 .thsm-popup-simple").on({
            mouseenter: function () {
            jQuery('.thsm-popup-simple,.thsm-popup-header .col-1,#customer_login .u-column1').addClass("active");
            },
            // mouseleave: function () {         
            // jQuery('.thsm-popup-simple, .u-columns > div,.thsm-popup-header .col-2').removeClass("active");
            // }
        }); 
    }
    //Close when click outside of it thsm-popup-simple Popup-2 active
    if(jQuery('.thsm-acc-popup2').length){  
        jQuery(document).on("click", function(e){
            if (jQuery(e.target).closest(".thsm-popup-simple").length
                        === 0) {
                jQuery('.thsm-popup-simple, .u-columns > div,.thsm-popup-header .col-2').removeClass("active");
            }
        }); 
    }

    });
    // Standard Layout    
    if(jQuery('.woocommerce-account.thsm-acc-standard').length){  
   jQuery('.woocommerce-account.thsm-acc-standard .desktop-main-header .logo-content').prependTo('.woocommerce-account.thsm-acc-standard .entry-content > .woocommerce');
   jQuery('.thsm-popup-header .col-1,#customer_login .u-column1').addClass("active");
    }    
        },

        OffCanvas: function () {
                   var off_canvas_wrapper = $( '.th-shop-mania-off-canvas-sidebar-wrapper');
                   var opn_shop_offcanvas_filter_close = function(){
                  $('html').css({
                       'overflow': '',
                       'margin-right': '' 
                     });
                  $('html').removeClass( 'th-shop-mania-enabled-overlay' );
                 };
                 var trigger_class = 'off-canvas-button';
                 if( 'undefined' != typeof ThShopMania_Off_Canvas && '' != ThShopMania_Off_Canvas.off_canvas_trigger_class ){
                       trigger_class = ThShopMania_Off_Canvas.off_canvas_trigger_class;
                 }
                 $(document).on( 'click', '.' + trigger_class, function(e){
                        e.preventDefault();
                       var innerWidth = $('html').innerWidth();
                       $('html').css( 'overflow', 'hidden' );
                       var hiddenInnerWidth = $('html').innerWidth();
                       $('html').css( 'margin-right', hiddenInnerWidth - innerWidth );
                       $('html').addClass( 'th-shop-mania-enabled-overlay' );
                 });

                off_canvas_wrapper.on('click', function(e){
                   if ( e.target === this ) {
                     opn_shop_offcanvas_filter_close();
                     }
                });

                off_canvas_wrapper.find('.menu-close').on('click', function(e) {
                 opn_shop_offcanvas_filter_close();
               });

             },

             sticky_header: function () {
                    if(th_shop_mania.th_shop_mania_sticky_header_effect=='scrldwmn'){
                    var position = jQuery(window).scrollTop(); 
                    var $headerBar = jQuery('header').height();
                    // should start at 0
                    jQuery(window).scroll(function() {
                        var scroll = jQuery(window).scrollTop();
                        if(scroll > position || scroll < $headerBar) {
                        jQuery(".sticky-header").removeClass("stick");
                        }else{
                        jQuery(".sticky-header").addClass("stick");
                        }
                        position = scroll;
                    });
                  }else{
                      jQuery(document).on("scroll", function(){
                      var $headerBar = jQuery('header').height();
                        if(jQuery(document).scrollTop() > $headerBar){
                            jQuery(".sticky-header").addClass("stick");
                          }else{
                            jQuery(".sticky-header").removeClass("stick");
                        } 
                       });
                  }
        },

        sticky_footer : function () {
            /******************/
              // Sticky footer
            /******************/
            if(jQuery('body').hasClass('alm-stick-ftr')){
            var $footerBar = jQuery("footer.thsm-footer").height();
            jQuery("#content,header+div").css('margin-bottom',$footerBar +'px');
            }

          },
          singleProduct: function () {
           $(document).ready(function(){

            let galleryType  = th_shop_mania.th_shop_mania_single_product_slider_type;
            if (galleryType != 'grid' ) {
            var verticalTypeSlider = false;
            var thumbClass = $('.single-product .flex-control-thumbs');
             if (galleryType == 'verticallightboxslide' || galleryType == 'lightboxslide') {
                    jQuery(thumbClass).children('li').addClass('woocommerce-product-gallery__trigger');
                }
                if (galleryType == 'verticalslide' || galleryType == 'verticallightboxslide') {
                    verticalTypeSlider = true;
                }
                     jQuery('.flex-control-thumbs').slick({
                   infinite: true,
                      slidesToShow: 4,
                      slidesToScroll: 1,
                      speed: 900,
                      vertical: verticalTypeSlider,
                      verticalSwiping: verticalTypeSlider,
                      infinite: false,
                      arrows: true,
                      prevArrow:'<button type="button" class="slick-prev th-icon th-icon-angle-left"></button>',
                      nextArrow: '<button type="button" class="slick-next th-icon th-icon-angle-right"></button>',
                      responsive: [
                        {
                          breakpoint: 767,
                          settings: {
                             vertical: false,
                             verticalSwiping: false,
                          }
                        },
                        // You can unslick at a given breakpoint now by adding:
                        // settings: "unslick"
                        // instead of a settings object
                            ]
                });



            }

            });
        },

        MobilenavBar:function(){
                 //show ,hide
                        jQuery(window).scroll(function (){
                          if(jQuery(window).width() <= 767 && jQuery(this).scrollTop() > 160){
                            jQuery('#th-shop-mania-mobile-bar').addClass('active').removeClass('hiding');
                             if(jQuery(window).scrollTop() + jQuery(window).height() == jQuery(document).height()) {
                                  jQuery('#th-shop-mania-mobile-bar').removeClass('active');
                                }
                          }else{
                            jQuery('#th-shop-mania-mobile-bar').removeClass('active').addClass('hiding');
                          }

                        });
                   },

        stepped_checkout_page : function () {
             (function () {
                        if (!document.body.classList.contains("thsm-checkout-layout-stepped")) return !1;
                        const t = document.querySelectorAll(".thsm-checkout-step");
                        for (let e = 0; e < t.length; e++)
                            t[e].addEventListener("click", function (t) {
                                t.preventDefault(), Thsm_Step(this);
                            });
                        const e = document.querySelectorAll(".next-step-button-wrapper .button");
                        for (let n = 0; n < t.length; n++)
                            void 0 !== e[n] &&
                                e[n].addEventListener("click", function (t) {
                                    t.preventDefault(), Thsm_Step(this), document.getElementById("content").scrollIntoView(false);
                                });
                    })();
                    function Thsm_Step(t) {
                const e = document.querySelectorAll(".thsm-checkout-step"),
                    n = t.dataset.step;
                let o = 2;
                const i = document.querySelector("form.woocommerce-checkout");
                i && i.classList.add(n), (o = "billing" === n ? 0 : "review" === n ? 1 : 2);
                for (let t = 0; t < e.length; t++) e[t].classList.remove("active"), t <= o && e[t].classList.add("active");
                const customerDetail = document.getElementById("customer_details"),
                    bilLing = document.querySelector(".next-step-button-wrapper.billing"),
                    shopTable = document.querySelector(".shop_table"),
                    reView = document.querySelector(".next-step-button-wrapper.review"),
                    payment = document.getElementById("payment"),
                    city = document.getElementById("billing_city_field"),
                    country = document.getElementById("billing_country_field"),
                    adress1 = document.getElementById("billing_address_1_field"),
                    address2 = document.getElementById("billing_address_2_field"),
                    state = document.getElementById("billing_state_field"),
                    postcode = document.getElementById("billing_postcode_field"),
                    aclo2 = document.querySelector(".col-2"),
                    fname = document.getElementById("billing_first_name_field"),
                    lname = document.getElementById("billing_last_name_field"),
                    mobi = document.getElementById("billing_phone_field"),
                    email = document.getElementById("billing_email_field"),
                    company = document.getElementById("billing_company_field");

                "billing" === n && ((city.style.display = "none"), (country.style.display = "none"), (adress1.style.display = "none"), (address2.style.display = "none"), (state.style.display = "none"), (postcode.style.display = "none"), (aclo2.style.display = "none"), (payment.style.display = "none"), (bilLing.style.display = "block"), (mobi.style.display = "block"), (fname.style.display = "block"), (lname.style.display = "block"), (email.style.display = "block"), (company.style.display = "block"), (shopTable.style.display = "none"), (reView.style.display = "none")),
                "review"  === n && ((city.style.display = "block"), (country.style.display = "block"), (adress1.style.display = "block"), (address2.style.display = "block"), (state.style.display = "block"), (postcode.style.display = "block"), (aclo2.style.display = "block"), (bilLing.style.display = "none"), (payment.style.display = "none"), (mobi.style.display = "none"), (fname.style.display = "none"), (lname.style.display = "none"), (email.style.display = "none"), (company.style.display = "none"), (shopTable.style.display = "none"), (reView.style.display = "block")),
                "payment" === n && ((city.style.display = "none"), (country.style.display = "none"), (adress1.style.display = "none"), (address2.style.display = "none"), (state.style.display = "none"), (postcode.style.display = "none"), (aclo2.style.display = "none"), (shopTable.style.display = "table"), (reView.style.display = "none"), (bilLing.style.display = "none"), (payment.style.display = "block"), (mobi.style.display = "none"), (fname.style.display = "none"), (lname.style.display = "none"), (email.style.display = "none"), (company.style.display = "none"));
            }
// jQuery('#billing_city_field').attr('style', 'display: none !important');
            if(!(jQuery('.thsm-checkout-step.step-review.active').length && (!jQuery('.thsm-checkout-step.step-payment.active').length))){   
              const myTimeout = setTimeout(billingInitial, 700);      
            }
            
            function billingInitial() {
  jQuery('#billing_address_1_field,#billing_address_2_field,#billing_city_field,#billing_state_field,#billing_postcode_field').attr('style', 'display: none!important');
}
          },
        
       
      }
    ThShopManiaWooLib.init();
})(jQuery);