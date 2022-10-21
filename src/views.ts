import { ProjectList, ProjectTemplate } from "./models";

export class View {
    constructor() {}
  
    // render() {
    //   return undefined;
    // }
  
  }
  
  export class ProjectListView extends View {
  
    projectList: ProjectList;
  
    constructor(projectList: ProjectList) {
      super();
      this.projectList = projectList;
    }
  
    render(): HTMLUListElement {
      let ul = document.createElement("ul")
      this.projectList.getProjects().forEach((project: ProjectTemplate) => {
        let li = ul.appendChild(document.createElement("li"));
        li.textContent = project.name;
      })
  
      return ul;
    }
  }


  