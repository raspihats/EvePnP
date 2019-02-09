import React from "react";
import api from "../../../api";
import JobControl from "./JobControl";
import JobBoards from "./JobBoards";
import JobComponents from "./JobComponents";

class Job extends React.Component {
  state = {
    head: null,
    packages: [],
    operations: ["place", "ignore"],
    jobs: [],
    job: null,
    origin: null
  };

  getHead() {
    api.head.list(data => this.setState({ head: data }));
  }

  listPackages() {
    api.packages.list(data => this.setState({ packages: data }));
  }

  listJobs() {
    api.jobs.list(data =>
      this.setState({ jobs: data.map(job => job.id).sort() })
    );
  }

  onSelect(id) {
    if (id == null) {
      this.setState({ job: null });
    } else {
      api.jobs.get(id, job => {
        job.running = false;
        this.setState({
          job: job,
          referenceId: job.boards[0].id
        });
      });
    }
  }

  onUpload() {
    alert("Uploading a job is not implemented yet!");
  }

  onStart() {
    let id = this.state.job.id;
    api.jobsRunner.update(id, { id: id, operation: "start" }, () => {
      let job = { ...this.state.job };
      job.running = true;
      this.setState({ job: job });
    });
  }

  onDelete() {
    let id = this.state.job.id;
    api.jobs.delete(id, () => {
      this.setState({ job: null });
      this.listJobs();
    });
  }

  onPause() {
    let id = this.state.job.id;
    api.jobsRunner.update(id, { id: id, operation: "pause" });
  }

  onStop() {
    let id = this.state.job.id;
    api.jobsRunner.update(id, { id: id, operation: "stop" });
  }

  onUpdateComponent(initialId, updatedComponent, callback) {
    let job = { ...this.state.job };
    job.components.forEach((component, index) => {
      if (component.id === initialId) {
        job.components[index] = updatedComponent;
      }
    });

    api.jobs.update(job.id, job, () => {
      this.onSelect(job.id);
      callback();
    });
  }

  componentDidMount() {
    this.getHead();
    this.listPackages();
    this.listJobs();
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 col-md-8 col-lg-6">
          <JobControl
            jobs={this.state.jobs}
            selected={this.state.job ? this.state.job.id : ""}
            running={
              this.state.job && this.state.job.running && this.state.job.id
            }
            onSelect={id => this.onSelect(id)}
            onUpload={() => this.onUpload()}
            onStart={() => this.onStart()}
            onDelete={() => this.onDelete()}
            onPause={() => this.onPause()}
            onStop={() => this.onStop()}
          />
        </div>
        <div className="col-12 pt-3">
          {this.state.job && (
            <JobBoards
              head={this.state.head}
              job={this.state.job}
              operations={this.state.operations}
              onSetOrigin={data => this.setState({ origin: data })}
            />
          )}
        </div>
        <div className="col-12 pt-3">
          {this.state.job && (
            <JobComponents
              head={this.state.head}
              packages={this.state.packages.map(p => p.id)}
              operations={this.state.operations}
              origin={this.state.origin}
              job={this.state.job}
              onUpdateComponent={(initialId, updatedComponent, callback) =>
                this.onUpdateComponent(initialId, updatedComponent, callback)
              }
            />
          )}
        </div>
      </div>
    );
  }
}

export default Job;
