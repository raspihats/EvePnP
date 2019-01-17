import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "../../components/Select";
import JobDetails from "./JobDetails";
import api from "../../api";

class JobControl extends React.Component {
  state = { jobList: ["Upload..."] };
  render() {
    return (
      <Select
        prepend="Job:"
        options={this.state.jobList}
        append={
          <React.Fragment>
            <button
              className="btn btn-outline-secondary"
              type="button"
              title="Start job"
            >
              <FontAwesomeIcon icon="play" />
            </button>
            <button
              className="btn btn-outline-secondary"
              type="button"
              title="Stop job"
            >
              <FontAwesomeIcon icon="pause" />
            </button>
            <button
              className="btn btn-outline-secondary"
              type="button"
              title="Stop job"
            >
              <FontAwesomeIcon icon="stop" />
            </button>
            <button
              className="btn btn-outline-secondary"
              type="button"
              title="Delete job"
            >
              <FontAwesomeIcon icon="trash" />
            </button>
          </React.Fragment>
        }
      />
    );
  }
}

const Job = () => {
  return (
    <div className="row">
      <div className="col-12 col-md-8 col-lg-6">
        <JobControl />
      </div>
      <div className="col-12">
        <JobDetails />
      </div>
    </div>
  );
};

export default Job;
