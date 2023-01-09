import { data } from "./data/data";
import { View } from "./views";
import { ProjectList } from "./models";

type Data = {
  name: string;
  description: string;
  imageURL: string;
  linkURL: string;
};

class Controller {
  private data: Data[];
  private projectList: ProjectList;
  private view: View;
  private root: HTMLElement;

  constructor(data: Data[]) {
    this.data = data;
    this.projectList = new ProjectList(this.data);
    this.view = new View(this.projectList);
    this.root = document.querySelector("#root")!;
  }

  public generateProjects(): ProjectList {
    return this.projectList;
  }

  private renderAppView(appView: View, parentElement: HTMLElement) {
    parentElement.textContent = "";
    const views = Array.from(appView.render());
    views.forEach((element: any) => {
      parentElement.append(element);
    });
  }

  public renderApp() {
    this.renderAppView(this.view, this.root);
  }
}

const app = new Controller(data);
app.renderApp();

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
    slide.classList.remove("window-visible");
    slide.classList.add("window-hidden");

    slides[slidePosition].classList.add("window-visible");
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

/* class WindowSlider {
  windows: NodeListOf<Element>
  projects: Element
  currentWindow: number;
  maxWindows: number;
  btnLeft: Element
  btnRight: Element

  constructor() {
    this.windows = document.querySelectorAll('.window')
    this.projects = document.querySelector('.projects-div')!
    this.btnRight = document.querySelector('.window-btn-right')!
    this.btnLeft = document.querySelector('.window-btn-left')!
    this.projects.style.overflow = 'visible'
    this.currentWindow = 0;
    this.maxWindows = this.windows.length;
    console.log(this.windows)
  }

  goToWindow(windowNumber) {
    this.windows.forEach((window, i) => (window.style.transform = `translateX(${(i - windowNumber) * 100}%)`)) 
  }

  nextWindow(): void {
    console.log(this.windows)
    if (this.currentWindow === this.maxWindows - 1) {
      this.currentWindow = 0;
    } else {
      this.currentWindow++;
    }
    this.goToWindow(this.currentWindow);
  }
  
  prevWindow():void {
    if (this.currentWindow === 0) {
      this.currentWindow = this.maxWindows - 1;
    } else {
      this.currentWindow--;
    }
    this.goToWindow(this.currentWindow);
  }
} */
