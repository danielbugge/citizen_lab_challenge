import React, { useCallback } from "react";
import { Link } from "react-router-dom";

const fetchProjects = async topicId => {
  let projectsUrl = `/api/v1/projects/index`;
  if (topicId) {
    projectsUrl = `/api/v1/projects/index?topic_id=${topicId}`;
  }
  const projects = await fetch(projectsUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .catch(() => this.props.history.push("/"));
  return projects;
};

const fetchFolders = async () => {
  const folders_url = "/api/v1/folders/index";
  const folders = await fetch(folders_url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .catch(() => this.props.history.push("/"));
  return folders;
};

const fetchTopics = async () => {
  const folders_url = "/api/v1/topics/index";
  const folders = await fetch(folders_url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .catch(() => this.props.history.push("/"));
  return folders;
};

const sortFoldersAndProjects = (projects, folders) => {
  const projectsAndFolders = [...projects, ...folders];
  const sortedProjectsAndFolders = projectsAndFolders.sort((a, b) => {
    const aDate = new Date(a.started);
    const bDate = new Date(b.started);
    return bDate - aDate;
  });
  return sortedProjectsAndFolders;
};

const ButtonHOC = ({ value, onClick, children }) => {
  const handleButtonClick = useCallback(
    () => {
      onClick(value);
    },
    [value]
  );

  return <button onClick={handleButtonClick}>{children}</button>;
};

class Folders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectFolderList: [],
      folders: [],
      topics: []
    };
  }

  handleTopicSelect = async (topic, somethins) => {
    const projects = await fetchProjects(topic.id);
    const sortedProjectsAndFolders = sortFoldersAndProjects(
      projects,
      this.state.folders
    );
    this.setState({
      projectFolderList: sortedProjectsAndFolders
    });
  };

  async componentDidMount() {
    const projects = await fetchProjects();
    const folders = await fetchFolders();
    const topics = await fetchTopics();
    const sortedProjectsAndFolders = sortFoldersAndProjects(projects, folders);
    this.setState({
      topics: topics,
      folders: folders,
      projectFolderList: sortedProjectsAndFolders
    });
  }
  render() {
    const { projectFolderList, topics } = this.state;

    const topicsList = topics.map((topic, index) => (
      <div key={index}>
        <ButtonHOC value={topic} onClick={this.handleTopicSelect}>
          {topic.title}
        </ButtonHOC>
      </div>
    ));

    const allProjectsAndFolders = projectFolderList.map((project, index) => (
      <div key={index}>
        <div>
          {project.topics &&
            project.topics.map((topic, index) => (
              <div key={index}>
                <h6 className="secondary-color">{topic.title}</h6>
              </div>
            ))}
        </div>
        <div key={index} className="col-md-6 col-lg-4">
          <div className="card mb-4">
            <div className="card-body">
              <h4>{project.cost ? "project" : "folder"}</h4>
              <h5 className="card-title">{project.title}</h5>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Folders and Projects</h1>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="row">{topicsList}</div>
            <h3>Projects and Folders</h3>
            <div className="row">{allProjectsAndFolders}</div>
          </main>
        </div>
      </>
    );
  }
}
export default Folders;
