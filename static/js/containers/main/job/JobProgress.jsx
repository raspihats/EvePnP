import React from "react";

class JobProgress extends React.Component {
  // state = {};
  calcProgress() {
    let { job } = this.props;

    if (job && job.status) {
      let { boards, components } = job;
      let { boards_ids, components_ids } = job.status;

      let board_count = 0;
      boards.forEach(board => board.operation === "place" && board_count++);

      let component_count = 0;
      components.forEach(
        component => component.operation === "place" && component_count++
      );

      let total_count = board_count * component_count;
      let current_count = 0;
      if (boards_ids.length) {
        current_count =
          (boards_ids.length - 1) * component_count + components_ids.length;
      }

      let percent = Math.round((100 * current_count) / total_count);
      let color = "bg-info";
      if (job.status.state === "pause") {
        color = "bg-warning";
      } else if (percent === 100) {
        color = "bg-success";
      }
      return { percent: percent, color: color, state: job.status.state };
    } else {
      return null;
    }
  }

  render() {
    let progress = this.calcProgress();

    return (
      progress && (
        <div className="progress mt-3">
          <div
            className={
              "progress-bar progress-bar-striped progress-bar-animated " +
              progress.color
            }
            role="progressbar"
            style={{ width: progress.percent + "%" }}
            aria-valuenow={progress.percent}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {progress.percent}%{progress.state === "pause" && "(paused)"}
          </div>
        </div>
      )
    );
  }
}

export default JobProgress;
