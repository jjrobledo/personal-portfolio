
export class Model {
    constructor() {}
  }
  
export class ProjectTemplate {
    private name: string;
    private description: string;
    private screenshotURL: string;
    private linkURL: string;

  
    constructor(n: string, d: string, s: string, l: string) {
      this.name = n;
      this.description = d;
      this.screenshotURL = s;
      this.linkURL = l;

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
  