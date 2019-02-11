import React from "react";
import api from "../../../api";
import JobControl from "./JobControl";
import JobProgress from "./JobProgress";
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
    api.head.get("", data => this.setState({ head: data }));
  }

  listPackages() {
    api.packages.list(data => this.setState({ packages: data }));
  }

  listJobs() {
    api.jobs.list(data =>
      this.setState({ jobs: data.map(job => job.id).sort() })
    );
  }

  getJobRunnerStatus(reportError = true) {
    api.jobRunner.get(
      "",
      status => {
        let { job } = this.state;

        if (
          (status.state === "run" || status.state === "pause") &&
          (job === null || job.id !== status.job_id)
        ) {
          // force switch to running job
          this.onSelect(job_id);
        } else if (job) {
          let jobCopy = { ...job };
          jobCopy.status = status;
          this.setState({ job: jobCopy });
        }
      },
      reportError
    );
  }

  onSelect(id) {
    if (id == null) {
      this.setState({ job: null });
    } else {
      api.jobs.get(id, job => {
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
    api.jobRunner.update(id, { command: "start" });
  }

  onPause() {
    let id = this.state.job.id;
    api.jobRunner.update(id, { command: "pause" });
  }

  onStop() {
    let id = this.state.job.id;
    api.jobRunner.update(id, { command: "stop" });
  }

  onDelete() {
    let id = this.state.job.id;
    api.jobs.delete(id, () => {
      this.setState({ job: null });
      this.listJobs();
    });
  }

  onUpdateBoard(initialId, updatedBoard, callback) {
    let job = { ...this.state.job };
    job.boards.forEach((board, index) => {
      if (board.id === initialId) {
        job.boards[index] = updatedBoard;
      }
    });

    api.jobs.update(job.id, job, () => {
      this.onSelect(job.id);
      callback();
    });
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
    setInterval(() => this.getJobRunnerStatus(false), 100);
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 col-md-8 col-lg-6">
          <JobControl
            jobs={this.state.jobs}
            selectedJobId={this.state.job ? this.state.job.id : null}
            runningState={
              this.state.job &&
              this.state.job.status &&
              this.state.job.status.state
            }
            onSelect={id => this.onSelect(id)}
            onUpload={() => this.onUpload()}
            onStart={() => this.onStart()}
            onDelete={() => this.onDelete()}
            onPause={() => this.onPause()}
            onStop={() => this.onStop()}
          />
          <JobProgress job={this.state.job} />
        </div>
        <div className="col-12 pt-3">
          {this.state.job && (
            <JobBoards
              head={this.state.head}
              operations={this.state.operations}
              job={this.state.job}
              onSetOrigin={data => {
                this.setState({ origin: data });
              }}
              onUpdateBoard={(initialId, updatedComponent, callback) =>
                this.onUpdateBoard(initialId, updatedComponent, callback)
              }
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
