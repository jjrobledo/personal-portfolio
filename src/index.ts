import { data } from "./data/data"
import {ProjectListView} from "./views"
import {ProjectTemplate, ProjectList} from "./models"

type Data = {
    name: string,
    description: string,
    imageURL: string,
    linkURL: string,
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



