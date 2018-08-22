(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// Подключение Helpers function


// подключение анимаций для страниц


var _helper = require('./helper/helper.js');

var _indexPages = require('./model-animation/index-pages.js');

var _indexPages2 = _interopRequireDefault(_indexPages);

var _aboutUsPages = require('./model-animation/about-us-pages.js');

var _aboutUsPages2 = _interopRequireDefault(_aboutUsPages);

var _contextualPages = require('./model-animation/contextual-pages.js');

var _contextualPages2 = _interopRequireDefault(_contextualPages);

var _designPages = require('./model-animation/design-pages.js');

var _designPages2 = _interopRequireDefault(_designPages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Запуск необходимой анимации
var Animation = function () {
	function Animation() {
		_classCallCheck(this, Animation);

		this.IndexPageAnimation = new _indexPages2.default();
		this.AboutUsAnimation = new _aboutUsPages2.default();
		this.ContextualAnimation = new _contextualPages2.default();
		this.DesignPagesAnimation = new _designPages2.default();
	}

	_createClass(Animation, [{
		key: 'inisialization',
		value: function inisialization() {
			// Инициализация настроек анимаций
			if ((0, _helper.activePages)('main-pages')) {
				this.IndexPageAnimation.description();
			}
			if ((0, _helper.activePages)('about-us-pages')) {
				this.AboutUsAnimation.description();
			}
			if ((0, _helper.activePages)('contextual-pages')) {
				this.ContextualAnimation.description();
			}
			if ((0, _helper.activePages)('design-pages')) {
				this.DesignPagesAnimation.description();
			}
		}
	}, {
		key: 'play',
		value: function play() {
			//	Запуск анимация
			if ((0, _helper.activePages)('main-pages')) {
				this.IndexPageAnimation.start();
			}
			if ((0, _helper.activePages)('about-us-pages')) {
				this.AboutUsAnimation.start();
			}
			if ((0, _helper.activePages)('contextual-pages')) {
				this.ContextualAnimation.start();
			}
			if ((0, _helper.activePages)('design-pages')) {
				this.DesignPagesAnimation.start();
			}
		}
	}]);

	return Animation;
}();

function hovers() {

	TweenMax.set('.who_are_we_item_text', { scaleX: 0 });
	TweenMax.set('.who_are_we_item_img img', { scaleX: 1 });
	$('.who_are_we_item').hover(function () {

		var image = $(this).find('.who_are_we_item_img img');
		var text = $(this).find('.who_are_we_item_text');

		var inM = new TimelineMax();

		inM.to(image, 0.3, {
			scaleX: 0
		});
		inM.to(text, 0.3, {
			scaleX: 1
		}, "-=0.1");
	}, function () {

		var image = $(this).find('.who_are_we_item_img img');
		var text = $(this).find('.who_are_we_item_text');

		var outM = new TimelineMax();

		outM.add('lable', '+=0.20').to(text, 0.3, {
			scaleX: 0
		}, "lable");
		outM.add('lable', '+=0.05').to(image, 0.3, {
			scaleX: 1
		}, "lable");
	});
}

var anim = new Animation();

$(window).scroll(function () {
	if (document.documentElement.clientWidth >= 1200) {
		anim.play();
	}
});

$(window).ready(function () {
	hovers();

	if (document.documentElement.clientWidth >= 1200) {
		anim.play();
		anim.inisialization();
	}
});

},{"./helper/helper.js":2,"./model-animation/about-us-pages.js":3,"./model-animation/contextual-pages.js":4,"./model-animation/design-pages.js":5,"./model-animation/index-pages.js":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.activeSection = activeSection;
exports.activePages = activePages;
exports.getCookie = getCookie;
exports.setCookie = setCookie;
exports.rotationGear = rotationGear;
function activeSection(section) {
	var startTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	var startBotton = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


	section = '.' + section;
	if ($(section).offset() !== undefined) {
		var topPosition = $(section).offset().top - startTop,
		    bottomPosition = $(section).offset().top + $(section).height() - startBotton;
		if ($(window).scrollTop() >= topPosition && $(window).scrollTop() <= bottomPosition) {
			return true;
		}
	}
}

function activePages(className) {
	if ($('body').hasClass(className)) {
		return true;
	} else {
		return false;
	}
}

function getCookie(data) {
	var cookieArr = document.cookie.split(';');
	for (var i = 0; i < cookieArr.length; i++) {
		if (cookieArr[i].indexOf(data) >= 0) {
			return true;
		}
	}
}

function setCookie(data) {
	document.cookie = data;
}

function rotationGear(elements) {
	var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	var gearSmall = new TimelineMax();
	gearSmall.from(elements, 2, {
		rotation: 360 * direction,
		ease: Power0.easeNone
	});
	gearSmall.repeat(Infinity);
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = require('../helper/helper.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AboutUsAnimation = function () {
	function AboutUsAnimation() {
		_classCallCheck(this, AboutUsAnimation);

		if ((0, _helper.getCookie)('loader')) {
			this.headerTime = '+=1';
		} else {
			this.headerTime = '+=3';
		}

		//time line статический
		this.tl1 = new TimelineMax();
		this.tl2 = new TimelineMax();
		this.tl3 = new TimelineMax();
		this.tl4 = new TimelineMax();
		this.tl5 = new TimelineMax();
		this.tl6 = new TimelineMax();
		this.tl7 = new TimelineMax();
		this.tl8 = new TimelineMax();
		this.tl9 = new TimelineMax();
		this.tl10 = new TimelineMax();
		this.tl11 = new TimelineMax();

		//time line динамический
		this.arrow = new TimelineMax();

		//остановка time lines
		this.tl1.pause();
		this.tl2.pause();
		this.tl3.pause();
		this.tl4.pause();
		this.tl5.pause();
		this.tl6.pause();
		this.tl7.pause();
		this.tl8.pause();
		this.tl9.pause();
		this.tl10.pause();
		this.tl11.pause();
	}

	_createClass(AboutUsAnimation, [{
		key: 'description',
		value: function description() {
			var _this = this;

			//HEADER
			this.tl1.from('.header_top', 3, {
				y: 50,
				opacity: 0,

				ease: Power3.easeOut
			}, this.headerTime).from('.header_title', 3, {
				y: 50,
				opacity: 0,
				ease: Power3.easeOut
			}, '-=1.7').from('.header_bot_txt', 3, {
				y: 50,
				opacity: 0,
				ease: Power3.easeOut,
				onComplete: function onComplete() {
					_this.arrow.from('.header_bot_txt .fa-angle-down', 2, {
						ease: Power3.easeOut,
						y: -30 }).to('.header_bot_txt .fa-angle-down', 0.5, {
						y: -30
					});

					_this.arrow.resume();
				}
			}, '-=1.7');

			//	section 2
			this.tl2.from('.section-2 h2', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "+=0.5").from('.section-2 .title_block_left_decor ', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=0.5").staggerFrom('.section-2 .who_are_we_items .who_are_we_item ', 2, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, 0.02, "-=0.5").from('.section-2 .who_are_we_bottom_title ', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=0.5");

			// section 3
			this.tl3.from('.section-3 .title-wrap', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "+=0.5").from('.section-3 .img-container', 1, {
				y: -30,
				opacity: 0,
				scale: 0.95,
				rotation: 3,
				ease: Power3.easeOut
			}, "-=0.5");

			// section 4
			this.tl4.from('.section-4 .title-wrap', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "+=0.5").from('.section-4 .map-container ', 1, {
				x: -30,
				opacity: 0,
				scale: 0.95,
				rotation: 5,
				ease: Bounce.easeOut
			}, "-=0.5").from('.section-4 .contacts ', 1, {
				x: 50,
				opacity: 0,
				ease: Bounce.easeOut
			}, "-=0.7");

			// section 5
			this.tl5.from('.section-5 .title-wrap', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "+=0.5").from('.section-5 .unique_challenge_form ', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=0.5").from('.section-5 .social-links-container', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=0.5").staggerFrom('.section-5 .social-links-container li', 2, {
				x: 50,
				y: 10,
				opacity: 0,
				ease: Elastic.easeOut.config(1, 0.3)
			}, 0.1, '-=0.5');
		}
	}, {
		key: 'start',
		value: function start() {
			if ((0, _helper.activeSection)('section-1')) {
				this.tl1.play();
			}
			if ((0, _helper.activeSection)('section-2', 300, 500)) {
				this.tl2.play();
			}
			if ((0, _helper.activeSection)('section-3', 300, 500)) {
				this.tl3.play();
			}
			if ((0, _helper.activeSection)('section-4', 300, 500)) {
				this.tl4.play();
			}
			if ((0, _helper.activeSection)('section-5', 300, 500)) {
				this.tl5.play();
			}
		}
	}]);

	return AboutUsAnimation;
}();

exports.default = AboutUsAnimation;

},{"../helper/helper.js":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = require('../helper/helper.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContextualAnimation = function () {
	function ContextualAnimation() {
		_classCallCheck(this, ContextualAnimation);

		if ((0, _helper.getCookie)('loader')) {
			this.headerTime = '+=1';
		} else {
			this.headerTime = '+=3';
		}

		//time line статический
		this.tl1 = new TimelineMax();
		this.tl2 = new TimelineMax();
		this.tl3 = new TimelineMax();
		this.tl4 = new TimelineMax();
		this.tl5 = new TimelineMax();
		this.tl6 = new TimelineMax();
		this.tl7 = new TimelineMax();
		this.tl8 = new TimelineMax();
		this.tl9 = new TimelineMax();
		this.tl10 = new TimelineMax();
		this.tl11 = new TimelineMax();

		//time line динамический
		this.arrow = new TimelineMax();
		this.customNextBtn = new TimelineMax();
		this.customPrevBtn = new TimelineMax();

		//остановка time lines
		this.tl1.pause();
		this.tl2.pause();
		this.tl3.pause();
		this.tl4.pause();
		this.tl5.pause();
		this.tl6.pause();
		this.tl7.pause();
		this.tl8.pause();
		this.tl9.pause();
		this.tl10.pause();
		this.tl11.pause();
	}

	_createClass(ContextualAnimation, [{
		key: 'description',
		value: function description() {
			var _this = this;

			//HEADER
			this.tl1.from('.header_top', 3, {
				y: 50,
				opacity: 0,
				ease: Power3.easeOut
			}, this.headerTime).from('.header_title', 3, {
				y: 50,
				opacity: 0,
				ease: Power3.easeOut
			}, '-=1.7').from('.header-form', 3, {
				y: 50,
				opacity: 0,
				ease: Power3.easeOut,
				onComplete: function onComplete() {
					_this.arrow.from('.header_bot_txt .fa-angle-down', 2, {
						ease: Power3.easeOut,
						y: -30
					}).to('.header_bot_txt .fa-angle-down', 0.5, {
						y: -30
					});
					_this.arrow.repeat(Infinity);
				}
			}, '-=1.7');

			this.tl2.from('.section-2 h2', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "+=0.5").from('.section-2 .about-wrap', 1, {
				x: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=0.5").from('.section-2 .img-wrap', 1, {
				x: 30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=1").from('.section-2 h3', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=0.7").from('.section-2 .decore-scheme-wrap', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=0.7").from('.section-2 .decore-scheme-wrap .title-item-decore', 1, {
				y: 30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=0.7")

			//начало анимации шестеренок
			.from('.section-2 .decore-scheme-wrap .small', 1, {
				y: 20,
				opacity: 0,
				ease: Bounce.easeOut,
				rotation: -50,
				onComplete: function onComplete() {
					(0, _helper.rotationGear)('.decore-scheme-wrap .small span');
				}
			}, "-=0.5").from('.section-2 .decore-scheme-wrap .big', 1, {
				y: -20,
				opacity: 0,
				ease: Bounce.easeOut,
				rotation: 50,
				onComplete: function onComplete() {
					(0, _helper.rotationGear)('.decore-scheme-wrap .big span', -1);
				}
			}, "-=0.7")
			//конец анимации шестеренок

			.staggerFrom('.section-2 .decore-scheme-wrap .item', 1, {
				y: 30,
				opacity: 0,
				scaleY: 0.9,
				ease: Power3.easeOut
			}, 0.3, "-=1");

			this.tl3.from('.section-3 h2', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "+=0.5").from($('.section-3 .img-wrap:even'), 1, {
				x: -30,
				opacity: 0,
				ease: Bounce.easeOut
			}, "-=0.5").from($('.section-3 .img-wrap:odd'), 1, {
				x: 30,
				opacity: 0,
				ease: Bounce.easeOut
			}, "-=1").from('.section-3 .about-text-wrap', 1, {
				y: 30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=1").from('.section-3 .contextual-google-yandex-form', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=0.5");

			this.tl4.from('.section-4 .title-wrap', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "+=0.5").staggerFrom('.section-4 .internet-shop-goods-item', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, 0.03, "-=0.5").from('.section-4 .form-wrap', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=0.7");

			this.tl5.from('.section-5 .title-wrap', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "+=0.5")
			//начало анимации шестеренок
			.from('.section-5 .gear-1', 1, {
				y: 20,
				opacity: 0,
				ease: Bounce.easeOut,
				rotation: -50,
				onComplete: function onComplete() {
					(0, _helper.rotationGear)('.section-5 .gear-1');
				}
			}, "-=0.5").from('.section-5 .gear-2', 1, {
				y: -20,
				opacity: 0,
				ease: Bounce.easeOut,
				rotation: 50,
				onComplete: function onComplete() {
					(0, _helper.rotationGear)('.section-5 .gear-2', -1);
				}
			}, "-=0.7")
			// конец анимации шестеренок
			.staggerFrom('.section-5 .content ul li', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, 0.5, "-=0.5").staggerFrom('.section-5 .content ul .arrow', 1, {
				height: 0,
				opacity: 0,
				ease: Power3.easeOut
			}, 0.5, "-=2.7").staggerFrom('.section-5 .content ul .arrow', 0.5, {
				width: 0
			}, 0.5, "-=2.5").from('.section-5 .context-prise-wrap .decore-img', 1, {
				x: -10,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=1.5").from('.section-5 .context-prise-wrap .text', 1, {
				x: 10,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=1.3");

			this.tl6.from('.section-6 .title-wrap', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "+=0.5").from('.section-6 .carousel_wrap', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=0.5").from('.section-6 .carousel_txt_wrap ', 1, {
				y: 30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=1").from('.section-6 .customNextBtn', 2.5, {
				x: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=0.5").from('.section-6 .customPrevBtn', 2.5, {
				x: 30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=2.5");
			this.tl7.from('.section-7 h2', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "+=0.5").from('.section-7 p', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=0.5").from('.section-7 .unique_challenge_form', 1, {
				y: 30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=1");
		}
	}, {
		key: 'start',
		value: function start() {
			if ((0, _helper.activeSection)('section-1')) {
				this.tl1.play();
			}
			if ((0, _helper.activeSection)('section-2', 300, 500)) {
				this.tl2.play();
			}
			if ((0, _helper.activeSection)('section-3', 300, 500)) {
				this.tl3.play();
			}
			if ((0, _helper.activeSection)('section-4', 300, 500)) {
				this.tl4.play();
			}
			if ((0, _helper.activeSection)('section-5', 300, 500)) {
				this.tl5.play();
			}
			if ((0, _helper.activeSection)('section-6', 300, 500)) {
				this.tl6.play();
			}
			if ((0, _helper.activeSection)('section-7', 300, 500)) {
				this.tl7.play();
			}
		}
	}]);

	return ContextualAnimation;
}();

exports.default = ContextualAnimation;

},{"../helper/helper.js":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = require('../helper/helper.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DesignPagesAnimation = function () {
	function DesignPagesAnimation() {
		_classCallCheck(this, DesignPagesAnimation);

		if ((0, _helper.getCookie)('loader')) {
			this.headerTime = '+=1';
		} else {
			this.headerTime = '+=3';
		}

		//time line статический
		this.tl1 = new TimelineMax();
		this.tl2 = new TimelineMax();
		this.tl3 = new TimelineMax();
		this.tl4 = new TimelineMax();
		this.tl5 = new TimelineMax();
		this.tl6 = new TimelineMax();
		this.tl7 = new TimelineMax();
		this.tl8 = new TimelineMax();
		this.tl9 = new TimelineMax();
		this.tl10 = new TimelineMax();
		this.tl11 = new TimelineMax();

		//time line динамический
		this.arrow = new TimelineMax();

		//остановка time lines
		this.tl1.pause();
		this.tl2.pause();
		this.tl3.pause();
		this.tl4.pause();
		this.tl5.pause();
		this.tl6.pause();
		this.tl7.pause();
		this.tl8.pause();
		this.tl9.pause();
		this.tl10.pause();
		this.tl11.pause();
	}

	_createClass(DesignPagesAnimation, [{
		key: 'description',
		value: function description() {
			var _this = this;

			//HEADER
			this.tl1.from('.header_top', 3, {
				y: 50,
				opacity: 0,

				ease: Power3.easeOut
			}, this.headerTime).from('.header_title', 3, {
				y: 50,
				opacity: 0,
				ease: Power3.easeOut
			}, '-=1.7').from('.header_bot_txt', 3, {
				y: 50,
				opacity: 0,
				ease: Power3.easeOut,
				onComplete: function onComplete() {
					_this.arrow.from('.header_bot_txt .fa-angle-down', 2, {
						ease: Power3.easeOut,
						y: -30 }).to('.header_bot_txt .fa-angle-down', 0.5, {
						y: -30
					});

					_this.arrow.resume();
				}
			}, '-=1.7');
		}
	}, {
		key: 'start',
		value: function start() {
			if ((0, _helper.activeSection)('section-1')) {
				this.tl1.play();
			}
		}
	}]);

	return DesignPagesAnimation;
}();

exports.default = DesignPagesAnimation;

},{"../helper/helper.js":2}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = require('../helper/helper.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IndexPageAnimation = function () {
	function IndexPageAnimation() {
		_classCallCheck(this, IndexPageAnimation);

		if ((0, _helper.getCookie)('loader')) {
			this.headerTime = '+=1';
		} else {
			this.headerTime = '+=3';
		}

		//time line статический
		this.tl1 = new TimelineMax();
		this.tl2 = new TimelineMax();
		this.tl3 = new TimelineMax();
		this.tl31 = new TimelineMax();
		this.tl4 = new TimelineMax();
		this.tl5 = new TimelineMax();
		this.tl6 = new TimelineMax();
		this.tl7 = new TimelineMax();
		this.tl8 = new TimelineMax();
		this.tl9 = new TimelineMax();
		this.tl10 = new TimelineMax();
		this.tl11 = new TimelineMax();

		//time line динамические
		this.arrow = new TimelineMax({
			repeat: Infinity
		});

		this.tl1.pause();
		this.tl2.pause();
		this.tl3.pause();
		this.tl31.pause();
		this.tl4.pause();
		this.tl5.pause();
		this.tl6.pause();
		this.tl7.pause();
		this.tl8.pause();
		this.tl9.pause();
		this.tl10.pause();
		this.tl11.pause();

		//инициализация настроек time line


		this.start = this.start;
	}

	_createClass(IndexPageAnimation, [{
		key: 'description',
		value: function description() {
			var _this = this;

			//HEADER
			this.tl1.from('.header_top', 3, {
				y: 50,
				opacity: 0,
				ease: Power3.easeOut
			}, this.headerTime).from('.header_title', 3, {
				y: 50,
				opacity: 0,
				ease: Power3.easeOut
			}, '-=1.7').from('.header_bot_txt', 3, {
				y: 50,
				opacity: 0,
				ease: Power3.easeOut
			}, '-=1.7').from('.header_bot_txt .fa-angle-down', 0.7, {
				y: -30,
				opacity: 0,
				scale: 0.5,
				ease: Power3.easeOut,
				onComplete: function onComplete() {
					_this.arrow.from('.header_bot_txt .fa-angle-down', 2, {
						ease: Power3.easeOut,
						y: -30 }).to('.header_bot_txt .fa-angle-down', 0.5, {
						y: -30
					});

					_this.arrow.resume();
				}
			}, '-=1.7');

			//section 2
			this.tl2.add('section-2', '+=0.5').from('.section-2 .title-wrap', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, 'section-2').from('.section-2 .title_block_left_decor', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, '-=1').from('.section-2 h3', 2, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, '-=1').staggerFrom('.section-2 .our_advantages_item', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, 0.3, '-=1').from('.section-2 .our_advantages-download', 1, {
				y: 30,
				opacity: 0,
				ease: Power3.easeOut
			}, '-=1.5');

			//section 3
			this.tl3.add('section-3', "+=0.5").from('.section-3 .title-wrap', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, 'section-3').from('.section-3 .title_block_left_decor', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, '-=0.5').staggerFrom('.section-3 .why_effective_item', 2, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, 0.01, '-=0.5');

			this.tl3.add('section-31', '-=1').from("#Layer_1", 1, {
				scale: 0,
				ease: Bounce.easeOut
			}, 'section-31').from("#Layer_2", 1, {
				scale: 0,
				ease: Bounce.easeOut
			}, 'section-31').from("#g6204", 1, {
				y: '10px',
				ease: Bounce.easeOut
			}, '-=1').from("#g6046", 1, {
				y: '10px',
				ease: Bounce.easeOut
			}, '-=0.8').from("#g6414", 1, {
				x: '10px',
				ease: Bounce.easeOut
			}, '-=0.8').from("#g6182", 1, {
				scale: 0,
				ease: Bounce.easeOut
			}, '-=0.8').from("#g6472", 1, {
				y: -10,
				ease: Bounce.easeOut
			}, '-=0.8').from("#g6482", 1, {
				scale: 0,
				ease: Bounce.easeOut
			}, '-=0.8').from("#g6197", 1, {
				x: 50,
				ease: Bounce.easeOut
			}, '-=0.8').from("#g6189", 1, {
				y: -10,
				ease: Bounce.easeOut
			}, '-=0.8').from("#g6487", 1, {
				y: -10,
				ease: Bounce.easeOut
			}, '-=0.8');

			//section 4
			this.tl4.from('.section-4 .row', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "+=0.5");

			//section 5
			this.tl5.from('.section-5 .title-wrap', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "+=0.5").from('.section-5 .title_block_left_decor', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=0.7").from('.section-5 .why_profitably_item_img', 1, {
				x: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=0.7").from('.section-5 .why_profitably_item_txt', 1, {
				x: 30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=1");

			//	section 6
			this.tl6.from('.section-6 .row', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "+=0.5");

			//	section 7
			this.tl7.from('.section-7 .title-wrap', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "+=0.5").from('.section-7 .title_block_left_decor ', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=0.5").staggerFrom('.section-7 .who_are_we_items .who_are_we_item ', 2, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, 0.02, "-=0.5").from('.section-7 .who_are_we_bottom_title ', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=0.5");

			//	section 8
			this.tl8.from('.section-8 .title-wrap', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "+=0.5").staggerFrom('.section-8 .how_good_item', 2, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, 0.01, "-=0.5").from('.section-8 .link', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "-=0.5");

			//section 9
			this.tl9.from('.section-9 h2', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "+=0.5").staggerFrom('.section-9 .couple_of_words_txt', 2, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, 0.01, "-=0.5");

			//section 10
			this.tl10.from('.section-10 .row', 1, {
				y: -30,
				opacity: 0,
				ease: Power3.easeOut
			}, "+=0.5");
		}
	}, {
		key: 'start',
		value: function start() {

			if ((0, _helper.activeSection)('section-1')) {
				this.tl1.resume();
			}
			if ((0, _helper.activeSection)('section-2', 300, 400)) {
				this.tl2.resume();
			}
			if ((0, _helper.activeSection)('section-3', 300, 400)) {
				this.tl3.resume();
				this.tl31.resume();
			}
			if ((0, _helper.activeSection)('section-4', 500, 400)) {
				this.tl4.resume();
			}
			if ((0, _helper.activeSection)('section-5', 500, 400)) {
				this.tl5.resume();
			}
			if ((0, _helper.activeSection)('section-6', 500, 400)) {
				this.tl6.resume();
			}
			if ((0, _helper.activeSection)('section-7', 500, 400)) {
				this.tl7.resume();
			}
			if ((0, _helper.activeSection)('section-8', 500, 400)) {
				this.tl8.resume();
			}
			if ((0, _helper.activeSection)('section-9', 500, 400)) {
				this.tl9.resume();
			}
			if ((0, _helper.activeSection)('section-10', 700, 400)) {
				this.tl10.resume();
			}
		}
	}]);

	return IndexPageAnimation;
}();

exports.default = IndexPageAnimation;

},{"../helper/helper.js":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcYW5pbWF0ZS5qcyIsImpzXFxoZWxwZXJcXGhlbHBlci5qcyIsImpzXFxtb2RlbC1hbmltYXRpb25cXGFib3V0LXVzLXBhZ2VzLmpzIiwianNcXG1vZGVsLWFuaW1hdGlvblxcY29udGV4dHVhbC1wYWdlcy5qcyIsImpzXFxtb2RlbC1hbmltYXRpb25cXGRlc2lnbi1wYWdlcy5qcyIsImpzXFxtb2RlbC1hbmltYXRpb25cXGluZGV4LXBhZ2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQ0E7OztBQUdBOzs7QUFGQTs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTtJQUNNLFM7QUFFTCxzQkFBYTtBQUFBOztBQUNaLE9BQUssa0JBQUwsR0FBMEIsMEJBQTFCO0FBQ0EsT0FBSyxnQkFBTCxHQUF3Qiw0QkFBeEI7QUFDQSxPQUFLLG1CQUFMLEdBQTJCLCtCQUEzQjtBQUNBLE9BQUssb0JBQUwsR0FBNEIsMkJBQTVCO0FBR0E7Ozs7bUNBRWU7QUFDakI7QUFDRSxPQUFHLHlCQUFZLFlBQVosQ0FBSCxFQUE2QjtBQUM1QixTQUFLLGtCQUFMLENBQXdCLFdBQXhCO0FBQ0E7QUFDRCxPQUFHLHlCQUFZLGdCQUFaLENBQUgsRUFBaUM7QUFDaEMsU0FBSyxnQkFBTCxDQUFzQixXQUF0QjtBQUNBO0FBQ0QsT0FBRyx5QkFBWSxrQkFBWixDQUFILEVBQW1DO0FBQ2xDLFNBQUssbUJBQUwsQ0FBeUIsV0FBekI7QUFDQTtBQUNELE9BQUcseUJBQVksY0FBWixDQUFILEVBQStCO0FBQzlCLFNBQUssb0JBQUwsQ0FBMEIsV0FBMUI7QUFDQTtBQUNEOzs7eUJBQ0s7QUFDTDtBQUNBLE9BQUcseUJBQVksWUFBWixDQUFILEVBQTZCO0FBQzVCLFNBQUssa0JBQUwsQ0FBd0IsS0FBeEI7QUFDQTtBQUNELE9BQUcseUJBQVksZ0JBQVosQ0FBSCxFQUFp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QUFLLEdBQUwsQ0FBUyxNQUFUO0FBQ0E7QUFDRCxPQUFJLDJCQUFjLFdBQWQsRUFBNEIsR0FBNUIsRUFBaUMsR0FBakMsQ0FBSixFQUEyQztBQUMxQyxTQUFLLEdBQUwsQ0FBUyxNQUFUO0FBQ0E7QUFDRCxPQUFJLDJCQUFjLFdBQWQsRUFBNEIsR0FBNUIsRUFBaUMsR0FBakMsQ0FBSixFQUEyQztBQUMxQyxTQUFLLEdBQUwsQ0FBUyxNQUFUO0FBQ0E7QUFDRCxPQUFJLDJCQUFjLFdBQWQsRUFBNEIsR0FBNUIsRUFBaUMsR0FBakMsQ0FBSixFQUEyQztBQUMxQyxTQUFLLEdBQUwsQ0FBUyxNQUFUO0FBQ0E7QUFDRCxPQUFJLDJCQUFjLFdBQWQsRUFBNEIsR0FBNUIsRUFBaUMsR0FBakMsQ0FBSixFQUEyQztBQUMxQyxTQUFLLEdBQUwsQ0FBUyxNQUFUO0FBQ0E7QUFDRCxPQUFJLDJCQUFjLFlBQWQsRUFBNkIsR0FBN0IsRUFBa0MsR0FBbEMsQ0FBSixFQUE0QztBQUMzQyxTQUFLLElBQUwsQ0FBVSxNQUFWO0FBQ0E7QUFDRDs7Ozs7O2tCQUVhLGtCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxyXG4vLyDQn9C+0LTQutC70Y7Rh9C10L3QuNC1IEhlbHBlcnMgZnVuY3Rpb25cclxuaW1wb3J0IHthY3RpdmVQYWdlc30gZnJvbSAnLi9oZWxwZXIvaGVscGVyLmpzJztcclxuXHJcbi8vINC/0L7QtNC60LvRjtGH0LXQvdC40LUg0LDQvdC40LzQsNGG0LjQuSDQtNC70Y8g0YHRgtGA0LDQvdC40YZcclxuaW1wb3J0IEluZGV4UGFnZUFuaW1hdGlvbiAgZnJvbSAnLi9tb2RlbC1hbmltYXRpb24vaW5kZXgtcGFnZXMuanMnO1xyXG5pbXBvcnQgQWJvdXRVc0FuaW1hdGlvbiAgZnJvbSAnLi9tb2RlbC1hbmltYXRpb24vYWJvdXQtdXMtcGFnZXMuanMnO1xyXG5pbXBvcnQgQ29udGV4dHVhbEFuaW1hdGlvbiAgZnJvbSAnLi9tb2RlbC1hbmltYXRpb24vY29udGV4dHVhbC1wYWdlcy5qcyc7XHJcbmltcG9ydCBEZXNpZ25QYWdlc0FuaW1hdGlvbiAgZnJvbSAnLi9tb2RlbC1hbmltYXRpb24vZGVzaWduLXBhZ2VzLmpzJztcclxuXHJcbi8vINCX0LDQv9GD0YHQuiDQvdC10L7QsdGF0L7QtNC40LzQvtC5INCw0L3QuNC80LDRhtC40LhcclxuY2xhc3MgQW5pbWF0aW9uIHtcclxuXHRcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0dGhpcy5JbmRleFBhZ2VBbmltYXRpb24gPSBuZXcgSW5kZXhQYWdlQW5pbWF0aW9uKCk7XHJcblx0XHR0aGlzLkFib3V0VXNBbmltYXRpb24gPSBuZXcgQWJvdXRVc0FuaW1hdGlvbigpO1xyXG5cdFx0dGhpcy5Db250ZXh0dWFsQW5pbWF0aW9uID0gbmV3IENvbnRleHR1YWxBbmltYXRpb24oKTtcclxuXHRcdHRoaXMuRGVzaWduUGFnZXNBbmltYXRpb24gPSBuZXcgRGVzaWduUGFnZXNBbmltYXRpb24oKTtcclxuXHJcblxyXG5cdH1cclxuXHJcblx0aW5pc2lhbGl6YXRpb24oKXtcclxuLy8g0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0L3QsNGB0YLRgNC+0LXQuiDQsNC90LjQvNCw0YbQuNC5XHJcblx0XHRpZihhY3RpdmVQYWdlcygnbWFpbi1wYWdlcycpKXtcclxuXHRcdFx0dGhpcy5JbmRleFBhZ2VBbmltYXRpb24uZGVzY3JpcHRpb24oKTtcclxuXHRcdH1cclxuXHRcdGlmKGFjdGl2ZVBhZ2VzKCdhYm91dC11cy1wYWdlcycpKXtcclxuXHRcdFx0dGhpcy5BYm91dFVzQW5pbWF0aW9uLmRlc2NyaXB0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRpZihhY3RpdmVQYWdlcygnY29udGV4dHVhbC1wYWdlcycpKXtcclxuXHRcdFx0dGhpcy5Db250ZXh0dWFsQW5pbWF0aW9uLmRlc2NyaXB0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRpZihhY3RpdmVQYWdlcygnZGVzaWduLXBhZ2VzJykpe1xyXG5cdFx0XHR0aGlzLkRlc2lnblBhZ2VzQW5pbWF0aW9uLmRlc2NyaXB0aW9uKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHBsYXkoKXtcclxuXHRcdC8vXHTQl9Cw0L/Rg9GB0Log0LDQvdC40LzQsNGG0LjRj1xyXG5cdFx0aWYoYWN0aXZlUGFnZXMoJ21haW4tcGFnZXMnKSl7XHJcblx0XHRcdHRoaXMuSW5kZXhQYWdlQW5pbWF0aW9uLnN0YXJ0KCk7XHJcblx0XHR9XHJcblx0XHRpZihhY3RpdmVQYWdlcygnYWJvdXQtdXMtcGFnZXMnKSl7XHJcblx0XHRcdHRoaXMuQWJvdXRVc0FuaW1hdGlvbi5zdGFydCgpO1xyXG5cdFx0fVxyXG5cdFx0aWYoYWN0aXZlUGFnZXMoJ2NvbnRleHR1YWwtcGFnZXMnKSl7XHJcblx0XHRcdHRoaXMuQ29udGV4dHVhbEFuaW1hdGlvbi5zdGFydCgpO1xyXG5cdFx0fVxyXG5cdFx0aWYoYWN0aXZlUGFnZXMoJ2Rlc2lnbi1wYWdlcycpKXtcclxuXHRcdFx0dGhpcy5EZXNpZ25QYWdlc0FuaW1hdGlvbi5zdGFydCgpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gaG92ZXJzKCl7XHJcblx0XHJcblx0VHdlZW5NYXguc2V0KCcud2hvX2FyZV93ZV9pdGVtX3RleHQnLCB7c2NhbGVYOjB9KTtcclxuXHRUd2Vlbk1heC5zZXQoJy53aG9fYXJlX3dlX2l0ZW1faW1nIGltZycsIHtzY2FsZVg6MX0pO1xyXG5cdCQoJy53aG9fYXJlX3dlX2l0ZW0nKS5ob3ZlcihmdW5jdGlvbigpIHtcclxuXHRcdFxyXG5cdFx0bGV0IGltYWdlID0gJCh0aGlzKS5maW5kKCcud2hvX2FyZV93ZV9pdGVtX2ltZyBpbWcnKTtcclxuXHRcdGxldCB0ZXh0ID0gJCh0aGlzKS5maW5kKCcud2hvX2FyZV93ZV9pdGVtX3RleHQnKTtcclxuXHRcdFxyXG5cdFx0bGV0IGluTSA9ICBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHRcdFxyXG5cdFx0aW5NLnRvKGltYWdlLCAwLjMsIHtcclxuXHRcdFx0c2NhbGVYOiAwXHJcblx0XHR9KTtcclxuXHRcdGluTS50byh0ZXh0LCAwLjMsIHtcclxuXHRcdFx0c2NhbGVYOiAxXHJcblx0XHR9LFwiLT0wLjFcIilcclxuXHRcdFxyXG5cdH0sIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHJcblx0XHRsZXQgaW1hZ2UgPSAkKHRoaXMpLmZpbmQoJy53aG9fYXJlX3dlX2l0ZW1faW1nIGltZycpO1xyXG5cdFx0bGV0IHRleHQgPSAkKHRoaXMpLmZpbmQoJy53aG9fYXJlX3dlX2l0ZW1fdGV4dCcpO1xyXG5cdFx0XHJcblx0XHRsZXQgb3V0TSA9ICBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHRcdFxyXG5cdFx0b3V0TS5hZGQoJ2xhYmxlJywnKz0wLjIwJykudG8odGV4dCwgMC4zLCB7XHJcblx0XHRcdHNjYWxlWDogMFxyXG5cdFx0fSxcImxhYmxlXCIpO1xyXG5cdFx0b3V0TS5hZGQoJ2xhYmxlJywnKz0wLjA1JykudG8oaW1hZ2UsIDAuMywge1xyXG5cdFx0XHRzY2FsZVg6IDFcclxuXHRcdH0sXCJsYWJsZVwiKTtcclxuXHJcblx0fSlcclxufVxyXG5cclxuXHJcbnZhciBhbmltID0gbmV3IEFuaW1hdGlvbjtcclxuXHJcbiQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG5cdGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggPj0gMTIwMCkge1xyXG5cdFx0YW5pbS5wbGF5KCk7XHJcblx0fVxyXG59KTtcclxuXHJcbiQod2luZG93KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRob3ZlcnMoKTtcclxuXHJcblx0XHJcblx0aWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA+PSAxMjAwKSB7XHJcblx0XHRhbmltLnBsYXkoKTtcclxuXHRcdGFuaW0uaW5pc2lhbGl6YXRpb24oKTtcclxuXHR9XHJcblxyXG5cclxuXHJcbn0pOyIsIlxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2ZVNlY3Rpb24oc2VjdGlvbiwgc3RhcnRUb3AgPSAwLCBzdGFydEJvdHRvbiA9IDApe1xyXG5cdFxyXG5cdHNlY3Rpb24gPSAnLicgKyBzZWN0aW9uO1xyXG5cdGlmKCQoc2VjdGlvbikub2Zmc2V0KCkgIT09IHVuZGVmaW5lZCl7XHJcblx0XHR2YXIgdG9wUG9zaXRpb24gPSAkKHNlY3Rpb24pLm9mZnNldCgpLnRvcCAtIHN0YXJ0VG9wLFxyXG5cdFx0XHRib3R0b21Qb3NpdGlvbiA9ICQoc2VjdGlvbikub2Zmc2V0KCkudG9wICsgJChzZWN0aW9uKS5oZWlnaHQoKSAtIHN0YXJ0Qm90dG9uO1xyXG5cdFx0aWYoKCQod2luZG93KS5zY3JvbGxUb3AoKSA+PSB0b3BQb3NpdGlvbikgJiYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA8PSBib3R0b21Qb3NpdGlvbikpe1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhY3RpdmVQYWdlcyhjbGFzc05hbWUpIHtcclxuXHRpZigkKCdib2R5JykuaGFzQ2xhc3MoY2xhc3NOYW1lKSl7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9ZWxzZXtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29raWUoZGF0YSkge1xyXG5cdHZhciBjb29raWVBcnIgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcclxuXHRmb3IodmFyIGkgPTA7IGkgPCBjb29raWVBcnIubGVuZ3RoOyBpKyspe1xyXG5cdFx0aWYgKGNvb2tpZUFycltpXS5pbmRleE9mKGRhdGEpID49IDApIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldENvb2tpZShkYXRhKXtcclxuXHRkb2N1bWVudC5jb29raWUgPSBkYXRhO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcm90YXRpb25HZWFyKGVsZW1lbnRzLCBkaXJlY3Rpb24gPSAxKXtcclxuXHR2YXIgZ2VhclNtYWxsID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblx0Z2VhclNtYWxsXHJcblx0XHQuZnJvbShlbGVtZW50cywgMix7XHJcblx0XHRcdHJvdGF0aW9uOiAzNjAgKiBkaXJlY3Rpb24sXHJcblx0XHRcdGVhc2U6IFBvd2VyMC5lYXNlTm9uZVxyXG5cdFx0fSk7XHJcblx0Z2VhclNtYWxsLnJlcGVhdChJbmZpbml0eSk7XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQge2FjdGl2ZVNlY3Rpb24sIGdldENvb2tpZX0gZnJvbSAnLi4vaGVscGVyL2hlbHBlci5qcyc7XHJcblxyXG5cclxuXHJcbmNsYXNzIEFib3V0VXNBbmltYXRpb257XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHJcblxyXG5cdFx0aWYoZ2V0Q29va2llKCdsb2FkZXInKSl7XHJcblx0XHRcdHRoaXMuaGVhZGVyVGltZSA9ICcrPTEnO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRoaXMuaGVhZGVyVGltZSA9ICcrPTMnO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vdGltZSBsaW5lINGB0YLQsNGC0LjRh9C10YHQutC40LlcclxuXHRcdHRoaXMudGwxID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblx0XHR0aGlzLnRsMiA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG5cdFx0dGhpcy50bDMgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHRcdHRoaXMudGw0ID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblx0XHR0aGlzLnRsNSA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG5cdFx0dGhpcy50bDYgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHRcdHRoaXMudGw3ID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblx0XHR0aGlzLnRsOCA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG5cdFx0dGhpcy50bDkgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHRcdHRoaXMudGwxMCA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG5cdFx0dGhpcy50bDExID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblxyXG5cdFx0Ly90aW1lIGxpbmUg0LTQuNC90LDQvNC40YfQtdGB0LrQuNC5XHJcblx0XHR0aGlzLmFycm93ID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblxyXG5cdFx0Ly/QvtGB0YLQsNC90L7QstC60LAgdGltZSBsaW5lc1xyXG5cdFx0dGhpcy50bDEucGF1c2UoKTtcclxuXHRcdHRoaXMudGwyLnBhdXNlKCk7XHJcblx0XHR0aGlzLnRsMy5wYXVzZSgpO1xyXG5cdFx0dGhpcy50bDQucGF1c2UoKTtcclxuXHRcdHRoaXMudGw1LnBhdXNlKCk7XHJcblx0XHR0aGlzLnRsNi5wYXVzZSgpO1xyXG5cdFx0dGhpcy50bDcucGF1c2UoKTtcclxuXHRcdHRoaXMudGw4LnBhdXNlKCk7XHJcblx0XHR0aGlzLnRsOS5wYXVzZSgpO1xyXG5cdFx0dGhpcy50bDEwLnBhdXNlKCk7XHJcblx0XHR0aGlzLnRsMTEucGF1c2UoKTtcclxuXHRcdFxyXG5cdH1cclxuXHJcblx0ZGVzY3JpcHRpb24oKXtcclxuXHRcdC8vSEVBREVSXHJcblx0XHR0aGlzLnRsMVxyXG5cdFx0XHQuZnJvbSgnLmhlYWRlcl90b3AnLCAzLCB7XHJcblx0XHRcdFx0eTogNTAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdH0sdGhpcy5oZWFkZXJUaW1lKVxyXG5cdFx0XHQuZnJvbSgnLmhlYWRlcl90aXRsZScsIDMse1xyXG5cdFx0XHRcdHk6IDUwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSwnLT0xLjcnKVxyXG5cdFx0XHQuZnJvbSgnLmhlYWRlcl9ib3RfdHh0JywgMyx7XHJcblx0XHRcdFx0eTogNTAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dCxcclxuXHRcdFx0XHRvbkNvbXBsZXRlOiAgKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5hcnJvd1xyXG5cdFx0XHRcdFx0XHQuZnJvbSgnLmhlYWRlcl9ib3RfdHh0IC5mYS1hbmdsZS1kb3duJywgMiwge1xyXG5cdFx0XHRcdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0LFxyXG5cdFx0XHRcdFx0XHRcdHk6IC0zMCB9KVxyXG5cdFx0XHRcdFx0XHQudG8oJy5oZWFkZXJfYm90X3R4dCAuZmEtYW5nbGUtZG93bicsIDAuNSwge1xyXG5cdFx0XHRcdFx0XHRcdHk6IC0zMFxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLmFycm93LnJlc3VtZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwnLT0xLjcnKTtcclxuXHJcblx0XHQvL1x0c2VjdGlvbiAyXHJcblx0XHR0aGlzLnRsMlxyXG5cdFx0XHQuZnJvbSgnLnNlY3Rpb24tMiBoMicsIDEse1xyXG5cdFx0XHRcdHk6IC0zMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sXCIrPTAuNVwiKVxyXG5cdFx0XHQuZnJvbSgnLnNlY3Rpb24tMiAudGl0bGVfYmxvY2tfbGVmdF9kZWNvciAnLCAxLHtcclxuXHRcdFx0XHR5OiAtMzAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LFwiLT0wLjVcIilcclxuXHRcdFx0LnN0YWdnZXJGcm9tKCcuc2VjdGlvbi0yIC53aG9fYXJlX3dlX2l0ZW1zIC53aG9fYXJlX3dlX2l0ZW0gJywgMix7XHJcblx0XHRcdFx0eTogLTMwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSwwLjAyLFwiLT0wLjVcIilcclxuXHRcdFx0LmZyb20oJy5zZWN0aW9uLTIgLndob19hcmVfd2VfYm90dG9tX3RpdGxlICcsIDEse1xyXG5cdFx0XHRcdHk6IC0zMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sXCItPTAuNVwiKTtcclxuXHJcblx0XHQvLyBzZWN0aW9uIDNcclxuXHRcdHRoaXMudGwzXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi0zIC50aXRsZS13cmFwJywgMSx7XHJcblx0XHRcdFx0eTogLTMwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSxcIis9MC41XCIpXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi0zIC5pbWctY29udGFpbmVyJywgMSx7XHJcblx0XHRcdFx0eTogLTMwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0c2NhbGU6IDAuOTUsXHJcblx0XHRcdFx0cm90YXRpb246IDMsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSxcIi09MC41XCIpO1xyXG5cclxuXHRcdC8vIHNlY3Rpb24gNFxyXG5cdFx0dGhpcy50bDRcclxuXHRcdFx0LmZyb20oJy5zZWN0aW9uLTQgLnRpdGxlLXdyYXAnLCAxLHtcclxuXHRcdFx0XHR5OiAtMzAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LFwiKz0wLjVcIilcclxuXHRcdFx0LmZyb20oJy5zZWN0aW9uLTQgLm1hcC1jb250YWluZXIgJywgMSx7XHJcblx0XHRcdFx0eDogLTMwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0c2NhbGU6IDAuOTUsXHJcblx0XHRcdFx0cm90YXRpb246IDUsXHJcblx0XHRcdFx0ZWFzZTogQm91bmNlLmVhc2VPdXRcclxuXHRcdFx0fSxcIi09MC41XCIpXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi00IC5jb250YWN0cyAnLCAxLHtcclxuXHRcdFx0XHR4OiA1MCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IEJvdW5jZS5lYXNlT3V0XHJcblx0XHRcdH0sXCItPTAuN1wiKTtcclxuXHJcblx0XHQvLyBzZWN0aW9uIDVcclxuXHRcdHRoaXMudGw1XHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi01IC50aXRsZS13cmFwJywgMSx7XHJcblx0XHRcdFx0eTogLTMwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSxcIis9MC41XCIpXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi01IC51bmlxdWVfY2hhbGxlbmdlX2Zvcm0gJywgMSx7XHJcblx0XHRcdFx0eTogLTMwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSxcIi09MC41XCIpXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi01IC5zb2NpYWwtbGlua3MtY29udGFpbmVyJywgMSx7XHJcblx0XHRcdFx0eTogLTMwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSxcIi09MC41XCIpXHJcblx0XHRcdC5zdGFnZ2VyRnJvbSgnLnNlY3Rpb24tNSAuc29jaWFsLWxpbmtzLWNvbnRhaW5lciBsaScsMix7XHJcblx0XHRcdFx0eDogNTAsXHJcblx0XHRcdFx0eTogMTAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBFbGFzdGljLmVhc2VPdXQuY29uZmlnKDEsIDAuMylcclxuXHRcdFx0fSwwLjEsJy09MC41Jyk7XHJcblx0fVxyXG5cclxuXHRzdGFydCgpe1xyXG5cdFx0aWYgKGFjdGl2ZVNlY3Rpb24oJ3NlY3Rpb24tMScpKSB7XHJcblx0XHRcdHRoaXMudGwxLnBsYXkoKTtcclxuXHRcdH1cclxuXHRcdGlmIChhY3RpdmVTZWN0aW9uKCdzZWN0aW9uLTInLCAzMDAsIDUwMCkpIHtcclxuXHRcdFx0dGhpcy50bDIucGxheSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGFjdGl2ZVNlY3Rpb24oJ3NlY3Rpb24tMycsIDMwMCwgNTAwKSkge1xyXG5cdFx0XHR0aGlzLnRsMy5wbGF5KCk7XHJcblx0XHR9XHJcblx0XHRpZiAoYWN0aXZlU2VjdGlvbignc2VjdGlvbi00JywgMzAwLCA1MDApKSB7XHJcblx0XHRcdHRoaXMudGw0LnBsYXkoKTtcclxuXHRcdH1cclxuXHRcdGlmIChhY3RpdmVTZWN0aW9uKCdzZWN0aW9uLTUnLCAzMDAsIDUwMCkpIHtcclxuXHRcdFx0dGhpcy50bDUucGxheSgpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBBYm91dFVzQW5pbWF0aW9uOyIsImltcG9ydCB7YWN0aXZlU2VjdGlvbiwgZ2V0Q29va2llLCByb3RhdGlvbkdlYXJ9IGZyb20gJy4uL2hlbHBlci9oZWxwZXIuanMnO1xyXG5cclxuXHJcbmNsYXNzIENvbnRleHR1YWxBbmltYXRpb24ge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdGlmIChnZXRDb29raWUoJ2xvYWRlcicpKSB7XHJcblx0XHRcdHRoaXMuaGVhZGVyVGltZSA9ICcrPTEnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5oZWFkZXJUaW1lID0gJys9Myc7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly90aW1lIGxpbmUg0YHRgtCw0YLQuNGH0LXRgdC60LjQuVxyXG5cdFx0dGhpcy50bDEgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHRcdHRoaXMudGwyID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblx0XHR0aGlzLnRsMyA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG5cdFx0dGhpcy50bDQgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHRcdHRoaXMudGw1ID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblx0XHR0aGlzLnRsNiA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG5cdFx0dGhpcy50bDcgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHRcdHRoaXMudGw4ID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblx0XHR0aGlzLnRsOSA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG5cdFx0dGhpcy50bDEwID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblx0XHR0aGlzLnRsMTEgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHJcblx0XHQvL3RpbWUgbGluZSDQtNC40L3QsNC80LjRh9C10YHQutC40LlcclxuXHRcdHRoaXMuYXJyb3cgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHRcdHRoaXMuY3VzdG9tTmV4dEJ0biA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG5cdFx0dGhpcy5jdXN0b21QcmV2QnRuID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblxyXG5cdFx0Ly/QvtGB0YLQsNC90L7QstC60LAgdGltZSBsaW5lc1xyXG5cdFx0dGhpcy50bDEucGF1c2UoKTtcclxuXHRcdHRoaXMudGwyLnBhdXNlKCk7XHJcblx0XHR0aGlzLnRsMy5wYXVzZSgpO1xyXG5cdFx0dGhpcy50bDQucGF1c2UoKTtcclxuXHRcdHRoaXMudGw1LnBhdXNlKCk7XHJcblx0XHR0aGlzLnRsNi5wYXVzZSgpO1xyXG5cdFx0dGhpcy50bDcucGF1c2UoKTtcclxuXHRcdHRoaXMudGw4LnBhdXNlKCk7XHJcblx0XHR0aGlzLnRsOS5wYXVzZSgpO1xyXG5cdFx0dGhpcy50bDEwLnBhdXNlKCk7XHJcblx0XHR0aGlzLnRsMTEucGF1c2UoKTtcclxuXHR9XHJcblxyXG5cclxuXHJcblx0ZGVzY3JpcHRpb24oKSB7XHJcblx0XHQvL0hFQURFUlxyXG5cdFx0dGhpcy50bDFcclxuXHRcdFx0LmZyb20oJy5oZWFkZXJfdG9wJywgMywge1xyXG5cdFx0XHRcdHk6IDUwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSwgdGhpcy5oZWFkZXJUaW1lKVxyXG5cdFx0XHQuZnJvbSgnLmhlYWRlcl90aXRsZScsIDMsIHtcclxuXHRcdFx0XHR5OiA1MCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sICctPTEuNycpXHJcblx0XHRcdC5mcm9tKCcuaGVhZGVyLWZvcm0nLCAzLCB7XHJcblx0XHRcdFx0eTogNTAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dCxcclxuXHRcdFx0XHRvbkNvbXBsZXRlOiAoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLmFycm93XHJcblx0XHRcdFx0XHRcdC5mcm9tKCcuaGVhZGVyX2JvdF90eHQgLmZhLWFuZ2xlLWRvd24nLCAyLCB7XHJcblx0XHRcdFx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXQsXHJcblx0XHRcdFx0XHRcdFx0eTogLTMwXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdC50bygnLmhlYWRlcl9ib3RfdHh0IC5mYS1hbmdsZS1kb3duJywgMC41LCB7XHJcblx0XHRcdFx0XHRcdFx0eTogLTMwXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0dGhpcy5hcnJvdy5yZXBlYXQoSW5maW5pdHkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgJy09MS43Jyk7XHJcblxyXG5cdFx0dGhpcy50bDJcclxuXHRcdFx0LmZyb20oJy5zZWN0aW9uLTIgaDInLCAxLCB7XHJcblx0XHRcdFx0eTogLTMwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSwgXCIrPTAuNVwiKVxyXG5cdFx0XHQuZnJvbSgnLnNlY3Rpb24tMiAuYWJvdXQtd3JhcCcsIDEsIHtcclxuXHRcdFx0XHR4OiAtMzAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LCBcIi09MC41XCIpXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi0yIC5pbWctd3JhcCcsIDEsIHtcclxuXHRcdFx0XHR4OiAzMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sIFwiLT0xXCIpXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi0yIGgzJywgMSwge1xyXG5cdFx0XHRcdHk6IC0zMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sIFwiLT0wLjdcIilcclxuXHRcdFx0LmZyb20oJy5zZWN0aW9uLTIgLmRlY29yZS1zY2hlbWUtd3JhcCcsIDEsIHtcclxuXHRcdFx0XHR5OiAtMzAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LCBcIi09MC43XCIpXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi0yIC5kZWNvcmUtc2NoZW1lLXdyYXAgLnRpdGxlLWl0ZW0tZGVjb3JlJywgMSwge1xyXG5cdFx0XHRcdHk6IDMwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSwgXCItPTAuN1wiKVxyXG5cclxuXHRcdFx0Ly/QvdCw0YfQsNC70L4g0LDQvdC40LzQsNGG0LjQuCDRiNC10YHRgtC10YDQtdC90L7QulxyXG5cdFx0XHQuZnJvbSgnLnNlY3Rpb24tMiAuZGVjb3JlLXNjaGVtZS13cmFwIC5zbWFsbCcsIDEsIHtcclxuXHRcdFx0XHR5OiAyMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IEJvdW5jZS5lYXNlT3V0LFxyXG5cdFx0XHRcdHJvdGF0aW9uOiAtNTAsXHJcblx0XHRcdFx0b25Db21wbGV0ZTogKCk9PntcclxuXHRcdFx0XHRcdHJvdGF0aW9uR2VhcignLmRlY29yZS1zY2hlbWUtd3JhcCAuc21hbGwgc3BhbicpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCBcIi09MC41XCIpXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi0yIC5kZWNvcmUtc2NoZW1lLXdyYXAgLmJpZycsIDEsIHtcclxuXHRcdFx0XHR5OiAtMjAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBCb3VuY2UuZWFzZU91dCxcclxuXHRcdFx0XHRyb3RhdGlvbjogNTAsXHJcblx0XHRcdFx0b25Db21wbGV0ZTogKCkgPT57XHJcblx0XHRcdFx0XHRyb3RhdGlvbkdlYXIoJy5kZWNvcmUtc2NoZW1lLXdyYXAgLmJpZyBzcGFuJywgLTEpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCBcIi09MC43XCIpXHJcblx0XHRcdC8v0LrQvtC90LXRhiDQsNC90LjQvNCw0YbQuNC4INGI0LXRgdGC0LXRgNC10L3QvtC6XHJcblxyXG5cdFx0XHQuc3RhZ2dlckZyb20oJy5zZWN0aW9uLTIgLmRlY29yZS1zY2hlbWUtd3JhcCAuaXRlbScsIDEsIHtcclxuXHRcdFx0XHR5OiAzMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdHNjYWxlWTogMC45LFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sMC4zLCBcIi09MVwiKTtcclxuXHJcblx0XHR0aGlzLnRsM1xyXG5cdFx0XHQuZnJvbSgnLnNlY3Rpb24tMyBoMicsIDEsIHtcclxuXHRcdFx0XHR5OiAtMzAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LCBcIis9MC41XCIpXHJcblx0XHRcdC5mcm9tKCQoJy5zZWN0aW9uLTMgLmltZy13cmFwOmV2ZW4nKSwgMSwge1xyXG5cdFx0XHRcdHg6IC0zMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IEJvdW5jZS5lYXNlT3V0XHJcblx0XHRcdH0sIFwiLT0wLjVcIilcclxuXHRcdFx0LmZyb20oJCgnLnNlY3Rpb24tMyAuaW1nLXdyYXA6b2RkJyksIDEsIHtcclxuXHRcdFx0XHR4OiAzMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IEJvdW5jZS5lYXNlT3V0XHJcblx0XHRcdH0sIFwiLT0xXCIpXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi0zIC5hYm91dC10ZXh0LXdyYXAnLCAxLCB7XHJcblx0XHRcdFx0eTogMzAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LCBcIi09MVwiKVxyXG5cdFx0XHQuZnJvbSgnLnNlY3Rpb24tMyAuY29udGV4dHVhbC1nb29nbGUteWFuZGV4LWZvcm0nLCAxLCB7XHJcblx0XHRcdFx0eTogLTMwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSwgXCItPTAuNVwiKTtcclxuXHJcblx0XHR0aGlzLnRsNFxyXG5cdFx0XHQuZnJvbSgnLnNlY3Rpb24tNCAudGl0bGUtd3JhcCcsIDEsIHtcclxuXHRcdFx0XHR5OiAtMzAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LCBcIis9MC41XCIpXHJcblx0XHRcdC5zdGFnZ2VyRnJvbSgnLnNlY3Rpb24tNCAuaW50ZXJuZXQtc2hvcC1nb29kcy1pdGVtJywgMSwge1xyXG5cdFx0XHRcdHk6IC0zMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sMC4wMyAsXCItPTAuNVwiKVxyXG5cdFx0XHQuZnJvbSgnLnNlY3Rpb24tNCAuZm9ybS13cmFwJywgMSwge1xyXG5cdFx0XHRcdHk6IC0zMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sXCItPTAuN1wiKTtcclxuXHJcblx0XHR0aGlzLnRsNVxyXG5cdFx0XHQuZnJvbSgnLnNlY3Rpb24tNSAudGl0bGUtd3JhcCcsIDEsIHtcclxuXHRcdFx0XHR5OiAtMzAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LCBcIis9MC41XCIpXHJcblx0XHRcdC8v0L3QsNGH0LDQu9C+INCw0L3QuNC80LDRhtC40Lgg0YjQtdGB0YLQtdGA0LXQvdC+0LpcclxuXHRcdFx0LmZyb20oJy5zZWN0aW9uLTUgLmdlYXItMScsIDEsIHtcclxuXHRcdFx0XHR5OiAyMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IEJvdW5jZS5lYXNlT3V0LFxyXG5cdFx0XHRcdHJvdGF0aW9uOiAtNTAsXHJcblx0XHRcdFx0b25Db21wbGV0ZTogKCk9PntcclxuXHRcdFx0XHRcdHJvdGF0aW9uR2VhcignLnNlY3Rpb24tNSAuZ2Vhci0xJylcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIFwiLT0wLjVcIilcclxuXHRcdFx0LmZyb20oJy5zZWN0aW9uLTUgLmdlYXItMicsIDEsIHtcclxuXHRcdFx0XHR5OiAtMjAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBCb3VuY2UuZWFzZU91dCxcclxuXHRcdFx0XHRyb3RhdGlvbjogNTAsXHJcblx0XHRcdFx0b25Db21wbGV0ZTogKCkgPT57XHJcblx0XHRcdFx0XHRyb3RhdGlvbkdlYXIoJy5zZWN0aW9uLTUgLmdlYXItMicsIC0xKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgXCItPTAuN1wiKVxyXG5cdFx0XHQvLyDQutC+0L3QtdGGINCw0L3QuNC80LDRhtC40Lgg0YjQtdGB0YLQtdGA0LXQvdC+0LpcclxuXHRcdFx0LnN0YWdnZXJGcm9tKCcuc2VjdGlvbi01IC5jb250ZW50IHVsIGxpJywgMSwge1xyXG5cdFx0XHRcdHk6IC0zMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sIDAuNSxcIi09MC41XCIpXHJcblx0XHRcdC5zdGFnZ2VyRnJvbSgnLnNlY3Rpb24tNSAuY29udGVudCB1bCAuYXJyb3cnLCAxLCB7XHJcblx0XHRcdFx0aGVpZ2h0OiAwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSwgMC41LFwiLT0yLjdcIilcclxuXHRcdFx0LnN0YWdnZXJGcm9tKCcuc2VjdGlvbi01IC5jb250ZW50IHVsIC5hcnJvdycsIDAuNSwge1xyXG5cdFx0XHRcdHdpZHRoOiAwXHJcblx0XHRcdH0sIDAuNSxcIi09Mi41XCIpXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi01IC5jb250ZXh0LXByaXNlLXdyYXAgLmRlY29yZS1pbWcnLCAxLCB7XHJcblx0XHRcdFx0eDogLTEwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSxcIi09MS41XCIpXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi01IC5jb250ZXh0LXByaXNlLXdyYXAgLnRleHQnLCAxLCB7XHJcblx0XHRcdFx0eDogMTAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LFwiLT0xLjNcIik7XHJcblxyXG5cdFx0dGhpcy50bDZcclxuXHRcdFx0LmZyb20oJy5zZWN0aW9uLTYgLnRpdGxlLXdyYXAnLCAxLCB7XHJcblx0XHRcdFx0eTogLTMwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSwgXCIrPTAuNVwiKVxyXG5cdFx0XHQuZnJvbSgnLnNlY3Rpb24tNiAuY2Fyb3VzZWxfd3JhcCcsIDEsIHtcclxuXHRcdFx0XHR5OiAtMzAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LCBcIi09MC41XCIpXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi02IC5jYXJvdXNlbF90eHRfd3JhcCAnLCAxLCB7XHJcblx0XHRcdFx0eTogMzAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LCBcIi09MVwiKVxyXG5cdFx0XHQuZnJvbSgnLnNlY3Rpb24tNiAuY3VzdG9tTmV4dEJ0bicsIDIuNSwge1xyXG5cdFx0XHRcdHg6IC0zMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sIFwiLT0wLjVcIilcclxuXHRcdFx0LmZyb20oJy5zZWN0aW9uLTYgLmN1c3RvbVByZXZCdG4nLCAyLjUsIHtcclxuXHRcdFx0XHR4OiAzMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sIFwiLT0yLjVcIik7XHJcblx0XHR0aGlzLnRsN1xyXG5cdFx0XHQuZnJvbSgnLnNlY3Rpb24tNyBoMicsIDEsIHtcclxuXHRcdFx0XHR5OiAtMzAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LCBcIis9MC41XCIpXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi03IHAnLCAxLCB7XHJcblx0XHRcdFx0eTogLTMwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSwgXCItPTAuNVwiKVxyXG5cdFx0XHQuZnJvbSgnLnNlY3Rpb24tNyAudW5pcXVlX2NoYWxsZW5nZV9mb3JtJywgMSwge1xyXG5cdFx0XHRcdHk6IDMwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSwgXCItPTFcIilcclxuXHR9XHJcblxyXG5cdHN0YXJ0KCkge1xyXG5cdFx0aWYgKGFjdGl2ZVNlY3Rpb24oJ3NlY3Rpb24tMScpKSB7XHJcblx0XHRcdHRoaXMudGwxLnBsYXkoKTtcclxuXHRcdH1cclxuXHRcdGlmIChhY3RpdmVTZWN0aW9uKCdzZWN0aW9uLTInLCAzMDAsIDUwMCkpIHtcclxuXHRcdFx0dGhpcy50bDIucGxheSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGFjdGl2ZVNlY3Rpb24oJ3NlY3Rpb24tMycsIDMwMCwgNTAwKSkge1xyXG5cdFx0XHR0aGlzLnRsMy5wbGF5KCk7XHJcblx0XHR9XHJcblx0XHRpZiAoYWN0aXZlU2VjdGlvbignc2VjdGlvbi00JywgMzAwLCA1MDApKSB7XHJcblx0XHRcdHRoaXMudGw0LnBsYXkoKTtcclxuXHRcdH1cclxuXHRcdGlmIChhY3RpdmVTZWN0aW9uKCdzZWN0aW9uLTUnLCAzMDAsIDUwMCkpIHtcclxuXHRcdFx0dGhpcy50bDUucGxheSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGFjdGl2ZVNlY3Rpb24oJ3NlY3Rpb24tNicsIDMwMCwgNTAwKSkge1xyXG5cdFx0XHR0aGlzLnRsNi5wbGF5KCk7XHJcblx0XHR9XHJcblx0XHRpZiAoYWN0aXZlU2VjdGlvbignc2VjdGlvbi03JywgMzAwLCA1MDApKSB7XHJcblx0XHRcdHRoaXMudGw3LnBsYXkoKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQ29udGV4dHVhbEFuaW1hdGlvbjsiLCJpbXBvcnQge2FjdGl2ZVNlY3Rpb24sIGdldENvb2tpZX0gZnJvbSAnLi4vaGVscGVyL2hlbHBlci5qcyc7XHJcblxyXG5cclxuXHJcbmNsYXNzIERlc2lnblBhZ2VzQW5pbWF0aW9ue1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblxyXG5cclxuXHRcdGlmKGdldENvb2tpZSgnbG9hZGVyJykpe1xyXG5cdFx0XHR0aGlzLmhlYWRlclRpbWUgPSAnKz0xJztcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLmhlYWRlclRpbWUgPSAnKz0zJztcclxuXHRcdH1cclxuXHJcblx0XHQvL3RpbWUgbGluZSDRgdGC0LDRgtC40YfQtdGB0LrQuNC5XHJcblx0XHR0aGlzLnRsMSA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG5cdFx0dGhpcy50bDIgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHRcdHRoaXMudGwzID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblx0XHR0aGlzLnRsNCA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG5cdFx0dGhpcy50bDUgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHRcdHRoaXMudGw2ID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblx0XHR0aGlzLnRsNyA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG5cdFx0dGhpcy50bDggPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHRcdHRoaXMudGw5ID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblx0XHR0aGlzLnRsMTAgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHRcdHRoaXMudGwxMSA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG5cclxuXHRcdC8vdGltZSBsaW5lINC00LjQvdCw0LzQuNGH0LXRgdC60LjQuVxyXG5cdFx0dGhpcy5hcnJvdyA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG5cclxuXHRcdC8v0L7RgdGC0LDQvdC+0LLQutCwIHRpbWUgbGluZXNcclxuXHRcdHRoaXMudGwxLnBhdXNlKCk7XHJcblx0XHR0aGlzLnRsMi5wYXVzZSgpO1xyXG5cdFx0dGhpcy50bDMucGF1c2UoKTtcclxuXHRcdHRoaXMudGw0LnBhdXNlKCk7XHJcblx0XHR0aGlzLnRsNS5wYXVzZSgpO1xyXG5cdFx0dGhpcy50bDYucGF1c2UoKTtcclxuXHRcdHRoaXMudGw3LnBhdXNlKCk7XHJcblx0XHR0aGlzLnRsOC5wYXVzZSgpO1xyXG5cdFx0dGhpcy50bDkucGF1c2UoKTtcclxuXHRcdHRoaXMudGwxMC5wYXVzZSgpO1xyXG5cdFx0dGhpcy50bDExLnBhdXNlKCk7XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdGRlc2NyaXB0aW9uKCl7XHJcblx0XHQvL0hFQURFUlxyXG5cdFx0dGhpcy50bDFcclxuXHRcdFx0LmZyb20oJy5oZWFkZXJfdG9wJywgMywge1xyXG5cdFx0XHRcdHk6IDUwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHR9LHRoaXMuaGVhZGVyVGltZSlcclxuXHRcdFx0LmZyb20oJy5oZWFkZXJfdGl0bGUnLCAzLHtcclxuXHRcdFx0XHR5OiA1MCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sJy09MS43JylcclxuXHRcdFx0LmZyb20oJy5oZWFkZXJfYm90X3R4dCcsIDMse1xyXG5cdFx0XHRcdHk6IDUwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXQsXHJcblx0XHRcdFx0b25Db21wbGV0ZTogICgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuYXJyb3dcclxuXHRcdFx0XHRcdFx0LmZyb20oJy5oZWFkZXJfYm90X3R4dCAuZmEtYW5nbGUtZG93bicsIDIsIHtcclxuXHRcdFx0XHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dCxcclxuXHRcdFx0XHRcdFx0XHR5OiAtMzAgfSlcclxuXHRcdFx0XHRcdFx0LnRvKCcuaGVhZGVyX2JvdF90eHQgLmZhLWFuZ2xlLWRvd24nLCAwLjUsIHtcclxuXHRcdFx0XHRcdFx0XHR5OiAtMzBcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5hcnJvdy5yZXN1bWUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sJy09MS43Jyk7XHJcblxyXG5cdFx0XHJcblx0fVxyXG5cclxuXHRzdGFydCgpe1xyXG5cdFx0aWYgKGFjdGl2ZVNlY3Rpb24oJ3NlY3Rpb24tMScpKSB7XHJcblx0XHRcdHRoaXMudGwxLnBsYXkoKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRGVzaWduUGFnZXNBbmltYXRpb247IiwiaW1wb3J0IHthY3RpdmVTZWN0aW9uLCBnZXRDb29raWV9IGZyb20gJy4uL2hlbHBlci9oZWxwZXIuanMnO1xyXG5cclxuXHJcblxyXG5jbGFzcyBJbmRleFBhZ2VBbmltYXRpb257XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHJcblxyXG5cdFx0aWYoZ2V0Q29va2llKCdsb2FkZXInKSl7XHJcblx0XHRcdHRoaXMuaGVhZGVyVGltZSA9ICcrPTEnO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRoaXMuaGVhZGVyVGltZSA9ICcrPTMnO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vdGltZSBsaW5lINGB0YLQsNGC0LjRh9C10YHQutC40LlcclxuXHRcdHRoaXMudGwxID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblx0XHR0aGlzLnRsMiA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG5cdFx0dGhpcy50bDMgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHRcdHRoaXMudGwzMSA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG5cdFx0dGhpcy50bDQgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHRcdHRoaXMudGw1ID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblx0XHR0aGlzLnRsNiA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG5cdFx0dGhpcy50bDcgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHRcdHRoaXMudGw4ID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblx0XHR0aGlzLnRsOSA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG5cdFx0dGhpcy50bDEwID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcblx0XHR0aGlzLnRsMTEgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuXHJcblx0XHQvL3RpbWUgbGluZSDQtNC40L3QsNC80LjRh9C10YHQutC40LVcclxuXHRcdHRoaXMuYXJyb3cgPSBuZXcgVGltZWxpbmVNYXgoe1xyXG5cdFx0XHRyZXBlYXQ6IEluZmluaXR5XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnRsMS5wYXVzZSgpO1xyXG5cdFx0dGhpcy50bDIucGF1c2UoKTtcclxuXHRcdHRoaXMudGwzLnBhdXNlKCk7XHJcblx0XHR0aGlzLnRsMzEucGF1c2UoKTtcclxuXHRcdHRoaXMudGw0LnBhdXNlKCk7XHJcblx0XHR0aGlzLnRsNS5wYXVzZSgpO1xyXG5cdFx0dGhpcy50bDYucGF1c2UoKTtcclxuXHRcdHRoaXMudGw3LnBhdXNlKCk7XHJcblx0XHR0aGlzLnRsOC5wYXVzZSgpO1xyXG5cdFx0dGhpcy50bDkucGF1c2UoKTtcclxuXHRcdHRoaXMudGwxMC5wYXVzZSgpO1xyXG5cdFx0dGhpcy50bDExLnBhdXNlKCk7XHJcblxyXG5cdFx0Ly/QuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQvdCw0YHRgtGA0L7QtdC6IHRpbWUgbGluZVxyXG5cclxuXHJcblx0XHR0aGlzLnN0YXJ0ID0gdGhpcy5zdGFydDtcclxuXHR9XHJcblxyXG5cdGRlc2NyaXB0aW9uKCl7XHJcblx0XHQvL0hFQURFUlxyXG5cdFx0dGhpcy50bDFcclxuXHRcdFx0LmZyb20oJy5oZWFkZXJfdG9wJywgMywge1xyXG5cdFx0XHRcdHk6IDUwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdH0sdGhpcy5oZWFkZXJUaW1lKVxyXG5cdFx0XHQuZnJvbSgnLmhlYWRlcl90aXRsZScsIDMse1xyXG5cdFx0XHRcdHk6IDUwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSwnLT0xLjcnKVxyXG5cdFx0XHQuZnJvbSgnLmhlYWRlcl9ib3RfdHh0JywgMyx7XHJcblx0XHRcdFx0eTogNTAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LCctPTEuNycpXHJcblx0XHRcdC5mcm9tKCcuaGVhZGVyX2JvdF90eHQgLmZhLWFuZ2xlLWRvd24nLCAwLjcse1xyXG5cdFx0XHRcdHk6IC0zMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdHNjYWxlOiAwLjUsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXQsXHJcblx0XHRcdFx0b25Db21wbGV0ZTogICgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuYXJyb3dcclxuXHRcdFx0XHRcdFx0LmZyb20oJy5oZWFkZXJfYm90X3R4dCAuZmEtYW5nbGUtZG93bicsIDIsIHtcclxuXHRcdFx0XHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dCxcclxuXHRcdFx0XHRcdFx0XHR5OiAtMzAgfSlcclxuXHRcdFx0XHRcdFx0LnRvKCcuaGVhZGVyX2JvdF90eHQgLmZhLWFuZ2xlLWRvd24nLCAwLjUsIHtcclxuXHRcdFx0XHRcdFx0XHR5OiAtMzBcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5hcnJvdy5yZXN1bWUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sJy09MS43Jyk7XHJcblxyXG5cdFx0Ly9zZWN0aW9uIDJcclxuXHRcdHRoaXMudGwyLmFkZCgnc2VjdGlvbi0yJywnKz0wLjUnKVxyXG5cdFx0XHQuZnJvbSgnLnNlY3Rpb24tMiAudGl0bGUtd3JhcCcsIDEsIHtcclxuXHRcdFx0eTogLTMwLFxyXG5cdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0fSwnc2VjdGlvbi0yJylcclxuXHRcdFx0LmZyb20oJy5zZWN0aW9uLTIgLnRpdGxlX2Jsb2NrX2xlZnRfZGVjb3InLCAxLHtcclxuXHRcdFx0XHR5OiAtMzAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LCctPTEnKVxyXG5cdFx0XHQuZnJvbSgnLnNlY3Rpb24tMiBoMycsIDIse1xyXG5cdFx0XHRcdHk6IC0zMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sJy09MScpXHJcblx0XHRcdC5zdGFnZ2VyRnJvbSgnLnNlY3Rpb24tMiAub3VyX2FkdmFudGFnZXNfaXRlbScsIDEse1xyXG5cdFx0XHRcdHk6IC0zMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sMC4zLCctPTEnKVxyXG5cdFx0XHQuZnJvbSgnLnNlY3Rpb24tMiAub3VyX2FkdmFudGFnZXMtZG93bmxvYWQnLCAxLHtcclxuXHRcdFx0XHR5OiAzMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sJy09MS41Jyk7XHJcblxyXG5cdFx0Ly9zZWN0aW9uIDNcclxuXHRcdHRoaXMudGwzLmFkZCgnc2VjdGlvbi0zJyxcIis9MC41XCIpXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi0zIC50aXRsZS13cmFwJywgMSx7XHJcblx0XHRcdHk6IC0zMCxcclxuXHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdH0sJ3NlY3Rpb24tMycpXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi0zIC50aXRsZV9ibG9ja19sZWZ0X2RlY29yJywgMSx7XHJcblx0XHRcdHk6IC0zMCxcclxuXHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdH0sJy09MC41JylcclxuXHRcdFx0LnN0YWdnZXJGcm9tKCcuc2VjdGlvbi0zIC53aHlfZWZmZWN0aXZlX2l0ZW0nLCAyLHtcclxuXHRcdFx0eTogLTMwLFxyXG5cdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0fSwwLjAxLCctPTAuNScpO1xyXG5cclxuXHRcdHRoaXMudGwzLmFkZCgnc2VjdGlvbi0zMScsJy09MScpXHJcblx0XHRcdC5mcm9tKFwiI0xheWVyXzFcIiwgMSwge1xyXG5cdFx0XHRcdHNjYWxlOiAwLFxyXG5cdFx0XHRcdGVhc2U6IEJvdW5jZS5lYXNlT3V0XHJcblx0XHRcdH0sJ3NlY3Rpb24tMzEnKVxyXG5cdFx0XHQuZnJvbShcIiNMYXllcl8yXCIsIDEsIHtcclxuXHRcdFx0XHRzY2FsZTogMCxcclxuXHRcdFx0XHRlYXNlOiBCb3VuY2UuZWFzZU91dFxyXG5cdFx0XHR9LCdzZWN0aW9uLTMxJylcclxuXHRcdFx0LmZyb20oXCIjZzYyMDRcIiwgMSwge1xyXG5cdFx0XHRcdHk6ICcxMHB4JyxcclxuXHRcdFx0XHRlYXNlOiBCb3VuY2UuZWFzZU91dFxyXG5cdFx0XHR9LCctPTEnKVxyXG5cdFx0XHQuZnJvbShcIiNnNjA0NlwiLCAxLCB7XHJcblx0XHRcdFx0eTogJzEwcHgnLFxyXG5cdFx0XHRcdGVhc2U6IEJvdW5jZS5lYXNlT3V0XHJcblx0XHRcdH0sJy09MC44JylcclxuXHRcdFx0LmZyb20oXCIjZzY0MTRcIiwgMSwge1xyXG5cdFx0XHRcdHg6ICcxMHB4JyxcclxuXHRcdFx0XHRlYXNlOiBCb3VuY2UuZWFzZU91dFxyXG5cdFx0XHR9LCctPTAuOCcpXHJcblx0XHRcdC5mcm9tKFwiI2c2MTgyXCIsIDEsIHtcclxuXHRcdFx0XHRzY2FsZTogMCxcclxuXHRcdFx0XHRlYXNlOiBCb3VuY2UuZWFzZU91dFxyXG5cdFx0XHR9LCctPTAuOCcpXHJcblx0XHRcdC5mcm9tKFwiI2c2NDcyXCIsIDEsIHtcclxuXHRcdFx0XHR5OiAtMTAsXHJcblx0XHRcdFx0ZWFzZTogQm91bmNlLmVhc2VPdXRcclxuXHRcdFx0fSwnLT0wLjgnKVxyXG5cdFx0XHQuZnJvbShcIiNnNjQ4MlwiLCAxLCB7XHJcblx0XHRcdFx0c2NhbGU6IDAsXHJcblx0XHRcdFx0ZWFzZTogQm91bmNlLmVhc2VPdXRcclxuXHRcdFx0fSwnLT0wLjgnKVxyXG5cdFx0XHQuZnJvbShcIiNnNjE5N1wiLCAxLCB7XHJcblx0XHRcdFx0eDogNTAsXHJcblx0XHRcdFx0ZWFzZTogQm91bmNlLmVhc2VPdXRcclxuXHRcdFx0fSwnLT0wLjgnKVxyXG5cdFx0XHQuZnJvbShcIiNnNjE4OVwiLCAxLCB7XHJcblx0XHRcdFx0eTogLTEwLFxyXG5cdFx0XHRcdGVhc2U6IEJvdW5jZS5lYXNlT3V0XHJcblx0XHRcdH0sJy09MC44JylcclxuXHRcdFx0LmZyb20oXCIjZzY0ODdcIiwgMSwge1xyXG5cdFx0XHRcdHk6IC0xMCxcclxuXHRcdFx0XHRlYXNlOiBCb3VuY2UuZWFzZU91dFxyXG5cdFx0XHR9LCctPTAuOCcpXHJcblxyXG5cclxuXHJcblx0XHQvL3NlY3Rpb24gNFxyXG5cdFx0dGhpcy50bDRcclxuXHRcdFx0LmZyb20oJy5zZWN0aW9uLTQgLnJvdycsIDEse1xyXG5cdFx0XHRcdHk6IC0zMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sXCIrPTAuNVwiKTtcclxuXHJcblx0XHQvL3NlY3Rpb24gNVxyXG5cdFx0dGhpcy50bDVcclxuXHRcdFx0LmZyb20oJy5zZWN0aW9uLTUgLnRpdGxlLXdyYXAnLCAxLHtcclxuXHRcdFx0XHR5OiAtMzAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LFwiKz0wLjVcIilcclxuXHRcdFx0LmZyb20oJy5zZWN0aW9uLTUgLnRpdGxlX2Jsb2NrX2xlZnRfZGVjb3InLCAxLHtcclxuXHRcdFx0XHR5OiAtMzAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LFwiLT0wLjdcIilcclxuXHRcdFx0LmZyb20oJy5zZWN0aW9uLTUgLndoeV9wcm9maXRhYmx5X2l0ZW1faW1nJywgMSx7XHJcblx0XHRcdFx0eDogLTMwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSxcIi09MC43XCIpXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi01IC53aHlfcHJvZml0YWJseV9pdGVtX3R4dCcsIDEse1xyXG5cdFx0XHRcdHg6IDMwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSxcIi09MVwiKTtcclxuXHJcblx0Ly9cdHNlY3Rpb24gNlxyXG5cdFx0dGhpcy50bDZcclxuXHRcdFx0LmZyb20oJy5zZWN0aW9uLTYgLnJvdycsIDEse1xyXG5cdFx0XHRcdHk6IC0zMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sXCIrPTAuNVwiKTtcclxuXHJcblx0Ly9cdHNlY3Rpb24gN1xyXG5cdFx0dGhpcy50bDdcclxuXHRcdFx0LmZyb20oJy5zZWN0aW9uLTcgLnRpdGxlLXdyYXAnLCAxLHtcclxuXHRcdFx0XHR5OiAtMzAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LFwiKz0wLjVcIilcclxuXHRcdFx0LmZyb20oJy5zZWN0aW9uLTcgLnRpdGxlX2Jsb2NrX2xlZnRfZGVjb3IgJywgMSx7XHJcblx0XHRcdFx0eTogLTMwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSxcIi09MC41XCIpXHJcblx0XHRcdC5zdGFnZ2VyRnJvbSgnLnNlY3Rpb24tNyAud2hvX2FyZV93ZV9pdGVtcyAud2hvX2FyZV93ZV9pdGVtICcsIDIse1xyXG5cdFx0XHRcdHk6IC0zMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sMC4wMixcIi09MC41XCIpXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi03IC53aG9fYXJlX3dlX2JvdHRvbV90aXRsZSAnLCAxLHtcclxuXHRcdFx0XHR5OiAtMzAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LFwiLT0wLjVcIik7XHJcblxyXG5cdC8vXHRzZWN0aW9uIDhcclxuXHRcdHRoaXMudGw4XHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi04IC50aXRsZS13cmFwJywgMSx7XHJcblx0XHRcdFx0eTogLTMwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSxcIis9MC41XCIpXHJcblx0XHRcdC5zdGFnZ2VyRnJvbSgnLnNlY3Rpb24tOCAuaG93X2dvb2RfaXRlbScsIDIse1xyXG5cdFx0XHRcdHk6IC0zMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sMC4wMSxcIi09MC41XCIpXHJcblx0XHRcdC5mcm9tKCcuc2VjdGlvbi04IC5saW5rJywgMSx7XHJcblx0XHRcdFx0eTogLTMwLFxyXG5cdFx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdFx0ZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuXHRcdFx0fSxcIi09MC41XCIpO1xyXG5cclxuXHRcdC8vc2VjdGlvbiA5XHJcblx0XHR0aGlzLnRsOVxyXG5cdFx0XHQuZnJvbSgnLnNlY3Rpb24tOSBoMicsIDEse1xyXG5cdFx0XHRcdHk6IC0zMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sXCIrPTAuNVwiKVxyXG5cdFx0XHQuc3RhZ2dlckZyb20oJy5zZWN0aW9uLTkgLmNvdXBsZV9vZl93b3Jkc190eHQnLCAyLHtcclxuXHRcdFx0XHR5OiAtMzAsXHJcblx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRlYXNlOiBQb3dlcjMuZWFzZU91dFxyXG5cdFx0XHR9LDAuMDEsXCItPTAuNVwiKTtcclxuXHJcblx0XHQvL3NlY3Rpb24gMTBcclxuXHRcdHRoaXMudGwxMFxyXG5cdFx0XHQuZnJvbSgnLnNlY3Rpb24tMTAgLnJvdycsIDEse1xyXG5cdFx0XHRcdHk6IC0zMCxcclxuXHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcblx0XHRcdH0sXCIrPTAuNVwiKTtcclxuXHR9XHJcblxyXG5cdHN0YXJ0KCl7XHJcblx0XHRcclxuXHRcdGlmIChhY3RpdmVTZWN0aW9uKCdzZWN0aW9uLTEnKSkge1xyXG5cdFx0XHR0aGlzLnRsMS5yZXN1bWUoKTtcclxuXHRcdH1cclxuXHRcdGlmIChhY3RpdmVTZWN0aW9uKCdzZWN0aW9uLTInICwgMzAwLCA0MDApKSB7XHJcblx0XHRcdHRoaXMudGwyLnJlc3VtZSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGFjdGl2ZVNlY3Rpb24oJ3NlY3Rpb24tMycgLCAzMDAsIDQwMCkpIHtcclxuXHRcdFx0dGhpcy50bDMucmVzdW1lKCk7XHJcblx0XHRcdHRoaXMudGwzMS5yZXN1bWUoKTtcclxuXHRcdH1cclxuXHRcdGlmIChhY3RpdmVTZWN0aW9uKCdzZWN0aW9uLTQnICwgNTAwLCA0MDApKSB7XHJcblx0XHRcdHRoaXMudGw0LnJlc3VtZSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGFjdGl2ZVNlY3Rpb24oJ3NlY3Rpb24tNScgLCA1MDAsIDQwMCkpIHtcclxuXHRcdFx0dGhpcy50bDUucmVzdW1lKCk7XHJcblx0XHR9XHJcblx0XHRpZiAoYWN0aXZlU2VjdGlvbignc2VjdGlvbi02JyAsIDUwMCwgNDAwKSkge1xyXG5cdFx0XHR0aGlzLnRsNi5yZXN1bWUoKTtcclxuXHRcdH1cclxuXHRcdGlmIChhY3RpdmVTZWN0aW9uKCdzZWN0aW9uLTcnICwgNTAwLCA0MDApKSB7XHJcblx0XHRcdHRoaXMudGw3LnJlc3VtZSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGFjdGl2ZVNlY3Rpb24oJ3NlY3Rpb24tOCcgLCA1MDAsIDQwMCkpIHtcclxuXHRcdFx0dGhpcy50bDgucmVzdW1lKCk7XHJcblx0XHR9XHJcblx0XHRpZiAoYWN0aXZlU2VjdGlvbignc2VjdGlvbi05JyAsIDUwMCwgNDAwKSkge1xyXG5cdFx0XHR0aGlzLnRsOS5yZXN1bWUoKTtcclxuXHRcdH1cclxuXHRcdGlmIChhY3RpdmVTZWN0aW9uKCdzZWN0aW9uLTEwJyAsIDcwMCwgNDAwKSkge1xyXG5cdFx0XHR0aGlzLnRsMTAucmVzdW1lKCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEluZGV4UGFnZUFuaW1hdGlvbjsiXX0=
