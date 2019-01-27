import React from "react";
import api from "../../../api";
import JobControl from "./JobControl";
import JobDetails from "./JobDetails";

class Job extends React.Component {
  state = { jobs: [], job: null };

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
    api.get("/jobs").then(response => {
      this.setState({
        jobs: response.data.map(job => job.id).sort()
      });
    });
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
          {this.state.job && <JobDetails job={this.state.job} />}
        </div>
      </div>
    );
  }
}

export default Job;
