export class Model {
  constructor() {}
}

export class ProjectTemplate {
  private title: string;
  private tech: string;
  private problem: string;
  private solution: string;
  private screenshotURL: string;
  private projectLink: string;
  private gitHubLink: string;

  constructor(
    title: string,
    tech: string,
    problem: string,
    solution: string,
    screenshot: string,
    projectLink: string,
    gitHubLink: string
  ) {
    this.title = title;
    this.tech = tech;
    this.problem = problem;
    this.solution = solution;
    this.screenshotURL = screenshot;
    this.projectLink = projectLink;
    this.gitHubLink = gitHubLink;
  }

  public getTitle(): string {
    return this.title;
  }

  public getTech(): string {
    return this.tech;
  }

  public getProblem(): string {
    return this.problem;
  }

  public getSolution(): string {
    return this.solution;
  }

  public getScreenshotURL(): string {
    return this.screenshotURL;
  }

  public getProjectLink(): string {
    return this.projectLink;
  }
  public getGitHubLink(): string {
    return this.gitHubLink;
  }
}

export class ProjectList {
  private projects: ProjectTemplate[];

  constructor(
    projects: {
      name: string;
      tech: string;
      problem: string;
      solution: string;
      imageURL: string;
      linkURL: string;
      githubURL: string;
    }[]
  ) {
    this.projects = projects.map(
      (e) =>
        new ProjectTemplate(
          e.name,
          e.tech,
          e.problem,
          e.solution,
          e.imageURL,
          e.linkURL,
          e.githubURL
        )
    );
  }

  public getProjects(): ProjectTemplate[] {
    return [...this.projects];
  }
}
