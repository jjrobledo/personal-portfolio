import { data } from "./data/data"
import {ProjectListView, View} from "./views"
import {ProjectList} from "./models"

type Data = {
    name: string,
    description: string,
    imageURL: string,
    linkURL: string,
}

class Controller {

  private data: Data[];
  private projectList: ProjectList;
  private view: View;
  private root: HTMLElement;

  constructor(data: Data[]) {
    this.data = data;
    this.projectList = new ProjectList(this.data);
    this.view = new View(this.projectList)
    this.root = document.querySelector("#root")!;

  }

  public generateProjects(): ProjectList{
    return this.projectList
  }

  private renderAppView(appView: View, parentElement:HTMLElement) {
  parentElement.textContent = "";
  const views = Array.from(appView.render())
  views.forEach((element:any) => {
    parentElement.append(element);
  });
  }

  public renderApp() {
    this.renderAppView(this.view, this.root);
  }
}

const app = new Controller(data);
app.renderApp()

const windows = document.querySelectorAll('.window')
const projects: HTMLElement = document.querySelector('.projects-div')!
projects.style.overflow = 'visible'
let currentWindow = 0;
const maxWindows = windows.length;

function goToWindow(windowNumber: number) {
  windows.forEach((window:Element, i:number) => (window.style.transform = `translateX(${(i - windowNumber) * 100}%)`)) 
}

goToWindow(0);

function nextWindow(): void {
  if (currentWindow === maxWindows - 1) {
    currentWindow = 0;
  } else {
    currentWindow++;
  }
  goToWindow(currentWindow);
}

function prevWindow(): void {
  if (currentWindow === 0) {
    currentWindow = maxWindows - 1;
  } else {
    currentWindow--;
  }
  goToWindow(currentWindow);
}

const left = document.querySelector('.window-btn-left')!
left.addEventListener('click', prevWindow)
const right = document.querySelector('.window-btn-right')!
right.addEventListener('click', nextWindow)



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

