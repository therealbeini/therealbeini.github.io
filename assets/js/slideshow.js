// Debounce
function debounce(a, b, c) { var d; return function () { var e = this, f = arguments; clearTimeout(d), d = setTimeout(function () { d = null, c || a.apply(e, f) }, b), c && !d && a.apply(e, f) } }

// Get siblings
var getSiblings = function (elem) {
  var siblings = [];
  var sibling = elem.parentNode.firstChild;
  for (; sibling; sibling = sibling.nextSibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
  }
  return siblings;
};

var Slideshow = function () {

  var
    slideshow,
    slideList,
    slides,
    totalSlides,
    navNext,
    navPrev,
    clickCount,
    slideWidth,
    dots;

  var _init = function () {
    slideshow = document.querySelector('.slideshow');
    slideList = document.querySelector('.slideshow__list');
    navNext = document.querySelector('.slideshow__nav--next');
    navPrev = document.querySelector('.slideshow__nav--prev');
    slides = document.querySelectorAll('.slideshow__item');
    slides = Array.prototype.slice.call(slides);
    totalSlides = slides.length;
    clickCount = 0;

    _resize();
    _addEventHandlers();
    _setActiveNav();
    _dotNav();
    _thumbNav();
    _setActiveDot(clickCount);
    _setActivePagination(clickCount)
  }

  var _addEventHandlers = function () {
    navNext.addEventListener('click', _slideNext, false);
    navPrev.addEventListener('click', _slidePrev, false);
    window.addEventListener('resize', _resize, false);
  }

  var _dotNav = function () {
    var dotNav = document.createElement('ul');
    dotNav.classList.add('dotNav');
    for (var i = 0; i < totalSlides; i++) {
      _createDots(dotNav);
    }
    _clickDots();
  }

  var _createDots = function (dotNav) {
    var dot = document.createElement("li");
    dot.classList.add('dotNav__item');
    dotNav.appendChild(dot)
  }

  var _clickDots = function () {
    var dots = document.querySelectorAll('.dotNav__item');
    dots = Array.prototype.slice.call(dots);
    dots.forEach(function (element, index) {
      element.addEventListener('click', _clickPagination.bind(null, element, index), false);
    });
  }

  var _clickPagination = function (element, index) {
    var siblings = getSiblings(element);
    siblings = Array.prototype.slice.call(siblings);
    siblings.forEach(function (element) {
      element.classList.remove('is-active');
    })
    _setTransform(slideWidth, index);
    clickCount = index;
    if (clickCount === index) {
      element.classList.add('is-active');
    }
    _setActiveNav();
    _setActiveDot(index);
    _setActivePagination(index);
  }

  var _getDots = function () {
    var dots = document.querySelectorAll('.dotNav__item');
    dots = Array.prototype.slice.call(dots);
    return dots;
  }

  var _setActiveDot = function (count) {
    var dots = _getDots();
    dots.forEach(function (element, index) {
      element.classList.remove('is-active');
      if (index === count) {
        element.classList.add('is-active');
      }
    })
  }

  var _setActiveNav = function () {
    if (clickCount === 0) {
      navPrev.classList.add('is-inactive');
      navPrev.classList.remove('is-active');
      navNext.classList.add('is-active');
    } else {
      navPrev.classList.add('is-active');
    }
  }

  var _slideNext = function () {
    clickCount++;
    if (clickCount >= totalSlides) {
      clickCount = 0;
    }
    _setTransform(slideWidth, clickCount);
    _setActiveNav();
    _setActiveDot(clickCount);
    _setActivePagination(clickCount);
  }

  var _slidePrev = function () {
    if (clickCount > 0) {
      clickCount--;
      _setTransform(slideWidth, clickCount);
    }
    _setActiveNav();
    _setActiveDot(clickCount);
    _setActivePagination(clickCount);
  }

  var _thumbNav = function () {
    var thumbWrap = document.createElement('ul');
    thumbWrap.classList.add('slideshow__thumbs');
    slideshow.appendChild(thumbWrap);
    slides.forEach(function (element, index) {
      _createThumbs(element, thumbWrap);
    })
    _clickThumbs();
  }

  var _createThumbs = function (element, thumbWrap) {
    var thumbSrc = element.getAttribute('data-src');
    var thumb = document.createElement('li');
    thumb.classList.add('slideshow__thumbsItem')
    thumb.style.backgroundImage = 'url(' + thumbSrc + ')';
    thumbWrap.appendChild(thumb);
  }

  var _clickThumbs = function () {
    var thumbs = document.querySelectorAll('.slideshow__thumbsItem');
    thumbs = Array.prototype.slice.call(thumbs);
    thumbs.forEach(function (element, index) {
      element.addEventListener('click', _clickPagination.bind(null, element, index), false);
    })
  }

  var _setActivePagination = function (count) {
    var thumbs = document.querySelectorAll('.slideshow__thumbsItem');
    thumbs = Array.prototype.slice.call(thumbs);
    thumbs.forEach(function (element, index) {
      element.classList.remove('is-active');
      if (index === count) {
        element.classList.add('is-active');
      }
    })
  }

  var _setTransform = function (value, multiplier) {
    var transformValue = value * multiplier;
    slideList.style['-webkit-transform'] = 'translateX(-' + transformValue + 'px)';
    slideList.style['-moz-transform'] = 'translateX(-' + transformValue + 'px)';
    slideList.style['-ms-transform'] = 'translateX(-' + transformValue + 'px)';
    slideList.style['-o-transform'] = 'translateX(-' + transformValue + 'px)';
    slideList.style['transform'] = 'translateX(-' + transformValue + 'px)';
  }

  var _resize = debounce(function () {
    slideWidth = slideshow.offsetWidth;
    _setTransform(slideWidth, clickCount);
  }, 50);

  return {
    init: _init
  }
}();

Slideshow.init();
