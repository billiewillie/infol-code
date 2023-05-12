const breakpoint = window.matchMedia('(min-width:992px)');

// keep track of swiper instances to destroy later
let mySwiper;

const breakpointChecker = function () {

  // if larger viewport and multi-row layout needed
  if (breakpoint.matches === true) {

    // clean up old instances and inline styles when available
    if (mySwiper !== undefined) {
      mySwiper.destroy(true, true);

      // or/and do nothing
      return;
    }

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

new Swiper('.swiper-user', {
  loop: true,
  slidesPerView: 'auto',

  // pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
});

new Swiper('.swiper-user-position', {
  loop: true,
  slidesPerView: 'auto',

  // pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  // Navigation arrows
  navigation: {
    enabled: false,
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    // when window width is >= 320px
    1280: {
      pagination: {
        enabled: false
      },

      // Navigation arrows
      navigation: {
        enabled: true,
      },
    },
  }
});

const calendar = new VanillaCalendar('#calendar', {
  settings: {
    lang: 'ru',
    visibility: {
      // highlights weekends
      weekend: true,
      // highlights today
      today: true,
      // abbreviated names of months in the month selection
      monthShort: true,
      // show week numbers of the year
      weekNumbers: false,
      // show all days, including disabled ones
      disabled: false,
      // show the days of the past and next month.
      daysOutside: true,
      theme: 'light',
    }
  },
  DOMTemplates: {
    default: `
      <div class="vanilla-calendar-header">
        <div class="vanilla-calendar-header__icon">
            <svg class="icon">
                <use xlink:href="#calendar-icon"></use>
            </svg>
        </div>
        <div class="vanilla-calendar-header__content">
            <#Month /> <#Year />
        </div>
        <#ArrowPrev />
        <#ArrowNext />
      </div>
      <div class="vanilla-calendar-wrapper">
        <div class="vanilla-calendar-content">
          <#Week />
          <#Days />
        </div>
      </div>
    `,
  },
});

calendar.init();

const aside = document.querySelector('.aside');
aside.addEventListener('mouseover', function () {
  aside.classList.add('show');
});
aside.addEventListener('mouseleave', function () {
  aside.classList.remove('show');
});

const menuSwitch = document.getElementById('menu-switch')
const mobileMenu = document.querySelector('.mobile-menu')

menuSwitch.addEventListener('change', e => {
  if (e.target.checked === true) {
    mobileMenu.classList.add('show');
  } else {
    mobileMenu.classList.remove('show');
  }
});

const dropdownTargets = document.querySelectorAll('.dropdown-target');

let intervalId;
dropdownTargets.forEach(e => {
  e.addEventListener('click', function () {
    const target = e.closest('.dropdown-target').dataset.path;

    document.querySelectorAll('.dropdown').forEach(e => {
      if (!document.querySelector(`[data-target=${target}]`).classList.contains('show')) {
        if (e.classList.contains('show')) {
          e.classList.add('hide');
          setTimeout(() => {
            e.classList.remove('hide', 'show');
          }, 300);
        }

        intervalId = setTimeout(() => {
          document.querySelector(`[data-target=${target}]`).classList.add('show');
        });
      }

      if (document.querySelector(`[data-target=${target}]`).classList.contains('show')) {
        clearTimeout(intervalId);
        intervalId = setTimeout(() => {
          document.querySelector(`[data-target=${target}]`).classList.add('hide');
          setTimeout(e => {
            document.querySelector(`[data-target=${target}]`).classList.remove('hide', 'show');
          }, 300);
        })
      }

      window.onclick = ev => {
        if (ev.target === document.querySelector(`[data-target=${target}]`)
          || ev.target === document.querySelector(`[data-path=${target}]`)
          || ev.target.closest('.dropdown-target') === document.querySelector(`[data-path=${target}]`)
        ) {
          return;
        } else {
          document.querySelector(`[data-target=${target}]`).classList.add('hide');
          setTimeout(e => {
            document.querySelector(`[data-target=${target}]`).classList.remove('hide', 'show');
          }, 300);
        }
      }

      window.onscroll = ev => {
        document.querySelector(`[data-target=${target}]`).classList.add('hide');
        setTimeout(e => {
          document.querySelector(`[data-target=${target}]`).classList.remove('hide', 'show');
        }, 300);
      }
    });
  });
});


