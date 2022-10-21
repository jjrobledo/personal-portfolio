import { data } from "./data/data"

type Data = {
    name: string,
    description: string,
    imageURL: string,
    linkURL: string,
}

class Model {
  constructor() {}
}

class ProjectTemplate {
  name: string;
  description: string;
  screenshotURL: string;
  linkURL: string;
  markup: string;

  constructor(n: string, d: string, s: string, l: string) {
    this.name = n;
    this.description = d;
    this.screenshotURL = s;
    this.linkURL = l;
    this.markup = "";
  }

  generateMarkup(): void {
    this.markup = "";
  }

  getMarkup(): string {
    return this.markup;
  }
}

class ProjectList {
  projects: ProjectTemplate[];

  constructor(
    projects: {
      name: string,
      description: string,
      imageURL: string,
      linkURL: string,
    }[]
  ) {
    this.projects = projects.map(
      (e) => new ProjectTemplate(e.name, e.description, e.imageURL, e.linkURL)
    );
  }

  getProjects(): ProjectTemplate[]{
    return [...this.projects];
  }
}

class View {
  constructor() {}

  // render() {
  //   return undefined;
  // }

}

class ProjectListView extends View {

  projectList: ProjectList;

  constructor(projectList: ProjectList) {
    super();
    this.projectList = projectList;
  }

  render(): HTMLUListElement {
    let ul = document.createElement("ul")
    this.projectList.getProjects().forEach(project => {
      let li = ul.appendChild(document.createElement("li"));
      li.textContent = project.name;
    })

    return ul;
  }
}

class Controller {

  data: Data[];
  projectList: ProjectList;

  constructor(data: Data[]) {
    this.data = data;
    this.projectList = new ProjectList(data);
  }

  generateProjectView(): ProjectListView{
    return new ProjectListView(this.projectList)
  }
}

//const app = new Controller(new Model(), new View());
const list = new Controller(data)

function renderAppView(appView: ProjectListView, parentElement:HTMLElement) : void {
  //clear any content that might be there already
  parentElement.textContent = "";
  //render the app view into that parent element
  parentElement.appendChild(appView.render());    
}


function renderApp(appView: ProjectListView, parentElement:HTMLElement): void {
  //render the app view
  renderAppView(appView, parentElement);
  //add a change listener to the app model that automatically
  //re-renders the app view whenever the model changes
}

renderApp(list.generateProjectView(), document.querySelector("#root")!);



