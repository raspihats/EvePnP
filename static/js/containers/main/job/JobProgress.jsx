import React from "react";

class JobProgress extends React.Component {
  // state = {};
  calcProgress() {
    let board_count = 0;
    this.props.job.boards.forEach(
      board => board.operation === "place" && board_count++
    );

    let component_count = 0;
    this.props.job.components.forEach(
      component => component.operation === "place" && component_count++
    );

    let total_count = board_count * component_count;

    let current_count =
      this.props.jobRunnerStatus.boards_ids.length *
      this.props.jobRunnerStatus.components_ids.length;

    return Math.round((100 * current_count) / total_count);
  }

  render() {
    let progress = this.calcProgress();
    return (
      <div className="progress mt-3">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          style={{ width: progress + "%" }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {progress + "%"}
        </div>
      </div>
    );
  }
}

export default JobProgress;
