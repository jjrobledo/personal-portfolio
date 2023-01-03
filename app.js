let slidePosition = 0;
const slides = document.getElementsByClassName("window-slide");
const slidesLength = slides.length;

document.getElementById("next").addEventListener("click", function () {
  moveToNext();
});

document.getElementById("prev").addEventListener("click", function () {
  moveToPrevious();
});

function updateSlides() {
  for (let slide of slides) {
    slide.classList.remove("window--visible");
    slide.classList.add("window--hidden");

    slides[slidePosition].classList.add("window--visible");
  }
}

function moveToNext() {
  if (slidePosition === slidesLength - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }

  updateSlides();
}

function moveToPrevious() {
  if (slidePosition === 0) {
    slidePosition = slidesLength - 1;
  } else {
    slidePosition--;
  }
  updateSlides();
}

const modals = document.querySelectorAll(".modal");
const overlay = document.querySelector(".overlay");
const clickCloseModal = document.querySelectorAll(".close-modal");
const clickOpenModal = document.querySelectorAll(".show-modal");

clickOpenModal.forEach((win) => {
  win.addEventListener("click", () => {
    document.querySelector(win.dataset.target).classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
});

clickCloseModal.forEach((win) => {
  win.addEventListener("click", () => {
    document.querySelector(win.dataset.target).classList.add("hidden");
    overlay.classList.add("hidden");
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modals.forEach((modal) => modal.classList.add("hidden"));
    overlay.classList.add("hidden");
  }
});

window.onclick = (e) => {
  if (e.target === overlay) {
    modals.forEach((modal) => modal.classList.add("hidden"));
    overlay.classList.add("hidden");
  }
};

function rot47(x) {
  let s = [];
  for (let i = 0; i < x.length; i++) {
    let j = x.charCodeAt(i);
    if (j >= 33 && j <= 126) {
      s[i] = String.fromCharCode(33 + ((j + 14) % 94));
    } else {
      s[i] = String.fromCharCode(j);
    }
  }
  return s.join("");
}

const emailIcon = document.querySelector(".mail-icn-link");

emailIcon.addEventListener("click", () => {
  emailIcon.href = `mailto:${rot47("C@3=65@];@D6;o8>2:=]4@>")}`;
});
