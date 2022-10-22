import { ProjectList, ProjectTemplate } from "./models";


export class View {

    private listOfProjects: ProjectList;
    private header: HTMLElement;
    private projects: HTMLElement;
    private about: HTMLElement;

    constructor(listOfProjects: ProjectList) {
      this.listOfProjects = listOfProjects
      this.header = new Header().generateHeader()
      this.projects = new ProjectListView(this.listOfProjects).render()
      this.about = new About().generateAbout()
    }

    public render(): Node[] {
      return [this.header,  this.about, this.projects]
    }
  }
  
  export class ProjectListView {
  
    private projectList: ProjectList;

    constructor(projectList: ProjectList) {
      this.projectList = projectList;
    }
  
    public render(): HTMLDivElement {
      let div = document.createElement("div")
      const btnLeft = document.createElement('button')
      const btnRight = document.createElement('button')
      div.classList.add('projects-div')
      btnLeft.classList.add('window-btn', 'window-btn-left')
      btnRight.classList.add('window-btn', 'window-btn-right')
      btnLeft.innerHTML = '←'
      btnRight.innerHTML = '→'

      div.append(btnLeft)
      div.append(btnRight)
      
      this.projectList.getProjects().forEach((project: ProjectTemplate) => {
        const win = new CreateProjectWindows(project)
        div.append(win.generateWindow())
      })
  
      return div;
    }
  }

class CreateElement {

  constructor() {
  }

  public createElement(tag: string, className: string): HTMLElement {
    const element = document.createElement(tag)

    if (className) element.classList.add.apply(element.classList, className.split(" "))

    return element
  }

  public getElement(selector: string): Element {
    let element = document.querySelector(selector)!;

    return element
  }
}

class Header extends CreateElement {
  private name: string;
  private subtitle: string;

  constructor() {
    super()
    this.name = 'Jesse Robledo'
    this.subtitle = 'Software Engineer'
  }

  public generateHeader(): HTMLElement {
    const headerDiv = this.createElement('div', 'header')
    const nameDiv = this.createElement('div', 'name-div')
    const socialDiv = this.createElement('div', "social-icons")
    const nameH1 = this.createElement('h1', 'name')
    const subtitleH2 = this.createElement('h2', 'subtitle')
    const linkedinIcn = this.createElement('img', 'icon linkedin-icn') as HTMLImageElement
    const mailIcn = this.createElement('img', 'icon mail-icn') as HTMLImageElement
    const gitIcn = this.createElement('img', 'icon git-icn') as HTMLImageElement

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

class About extends CreateElement {
  
  constructor() {
    super()
  }

  public generateAbout(): HTMLElement {
    const aboutDiv = this.createElement('div', 'about')
    const h3 = this.createElement('h3', 'about-heading')
    const p = this.createElement('p', 'about-text')

    h3.innerHTML= "About Me"
    p.innerHTML = "archaeologist excited to shift to the challenging and exciting world of software engineering. I enjoy learning new technologies and can pick up new languages and frameworks quickly. My background in project and partnership management enables me to approach each project with a well-rounded and business-focused perspective."

    aboutDiv.append(h3, p)

    return aboutDiv;
  }
}

class CreateProjectWindows extends CreateElement {

  private titleText: string;
  private imgURL: string;
  private linkURL: string;
  private description: string;

  constructor(project: ProjectTemplate) {
    super()
    this.titleText = project.getName();
    this.imgURL = project.getScreenshotURL();
    this.linkURL = project.getLinkURL();
    this.description = project.getDescription();
  }

  public generateWindow(): HTMLElement {
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
    const contentSection = this.createElement('section', 'window-section');
    const contentFigure = this.createElement('figure', '');
    const contentImg = this.createElement('img', 'window-img') as HTMLImageElement
    const contentDiv = this.createElement('div', 'window-content-div')
    const contentH1 = this.createElement('h1', 'window-heading')
    const contentP = this.createElement('p', 'window-text')
    const contentA = this.createElement('a', 'window-link') as HTMLAnchorElement

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
  
