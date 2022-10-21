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
  
    render(): HTMLDivElement {
      let div = document.createElement("div")
      this.projectList.getProjects().forEach((project: ProjectTemplate) => {
        let h2 = div.appendChild(document.createElement("h2"))
        let p = div.appendChild(document.createElement("p"));
        let img = div.appendChild(document.createElement("img"))
        let a = div.appendChild(document.createElement("a"))
        h2.textContent = project.name
        p.textContent = project.description;
        img.src = project.screenshotURL;
        a.innerHTML = "view the live version"
        a.href = project.linkURL;
      })
  
      return div;
    }
  }


  