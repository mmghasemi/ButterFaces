(function ($) {

    $.fn.tooltip = function () {
        return this.each(function () {
            var root = $(this);
            var valueElement = root.find("input, .butter-component-readonly-value");
            var tooltip = root.find(".butter-component-tooltip");

            if (tooltip.length > 0) {
                var _positionTooltip = function () {
                    var tooltipWidth = tooltip.outerWidth();
                    var winWidth = $(window).width();

                    if (root.offset().left + root.outerWidth() + tooltipWidth < winWidth) {
                        // try position right
                        tooltip.css({
                            position: "absolute",
                            top: 0,
                            left: root.outerWidth(),
                            zIndex: 1000
                        });
                    } else {
                        // try position at bottom
                        tooltip.css({
                            position: "absolute",
                            bottom: tooltip.outerHeight() * -1,
                            right: 0,
                            zIndex: 1000
                        });
                    }

                };

                var _hideTooltip = function () {
                    tooltip.addClass("butter-component-tooltip-hidden");
                    tooltip.removeClass("butter-component-tooltip-shown");
                    tooltip.data("tooltip-visible", false);
                    tooltip.attr("style", null);
                    //$(window).off("resize");
                };

                var _showTooltip = function () {
                    if (!tooltip.data("tooltip-visible")) {
                        tooltip.removeClass("butter-component-tooltip-hidden");
                        tooltip.addClass("butter-component-tooltip-shown");
                        _positionTooltip();
                        tooltip.data("tooltip-visible", true);
                        //$(window).on("resize", _positionTooltip);
                    }
                };

                valueElement
                    .mouseenter(function () {
                        _showTooltip();
                    })
                    .mouseleave(function () {
                        if (!tooltip.data("tooltip-permanent")) {
                            _hideTooltip();
                        }
                    })
                    .focus(function () {
                        tooltip.data("tooltip-permanent", true);
                        _showTooltip();
                    })
                    .blur(function () {
                        tooltip.data("tooltip-permanent", false);
                        _hideTooltip();
                    });
            }
        });
    };
}(jQuery));