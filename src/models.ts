
export class Model {
    constructor() {}
  }
  
export class ProjectTemplate {
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
  
export class ProjectList {
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
  