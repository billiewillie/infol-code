const breakpoint = window.matchMedia('(min-width:992px)');

// keep track of swiper instances to destroy later
let mySwiper;

const breakpointChecker = function () {

  // if larger viewport and multi-row layout needed
  if (breakpoint.matches === true) {

    // clean up old instances and inline styles when available
    if (mySwiper !== undefined) mySwiper.destroy(true, true);

    // or/and do nothing
    return;

    // else if a small viewport and single column layout needed
  } else if (breakpoint.matches === false) {

    // fire small viewport version of swiper
    return enableSwiper();
  }
};
const enableSwiper = function () {

  mySwiper = new Swiper('.swiper-news', {
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    a11y: true,
    keyboardControl: true,
    grabCursor: true,

    // pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
  });
};

// keep an eye on viewport size changes
breakpoint.addEventListener('change', breakpointChecker);

// kickstart
breakpointChecker();

new Swiper('.swiper-gallery', {
  loop: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  a11y: true,
  keyboardControl: true,
  grabCursor: true,

  // pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    enabled: false
  },

  breakpoints: {
    // when window width is >= 320px
    992: {
      pagination: {
        enabled: false
      },
      navigation: {
        enabled: true
      },
    },
  }
});

const calendar = new VanillaCalendar('#calendar', {

  settings: {
    lang: 'ru',
    visibility: {
      // hightlights weekends
      weekend: true,
      // highlights today
      today: true,
      // abbreviated names of months in the month selection
      monthShort: true,
      // show week numbers of the year
      weekNumbers: false,
      // show all days, including disabled ones.s
      disabled: false,
      // show the days of the past and next month.
      daysOutside: false,
      theme: 'light',

    }
  },
});
calendar.init();
