export function isToggled() {
  const body = document.querySelector('body');
  const ham = document.querySelector('.ham');
  const canx = document.querySelector('.cancel');
  const sideBar = document.querySelector('.side-bar');
  ham.addEventListener('click', () => {
    sideBar.classList.add('display');
  })
  canx.addEventListener('click', () => {
    sideBar.classList.remove('display');
  });

  const linked = document.querySelector('.nav-link');
  linked.addEventListener('click', () => {
    sideBar.classList.remove('display');
  });
}

export function sideY() {
  const ham = document.querySelector('.ham-div');
  const sideBar = document.querySelector('.side-bar');
  const cancel = document.getElementById('can');
  const navs = document.querySelector('.nav-link');
  ham.addEventListener('click', () => {
    sideBar.classList.add('disp');
  });

  cancel.addEventListener('click', () => {
    sideBar.classList.remove('disp');
  });

  navs.addEventListener('click', () => {
    sideBar.classList.remove('disp');
  });
}