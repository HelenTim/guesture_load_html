(function(window, document) {
    var currentPosition = 0;
    var currentPoint = -1;
    var pageNow = 1;
    var points = null;

    var app = {
        init: function() {
            document.addEventListener('DOMContentLoaded', function() {
                points = document.querySelectorAll('.pageview');
                app.bindTouchEvent();
            }.bind(app), false);
        }(),
        transform: function(translate) {
            this.style.webkitTransform = "translate3d(" + translate + "px,0,0)";
            currentPosition = translate;

        },
        bindTouchEvent: function() {
            var viewport = document.querySelector('#viewport');
            // var pageWidth = parseFloat(window.getComputedStyle(viewport, null).width) / points.length;
            // var maxWidth = -pageWidth * (points.length - 1);
            var maxWidth = -1000;
            var startX, startY;
            var initialPos = 0;
            var moveLength = 0;
            var direction = "left";
            var isMove = false;
            var startT = 0;
            var isTouchEnd = true;
            document.addEventListener("touchstart", function(e) {
                e.preventDefault();
                if (e.touches.length == 1 || isTouchEnd) {
                    var touch = e.touches[0];
                    startX = touch.pageX;
                    startY = touch.pageY;
                    initialPos = currentPosition;

                    viewport.style.webkitTransition = "";
                    // startT = new Date().getTime();
                    isMove = false;
                    isTouchEnd = false;
                }
            }.bind(this), false);
            document.addEventListener("touchmove", function(e) {
                e.preventDefault();
                if (isTouchEnd) return;
                var touch = e.touches[0];
                var deltaX = touch.pageX - startX;
                var deltaY = touch.pageY - startY;
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    moveLength = deltaX;
                    console.log(moveLength);
                    var translate = initialPos + deltaX;
                    this.transform.call(viewport, translate);
                    isMove = true;

                    direction = deltaX > 0 ? "right" : "left";
                }

            }.bind(this), false);
            document.addEventListener("touchend", function(e) {
                e.preventDefault();
                var translate = 0;
                // var deltaT = new Date().getTime() - startT;
                if (isMove && !isTouchEnd) {
                    isTouchEnd = true;
                    viewport.style.webkitTransition = "0.3s ease -webkit-transform";
                    translate = currentPosition > 0 ? 0 : (currentPosition < maxWidth ? maxWidth : currentPosition);
                    // if (deltaT < 300) {
                        // translate = direction == 'left' ?
                        //     currentPosition +  moveLength : currentPosition -  moveLength;
                        // translate = translate > 0 ? 0 : translate;
                        // translate = translate < maxWidth ? maxWidth : translate;
                    // } else {
                    //     // if (Math.abs(moveLength) / pageWidth < 0.5) {
                    //     //     translate = currentPosition - moveLength;
                    //     // } else {
                    //         translate = direction == 'left' ?
                    //             currentPosition - (pageWidth + moveLength) : currentPosition + pageWidth - moveLength;
                    //         translate = translate > 0 ? 0 : translate;
                    //         translate = translate < maxWidth ? maxWidth : translate;
                    //     // }
                    // }
                    this.transform.call(viewport, translate);
                    // pageNow = Math.round(Math.abs(translate) / pageWidth) + 1;
                }
            }.bind(this), false);
        }
    }
})(window, document);
