import React from "react";
import api from "../../../api";
import JobControl from "./JobControl";
import JobBoards from "./JobBoards";
import JobComponents from "./JobComponents";

class Job extends React.Component {
  state = { heads: [], jobs: [], job: null, referenceId: null };

  listHeads() {
    api.heads.list(data => this.setState({ heads: data }));
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
      api.jobs.get(id, data => {
        this.setState({
          job: data,
          referenceId: data.boards[0].id
        });
      });
    }
  }

  onUpload() {
    alert("Uploading a job is not implemented yet!");
  }

  onStart(id) {}

  onDelete(id) {
    api.jobs.delete(id, () => {
      this.setState({ job: null });
      this.listJobs();
    });
  }

  onPause(id) {}

  onStop(id) {}

  componentDidMount() {
    this.listHeads();
    this.listJobs();
  }

  render() {
    let origin = null;
    this.state.job &&
      this.state.job.boards.forEach(board => {
        if (board.id === this.state.referenceId) {
          origin = board.origin;
        }
      });

    return (
      <div className="row">
        <div className="col-12 col-md-8 col-lg-6">
          <JobControl
            jobs={this.state.jobs}
            onSelect={id => this.onSelect(id)}
            onUpload={() => this.onUpload()}
            onStart={id => this.onStart(id)}
            onDelete={id => this.onDelete(id)}
            onPause={id => this.onPause(id)}
            onStop={id => this.onStop(id)}
          />
        </div>
        <div className="col-12 pt-3">
          {this.state.job && (
            <JobBoards
              heads={this.state.heads}
              job={this.state.job}
              referenceId={this.state.referenceId}
              onReferenceIdChange={id => this.setState({ referenceId: id })}
            />
          )}
        </div>
        <div className="col-12 pt-3">
          {this.state.job && (
            <JobComponents
              heads={this.state.heads}
              job={this.state.job}
              origin={origin}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Job;
