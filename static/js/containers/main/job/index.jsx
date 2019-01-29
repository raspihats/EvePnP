import React from "react";
import api from "../../../api";
import JobControl from "./JobControl";
import JobBoards from "./JobBoards";
import JobComponents from "./JobComponents";

class Job extends React.Component {
  state = { heads: [], jobs: [], job: null };

  listHeads() {
    api.heads.list(data => this.setState({ heads: data }));
  }

  listJobs() {
    api.jobs.list(data =>
      this.setState({ jobs: data.map(job => job.id).sort() })
    );
  }

  componentDidMount() {
    this.listHeads();
    this.listFeeders();
  }

  onSelect(id) {
    if (id == null) {
      this.setState({ job: null });
    } else {
      api.get("/jobs/" + id).then(response => {
        this.setState({
          job: response.data
        });
      });
    }
  }

  onUpload() {
    alert("Uploading a job is not implemented yet!");
  }

  onStart(id) {}

  onDelete(id) {
    api.delete("/jobs/" + id).then(response => {
      this.setState({
        jobs: response.data.map(job => job.id).sort()
      });
    });
  }

  onPause(id) {}

  onStop(id) {}

  componentDidMount() {
    this.listHeads();
    this.listJobs();
  }

  render() {
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
          {this.state.job && <JobBoards job={this.state.job} />}
        </div>
        <div className="col-12 pt-3">
          {this.state.job && <JobComponents job={this.state.job} />}
        </div>
      </div>
    );
  }
}

export default Job;
