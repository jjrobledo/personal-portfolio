import { ProjectList, ProjectTemplate } from "./models";

export class View {
  private listOfProjects: ProjectList;
  private header: HTMLElement;
  private projects: HTMLElement;
  private overlay: HTMLElement;

  constructor(listOfProjects: ProjectList) {
    this.listOfProjects = listOfProjects;
    this.header = new Header().generateHeader();
    this.projects = new ProjectListView(this.listOfProjects).render();
    this.overlay = new Overlay().render();
  }

  public render(): Node[] {
    return [this.header, this.projects, this.overlay];
  }
}

export class ProjectListView {
  private projectList: ProjectList;

  constructor(projectList: ProjectList) {
    this.projectList = projectList;
  }

  public render(): HTMLDivElement {
    let div = document.createElement("div");
    const btnLeft = document.createElement("button");
    const btnRight = document.createElement("button");
    div.classList.add("window-div");
    btnLeft.classList.add("window-btn", "window-btn-left");
    btnRight.classList.add("window-btn", "window-btn-right");
    btnLeft.innerHTML = "←";
    btnRight.innerHTML = "→";

    div.append(btnLeft);
    div.append(btnRight);

    this.projectList
      .getProjects()
      .forEach((project: ProjectTemplate, index) => {
        const win = new CreateProjectWindows(project);
        div.append(win.generateWindow(index));
        div.append(win.generateModalWindow(index));
      });

    return div;
  }
}

export class Overlay {
  public render() {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay", "hidden");

    return overlay;
  }
}

class CreateElement {
  constructor() {}

  public createElement(
    tag: string,
    className: string = "",
    id: string = ""
  ): HTMLElement {
    const element = document.createElement(tag);

    if (className || id)
      if (className) {
        element.classList.add.apply(element.classList, className.split(" "));
      }
    if (id) {
      element.setAttribute("id", id);
    }

    return element;
  }

  public getElement(selector: string): Element {
    let element = document.querySelector(selector)!;

    return element;
  }
}

class Header extends CreateElement {
  private name: string;
  private subtitle: string;
  private githubURL: string;
  private linkedinURL: string;

  constructor() {
    super();
    this.name = "Jesse Robledo";
    this.subtitle = "Software Engineer";
    this.githubURL = "https://github.com/jjrobledo";
    this.linkedinURL = "https://www.linkedin.com/in/jjrobledo/";
  }

  public generateHeader(): HTMLElement {
    const headerDiv = this.createElement("div", "header");
    const nameDiv = this.createElement("div", "name-div");
    const socialDiv = this.createElement("div", "social-icons");
    const nameH1 = this.createElement("h1", "name");
    const subtitleH2 = this.createElement("h2", "subtitle");
    const linkedinIcn = this.createElement(
      "img",
      "icon linkedin-icn"
    ) as HTMLImageElement;
    const mailIcn = this.createElement(
      "img",
      "icon mail-icn"
    ) as HTMLImageElement;
    const gitIcn = this.createElement(
      "img",
      "icon git-icn"
    ) as HTMLImageElement;

    nameH1.innerHTML = this.name;
    subtitleH2.innerHTML = this.subtitle;

    linkedinIcn.src = "./images/linkedin.svg";
    mailIcn.src = "./images/envelope-solid.svg";
    gitIcn.src = "./images/square-github.svg";

    const githubA = this.createElement("a", "header-link") as HTMLAnchorElement;
    const linkedinA = this.createElement(
      "a",
      "header-link"
    ) as HTMLAnchorElement;
    githubA.href = this.githubURL;
    linkedinA.href = this.linkedinURL;
    githubA.target = "_blank";
    linkedinA.target = "_blank";
    githubA.appendChild(gitIcn);
    linkedinA.appendChild(linkedinIcn);

    socialDiv.append(mailIcn, linkedinA, githubA);
    nameDiv.append(nameH1, socialDiv);
    headerDiv.append(nameDiv, subtitleH2);

    return headerDiv;
  }
}

class CreateModalWindows extends CreateElement {}

class CreateProjectWindows extends CreateElement {
  private name: string;
  private tech: string;
  private problem: string;
  private solution: string;
  private imgURL: string;
  private linkURL: string;
  private gitHubURL: string;

  constructor(project: ProjectTemplate) {
    super();
    this.name = project.getTitle();
    this.tech = project.getTech();
    this.problem = project.getProblem();
    this.solution = project.getSolution();
    this.imgURL = project.getScreenshotURL();
    this.linkURL = project.getProjectLink();
    this.gitHubURL = project.getGitHubLink();
  }

  public generateMenuBar() {
    // menu bar
    const menubar = this.createElement("div", "menu-bar");
    const spacerLeft = this.createElement("div", "basic-box spacer-left");
    const minimize = this.createElement("div", "basic-box");
    const menubarCenter = this.createElement("div", "basic-box menu-center");
    const barsLeft = this.createElement("div", "left");
    const centerText = this.createElement("div", "center");
    const barsRight = this.createElement("div", "right");
    const spacerRight = this.createElement("div", "basic-box spacer-right");
    const close = this.createElement("div", "basic-box");
    const bar = this.createElement("div", "bars");

    centerText.innerText = this.name;
    spacerLeft.append(minimize);
    barsLeft.append(
      bar.cloneNode(true),
      bar.cloneNode(true),
      bar.cloneNode(true),
      bar.cloneNode(true),
      bar.cloneNode(true)
    );
    barsRight.append(
      bar.cloneNode(true),
      bar.cloneNode(true),
      bar.cloneNode(true),
      bar.cloneNode(true),
      bar.cloneNode(true)
    );
    menubarCenter.append(barsLeft, centerText, barsRight);
    spacerRight.append(close);
    menubar.append(spacerLeft, menubarCenter, spacerRight);

    return menubar;
  }

  public generateContentArea() {
    const contentArea = this.createElement("div", "content-area show-modal");
    const contentAreaBG = this.createElement("div", "content-area-background");

    return [contentArea, contentAreaBG];
  }

  public generateModalContentArea() {
    const contentArea = this.createElement("div", "content-area");
    const contentAreaBG = this.createElement("div", "content-area-background");

    return [contentArea, contentAreaBG];
  }

  public generateWindowContent(windowIndex: number) {
    const [contentArea, contentAreaBG] = this.generateContentArea();
    const contentSection = this.createElement("section", "");
    const contentArticle = this.createElement("article", "");
    const contentFigure = this.createElement("figure", "");
    const contentImg = this.createElement("img") as HTMLImageElement;
    contentArea.dataset.target = `#modal${windowIndex + 1}`;
    contentImg.src = this.imgURL;

    contentArea.append(contentAreaBG);
    contentAreaBG.append(contentSection);
    contentSection.append(contentArticle);
    contentArticle.append(contentFigure);
    contentFigure.append(contentImg);

    return contentArea;
  }

  public generateModalContent(windowIndex: number) {
    const [contentArea, contentAreaBG] = this.generateModalContentArea();
    const contentSection = this.createElement("section", "proj-section");
    const contentArticle = this.createElement("article", "proj-article");
    const projectName = this.createElement("h3", "proj-name");
    const projectTech = this.createElement("p", "proj-descrip tech");
    const problemHeading = this.createElement("h4", "probsol problem");
    const problemStatement = this.createElement(
      "p",
      "proj-descrip problem-statement"
    );
    const solutionHeading = this.createElement("h4", "probsol solution");
    const solutionStatement = this.createElement(
      "p",
      "proj-descrip solution-statement"
    );

    const linkSection = this.createElement("section", "link-section");
    const linkDiv = this.createElement("div", "link-div");
    const linkAnchor = this.createElement("a", "proj-link");
    const githubLinkDiv = this.createElement("div", "link-div");
    const githubLinkAnchor = this.createElement("a", "proj-link");

    linkAnchor.href = this.linkURL;
    linkAnchor.target = "_blank";
    linkAnchor.innerHTML = "See it live!";

    githubLinkAnchor.href = this.gitHubURL;
    githubLinkAnchor.target = "_blank";
    githubLinkAnchor.innerHTML = "View the project on Github";

    linkDiv.append(linkAnchor);
    githubLinkDiv.append(githubLinkAnchor);

    linkSection.append(linkDiv);
    linkSection.append(githubLinkDiv);

    projectName.innerHTML = this.name;
    projectTech.innerHTML = this.tech;
    problemHeading.innerHTML = "Problem";
    problemStatement.innerHTML = this.problem;
    solutionHeading.innerHTML = "Solution";
    solutionStatement.innerHTML = this.solution;

    contentArea.append(contentAreaBG);
    contentAreaBG.append(contentSection);
    contentSection.append(contentArticle);
    contentArticle.append(projectName);
    contentArticle.append(projectTech);
    contentArticle.append(problemHeading);
    contentArticle.append(problemStatement);
    contentArticle.append(solutionHeading);
    contentArticle.append(solutionStatement);
    contentArticle.append(linkSection);

    return contentArea;
  }

  public generateWindow(windowIndex: number): HTMLElement {
    const windowArea = this.createElement(
      "div",
      `window`,
      `window-${windowIndex + 1}`
    );

    const menubar = this.generateMenuBar();
    const contentArea = this.generateWindowContent(windowIndex);

    windowArea.append(menubar);
    windowArea.append(contentArea);

    return windowArea;
  }

  public generateModalWindow(windowIndex: number): HTMLElement {
    const menubar = this.generateMenuBar();
    const contentArea = this.generateModalContent(windowIndex);

    const windowArea = this.createElement(
      "div",
      `modal-window modal`,
      `modal${windowIndex + 1}`
    );

    windowArea.append(menubar);
    windowArea.append(contentArea);

    return windowArea;
  }
}
