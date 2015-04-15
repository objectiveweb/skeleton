

jQuery(function($) {

    $.AdminLTE = {};

    $.AdminLTE.options = {
        screenSizes: {
            xs: 480,
            sm: 768,
            md: 992,
            lg: 1200
        }
    };

    /* PushMenu()
     * ==========
     * Adds the push menu functionality to the sidebar.
     *
     * @type Function
     * @usage: $.AdminLTE.pushMenu("[data-toggle='offcanvas']")
     */
    $.AdminLTE.pushMenu = function (toggleBtn) {
        //Get the screen sizes
        var screenSizes = this.options.screenSizes;
        var $body = $('body');

        //Enable sidebar toggle
        $(toggleBtn).click(function (e) {
            e.preventDefault();

            //Enable sidebar push menu
            if ($(window).width() > (screenSizes.sm - 1)) {
                $body.toggleClass('sidebar-collapse');
            }
            //Handle sidebar push menu for small screens
            else {
                if ($body.hasClass('sidebar-open')) {
                    $body.removeClass('sidebar-open');
                    $body.removeClass('sidebar-collapse')
                } else {
                    $body.addClass('sidebar-open');
                }
            }
        });

        $(".content-wrapper").click(function () {
            //Enable hide menu when clicking on the content-wrapper on small screens
            if ($(window).width() <= (screenSizes.sm - 1) && $body.hasClass("sidebar-open")) {
                $body.removeClass('sidebar-open');
            }
        });

    };

    $.AdminLTE.layout = {
        fix: function () {
            //Get window height and the wrapper height
            var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
            var window_height = $(window).height();
            var sidebar_height = $(".sidebar").height();
            //Set the min-height of the content and sidebar based on the
            //the height of the document.
            if ($("body").hasClass("fixed")) {
                $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
            } else {
                if (window_height >= sidebar_height) {
                    $(".content-wrapper, .right-side").css('min-height', window_height - neg);
                } else {
                    $(".content-wrapper, .right-side").css('min-height', sidebar_height);
                }
            }
        }
    };

    /* Tree()
     * ======
     * Converts the sidebar into a multilevel
     * tree view menu.
     *
     * @type Function
     * @Usage: $.AdminLTE.tree('.sidebar')
     */
    $.AdminLTE.tree = function (menu) {
        var _this = this;

        $(menu).on('click', 'li a',function (e) {
            //Get the clicked link and the next element
            var $this = $(this);
            var checkElement = $this.next();

            //Check if the next element is a menu and is visible
            if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
                //Close the menu
                checkElement.slideUp('normal', function () {
                    checkElement.removeClass('menu-open');
                    //Fix the layout in case the sidebar stretches over the height of the window
                    //_this.layout.fix();
                });
                checkElement.parent("li").removeClass("active");
            }
            //If the menu is not visible
            else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                //Get the parent menu
                var parent = $this.parents('ul').first();
                //Close all open menus within the parent
                var ul = parent.find('ul:visible').slideUp('normal');
                //Remove the menu-open class from the parent
                ul.removeClass('menu-open');
                //Get the parent li
                var parent_li = $this.parent("li");

                //Open the target menu and add the menu-open class
                checkElement.slideDown('normal', function () {
                    //Add the class active to the parent li
                    checkElement.addClass('menu-open');
                    parent.find('li.active').removeClass('active');
                    parent_li.addClass('active');
                    //Fix the layout in case the sidebar stretches over the height of the window
                    _this.layout.fix();
                });
            }
            //if this isn't a link, prevent the page from being redirected
            if (checkElement.is('.treeview-menu')) {
                e.preventDefault();
            }
        });
    };

    /* BoxWidget
     * =========
     * BoxWidget is plugin to handle collapsing and
     * removing boxes from the screen.
     *
     * @type Object
     * @usage $.AdminLTE.boxWidget.activate()
     *        Set all of your option in the main $.AdminLTE.options object
     */
    $.AdminLTE.boxWidget = {
        activate: function () {
            var _this = this;
            //Listen for collapse event triggers
            $('[data-widget="collapse"]').click(function (e) {
                e.preventDefault();
                _this.collapse($(this));
            });

            //Listen for remove event triggers
            $('[data-widget="remove"]').click(function (e) {
                e.preventDefault();
                _this.remove($(this));
            });
        },
        collapse: function (element) {
            //Find the box parent
            var box = element.parents(".box").first();
            //Find the body and the footer
            var bf = box.find(".box-body, .box-footer");
            if (!box.hasClass("collapsed-box")) {
                //Convert minus into plus
                element.children(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
                bf.slideUp(300, function () {
                    box.addClass("collapsed-box");
                });
            } else {
                //Convert plus into minus
                element.children(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
                bf.slideDown(300, function () {
                    box.removeClass("collapsed-box");
                });
            }
        },
        remove: function (element) {
            //Find the box parent
            var box = element.parents(".box").first();
            box.slideUp();
        }
    };


    // init

    $.AdminLTE.pushMenu("[data-toggle='offcanvas']");
    $.AdminLTE.tree('.sidebar');
});