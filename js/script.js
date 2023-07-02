const btn = document.getElementById('menu-btn');
const overlay = document.getElementById('overlay');
const menu = document.getElementById('mobile-menu');
const counters = document.querySelectorAll('.counter');
const pgHeader = document.getElementById('pg-header');
const innerText = document.getElementById('inner-center-text');


let scrollStarted = false;
let prevScrollPos = window.scrollY;

btn.addEventListener('click', navToggle);
document.addEventListener('scroll', scrollPage);
function navToggle() {
  btn.classList.toggle('open');
  overlay.classList.toggle('overlay-show');
  document.body.classList.toggle('stop-scrolling');
  menu.classList.toggle('show-menu');
}

function scrollPage() {
  const scrollPos = window.scrollY;
  // Stats counter
  if (scrollPos > 100 && !scrollStarted) {
    countUp();
    scrollStarted = true;
  }

  else if (scrollPos < 100 && scrollStarted) {
    reset();
    scrollStarted = false;
  }

  // Inner Text disappear
  innerText.style.opacity = 1 - (scrollPos / 100);

  // Hide header
  if (scrollPos > prevScrollPos && scrollPos > 100) {
    btn.classList.add('hide');
    pgHeader.classList.add('hide');
  }
  else {
    btn.classList.remove('hide');
    pgHeader.classList.remove('hide');
  }
  prevScrollPos = scrollPos;
}

function countUp() {
  counters.forEach(counter => {
    counter.innerText = '0';

    const updateCounter = () => {
      // Get count target
      const target = +counter.getAttribute('data-target');
      // Get current counter value
      const c = +counter.innerText;

      // Create increment
      const increment = target / 100;

      // If counter is less than target, add increment
      if (c < target) {
        // Round up and set counter value
        counter.innerText = `${Math.ceil(c + increment)}`;

        setTimeout(updateCounter, 75);
      }
      else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
}

function reset() {
  counters.forEach(counter => counter.innerHTML = '0');
}