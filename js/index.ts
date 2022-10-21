import {data} from "./data"

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
}

class Controller {
  constructor() {}
}

//const app = new Controller(new Model(), new View());
const list = new ProjectList(data)

list.getProjects().forEach(element => {
  console.log(element)
});