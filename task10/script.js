(function ($) {

    $.fn.customTabs = function (options) {

        let settings = $.extend({
            activeClass: "active",
            animationSpeed: 300,
            defaultTab: 0
        }, options);

        return this.each(function () {

            let $tabContainer = $(this);
            let $tabItems = $tabContainer.find("li");
            let $contents = $tabContainer.closest(".tabs-container")
                                         .find(".tab-content");

            function showTab(index) {

                $tabItems.removeClass(settings.activeClass);
                $tabItems.eq(index).addClass(settings.activeClass);

                $contents.hide();

                let tabId = $tabItems.eq(index).data("tab");
                $("#" + tabId).fadeIn(settings.animationSpeed);

                if (window.location.hash !== "#" + tabId) {
                    window.location.hash = tabId;
                }
            }

            function getInitialIndex() {

                let hash = window.location.hash.substring(1);

                if (hash) {
                    let index = $tabItems.filter(`[data-tab="${hash}"]`).index();
                    if (index >= 0) {
                        return index;
                    }
                }

                return settings.defaultTab;
            }

            showTab(getInitialIndex());

            $tabItems.on("click", function (e) {
                e.preventDefault();
                let index = $(this).index();
                showTab(index);
            });

            $(document).on("keydown", function (e) {

                let currentIndex = $tabItems.index(
                    $tabContainer.find("." + settings.activeClass)
                );

                if (e.key === "ArrowRight") {
                    let nextIndex = (currentIndex + 1) % $tabItems.length;
                    showTab(nextIndex);
                }

                if (e.key === "ArrowLeft") {
                    let prevIndex = (currentIndex - 1 + $tabItems.length) % $tabItems.length;
                    showTab(prevIndex);
                }
            });

        });
    };

})(jQuery);