import { ProjectList, ProjectTemplate } from "./models";


export class View {
    //win = new CreateWindow()


    constructor(list) {
      this.list = list
      this.test = new ProjectListView(list.generateProjects())
      this.header = new Header()
    }
    render() {
      return this.header.generateHeader()
      //return this.test.render();
    }
  
  }
  
  export class ProjectListView {
  
    projectList: ProjectList;
  
    constructor(projectList: ProjectList) {
      this.projectList = projectList;
    }
  
    render(): HTMLDivElement {
      let div = document.createElement("div")
      this.projectList.getProjects().forEach((project: ProjectTemplate) => {
        const win = new CreateWindow(project)
        div.append(win.generateWindow())
      })
  
      return div;
    }
  }

class CreateElement {

  constructor() {

  }

  createElement(tag: string, className: string) {
    const element = document.createElement(tag)

    if (className) element.classList.add.apply(element.classList, className.split(" "))

    return element
  }

  getElement(selector: string) {
    const element = document.querySelector(selector)

    return element
  }
}

class Header extends CreateElement {
  name: string;
  subtitle: string;

  constructor() {
    super()
    this.name = 'Jesse Robledo'
    this.subtitle = 'Software Engineer'
  }

  generateHeader() {
    const headerDiv = this.createElement('div', 'header')
    const nameDiv = this.createElement('div', 'name-div')
    const socialDiv = this.createElement('div', "social-icons")
    const nameH1 = this.createElement('h1', 'name')
    const subtitleH2 = this.createElement('h2', 'subtitle')
    const linkedinIcn = this.createElement('img', 'icon linkedin-icn')
    const mailIcn = this.createElement('img', 'icon mail-icn')
    const gitIcn = this.createElement('img', 'icon git-icn')

    
    nameH1.innerHTML = this.name;
    subtitleH2.innerHTML = this.subtitle;
    

    linkedinIcn.src = "./images/linkedin.svg"
    mailIcn.src = "./images/envelope-solid.svg"
    gitIcn.src = "./images/square-github.svg"

    socialDiv.append(mailIcn, linkedinIcn, gitIcn)
    nameDiv.append(nameH1, socialDiv);
    headerDiv.append(nameDiv, subtitleH2)
    
    return headerDiv;
  }

}

class CreateWindow extends CreateElement {

  titleText: string;
  imgURL: string;
  linkURL: string;
  description: string;

  constructor(project: ProjectTemplate) {
    super()
    this.titleText = project.name;
    this.imgURL = project.screenshotURL;
    this.linkURL = project.linkURL;
    this.description = project.description;
  }

  generateWindow(): HTMLElement {
      
    const windowArea = this.createElement('div', 'window')
    const menubar = this.createElement('div', 'menu-bar')
    const spacerLeft = this.createElement('div', 'entry spacer-left')
    const minimize = this.createElement('div', 'entry') 
    const menubarCenter = this.createElement('div', 'entry menu-center')
    const barsLeft = this.createElement('div', 'left')
    const centerText = this.createElement('div', 'center')
    const barsRight = this.createElement('div', 'right')
    const spacerRight = this.createElement('div', 'entry spacer-right')
    const close = this.createElement('div', 'entry')
    const bar = this.createElement('div', 'bars');
    const contentArea = this.createElement('div', "content-area");
    const contentAreaBG = this.createElement('div', 'content-area-background')
    const contentArticle = this.createElement('article', '');
    const contentSection = this.createElement('section', '');
    const contentFigure = this.createElement('figure', '');
    const contentImg = this.createElement('img', '')
    const contentDiv = this.createElement('div', '')
    const contentH1 = this.createElement('h1', '')
    const contentP = this.createElement('p', '')
    const contentA = this.createElement('a', '')


    centerText.innerText = this.titleText;
    spacerLeft.append(minimize);
    barsLeft.append(bar.cloneNode(true), bar.cloneNode(true),bar.cloneNode(true),bar.cloneNode(true),bar.cloneNode(true), )
    barsRight.append(bar.cloneNode(true), bar.cloneNode(true),bar.cloneNode(true),bar.cloneNode(true),bar.cloneNode(true), )
    menubarCenter.append(barsLeft, centerText, barsRight)
    spacerRight.append(close);
    menubar.append(spacerLeft, menubarCenter, spacerRight)

    contentImg.src = this.imgURL;
    contentH1.innerHTML = this.titleText;
    contentP.innerHTML = this.description;
    contentA.innerHTML = "See the live version"
    contentA.href = this.linkURL;
    contentArea.append(contentAreaBG);
    contentAreaBG.append(contentArticle);
    contentArticle.append(contentSection);
    contentSection.append(contentFigure);
    contentFigure.append(contentImg);
    contentSection.append(contentDiv);
    contentDiv.append(contentH1)
    contentDiv.append(contentP)
    contentDiv.append(contentA)

    windowArea.append(menubar)
    windowArea.append(contentArea)

    return windowArea;

  }

}
  
