import React from "react";
import api from "../../api";
import JobControl from "./JobControl";
import JobDetails from "./JobDetails";

class Job extends React.Component {
  state = { jobs: [], job: null };

  onSelect(name) {
    if (name == null) {
      this.setState({ job: null });
    } else {
      api.get("/jobs/" + name).then(response => {
        this.setState({
          job: response.data
        });
      });
    }
  }

  onUpload() {
    alert("Uploading a job is not implemented yet!");
  }

  onStart(name) {}

  onDelete(name) {
    api.delete("/jobs/" + name).then(response => {
      this.setState({
        jobs: response.data.map(job => job.name).sort()
      });
    });
  }

  onPause(name) {}

  onStop(name) {}

  componentDidMount() {
    api.get("/jobs").then(response => {
      this.setState({
        jobs: response.data.map(job => job.name).sort()
      });
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 col-md-8 col-lg-6">
          <JobControl
            jobs={this.state.jobs}
            onSelect={name => this.onSelect(name)}
            onUpload={() => this.onUpload()}
            onStart={name => this.onStart(name)}
            onDelete={name => this.onDelete(name)}
            onPause={name => this.onPause(name)}
            onStop={name => this.onStop(name)}
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
