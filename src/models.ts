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

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getScreenshotURL(): string {
    return this.screenshotURL;
  }

  public getLinkURL(): string {
    return this.linkURL;
  }
}

export class ProjectList {
  private projects: ProjectTemplate[];

  constructor(
    projects: {
      name: string;
      description: string;
      imageURL: string;
      linkURL: string;
    }[]
  ) {
    this.projects = projects.map(
      (e) => new ProjectTemplate(e.name, e.description, e.imageURL, e.linkURL)
    );
  }

  public getProjects(): ProjectTemplate[] {
    return [...this.projects];
  }
}
