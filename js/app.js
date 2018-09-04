 (function(window, document) {
        var currentPosition = 0;
        var app = {
            init: function() {
                document.addEventListener('DOMContentLoaded', function() {
                    app.bindTouchEvent();
                }.bind(app), false);
            }(),
            transform: function(translate) {
                this.style.webkitTransform = "translate3d(" + translate + "px,0,0)";
                currentPosition = translate;

            },
            bindTouchEvent: function() {
                var viewport = document.querySelector('#viewport');
                var maxWidth = -811;
                var startX, startY;
                var initialPos = 0;
                var moveLength = 0;
                var isMove = false;
                var isTouchEnd = true;
                viewport.addEventListener("touchstart", function(e) {
                    e.preventDefault();
                    if (e.touches.length === 1 || isTouchEnd) {
                        var touch = e.touches[0];
                        startX = touch.pageX;
                        startY = touch.pageY;
                        initialPos = currentPosition;

                        viewport.style.webkitTransition = "";
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

                    }

                }.bind(this), false);
                viewport.addEventListener("touchend", function(e) {
                    e.preventDefault();
                    var translate = 0;
                    if (isMove && !isTouchEnd) {
                        isTouchEnd = true;
                        viewport.style.webkitTransition = "0.3s ease -webkit-transform";
                        translate = currentPosition > 0 ? 0 : (currentPosition < maxWidth ? maxWidth : currentPosition);
                        this.transform.call(viewport, translate);
                    }
                }.bind(this), false);
            }
        }
    })(window, document);
