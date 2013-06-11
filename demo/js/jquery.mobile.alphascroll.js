/*global jQuery */
/*jslint nomen: false */
(function ($) {"use strict";
    $.widget("mobile.listview", $.mobile.listview, {
        options: {
            alphascroll: false
        },

        _afterListviewRefresh: function () {
            var el = this.element;
            this._off(el, "listviewafterrefresh");
            this._displayList();
            this.refresh();
            this._on(el, {
                listviewafterrefresh: "_afterListviewRefresh"
            });
        },

        _displayList: function () {
            var self = this.element, alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'], shortAlphabet = ['a', 'd', 'g', 'j', 'm', 'p', 's', 'w', 'z'], dividers = [], dividerClass, scrollbar = '';
            $(self).unwrap();
            $('.alphascroll').remove();
            //
            // content = this.content
            //
            // // attach classes to list autodividers
            $(this.element).find('.ui-li-divider').each(function () {
                dividerClass = $(this).html().toLowerCase();
                dividers.push(dividerClass);
                $(this).addClass(dividerClass);
            });
            //
            // // create and display the scrollbar
            function truncateScrollbar () {
                $('.alphascroll li').each(function (index, value) {
                    if ($.inArray($(this).html().toLowerCase(), shortAlphabet) < 0) {
                        $(this).html('&#183;').addClass('truncated');
                    }
                });
            }

            // do the scroll
            function findclosest (target) {
                var after = true, currentalpha, finalalpha;
                $($('.alphascroll-item').get().reverse()).each(function () {
                    if (finalalpha === undefined) {
                        var scroll_id = $(this).attr('id'), letter = scroll_id.split('-')[1];
                        if (letter === target) {
                            if (currentalpha !== undefined) {
                                finalalpha = currentalpha;
                            }
                             if ($('.' + letter).size() > 0){
                                 finalalpha = letter;
                             }
                            after = false;
                        }
                        else if (after) {
                            if ($('.' + letter).size() > 0) {
                                currentalpha = letter;
                            }
                        }
                        else {
                            if ($('.' + letter).size() > 0) {
                                finalalpha = letter;
                            }
                        }
                    }
                });

                return $('.' + finalalpha);
            }

            function alphaScroll (y) {
                $('.alphascroll-item').each(function () {

                    if (!(y <= $(this).offset().top || y >= $(this).offset().top + $(this).outerHeight())) {
                        var scroll_id = $(this).attr('id'), letter = scroll_id.split('-'), target = findclosest(letter[1]), position = target.position(), header_height;
                        // offset scroll-top if header is displayed
                        if ($('.ui-page-active [data-role="header"]').hasClass('ui-fixed-hidden')) {
                            header_height = 0;
                        }
                        else {
                            header_height = $('.ui-page-active [data-role="header"]').height();
                        }
                        if (position !== undefined) {
                            // scroll the page
                            $.mobile.silentScroll(position.top - header_height);
                        }
                    }
                });
            }

            function createScrollbar () {
                var wrapper, alphascroll, selfdatatheme = $(self).attr("data-theme");
                // generate scrollbar HTML
                $(alphabet).each(function (index, value) {
                    // attach the alphascroll-item class to each letter if there is a corresponding divider (acts as a link)

                        scrollbar += '<li id="alphascroll-' + value + '" class="alphascroll-item" unselectable="on">' + value.toUpperCase() + '</li>';

                });

                // attach scrollbar to page
                $(self).wrap('<div />');
                wrapper = self.parent();

                $(wrapper).prepend('<ul class="alphascroll">' + scrollbar + '</ul>');
                alphascroll = $(self).closest('div').children('.alphascroll').addClass("ui-alphascroll-" + (selfdatatheme !== undefined && selfdatatheme !== '' ? selfdatatheme : 'a'));
                // bind touch event to scrollbar (for touch devices)
                $(alphascroll).bind('touchmove', function (event) {
                    event.preventDefault();
                    var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
                    // scroll to divider position
                    alphaScroll(touch.pageY);
                });

                $(alphascroll).bind('tap', function (event) {
                    event.preventDefault();

                    // scroll to divider position
                    alphaScroll(event.pageY);
                });

                // bind mouse events to scrollbar (for desktop browsers)
                $(alphascroll).bind('mousedown', function () {
                    $('.ui-page-active').bind('mousemove', function (event) {
                        // prevent text selection while scrolling
                        $(this).css({
                            "-webkit-user-select": "none",
                            "-moz-user-select": "none",
                            "-ms-user-select": "none",
                            "user-select": "none"
                        });
                        // scroll to divider position
                        alphaScroll(event.pageY);
                    });

                    // return page to normal functioning after mouseup
                    $('.ui-page-active').bind('mouseup', function () {
                        // release mousemove event control
                        $('.ui-page-active').unbind('mousemove');
                        // return text selection to default
                        $(this).css({
                            "-webkit-user-select": "text",
                            "-moz-user-select": "text",
                            "-ms-user-select": "text",
                            "user-select": "text"
                        });
                    });
                });

                // use short scrollbar if screen is short (like landscape on an iPhone)
                if ($(window).height() <= 320) {
                    truncateScrollbar();
                }
            }

            // handle orientation changes
            $(window).bind('orientationchange', function () {
                $('.alphascroll').unwrap().remove();
                scrollbar = '';
                createScrollbar();
            });

            // generate scrollbar on invokation
            createScrollbar();
        },

        _create: function () {
            this._super();

            if (!this.options.alphascroll) {
                return;
            }

            this._afterListviewRefresh();
        }
    });

})(jQuery);

/*jslint nomen: true */
