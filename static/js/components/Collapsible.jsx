import React from "react";
import "bootstrap/js/dist/collapse";

class CollapsibleControlButton extends React.Component {
  state = { expanded: false };

  componentWillMount() {
    let expanded = this.props.expanded ? true : false;
    this.setState({ expanded: expanded });
  }

  render() {
    return (
      <button
        className={
          "btn" + (this.props.className ? " " + this.props.className : "")
        }
        type="button"
        title={this.props.title}
        data-toggle="collapse"
        data-target={"#" + this.props.target}
        aria-expanded={this.state.expanded}
        aria-controls={this.props.target}
        onClick={e => {
          let expanded = !this.state.expanded;
          this.setState({ expanded: expanded });
        }}
      >
        {Array.isArray(this.props.children)
          ? this.state.expanded
            ? this.props.children[1]
            : this.props.children[0]
          : this.props.children}
      </button>
    );
  }
}

const Collapsible = props => {
  return (
    <div id={props.id} className={"collapse" + (props.expanded ? " show" : "")}>
      {props.children}
    </div>
  );
};

export { CollapsibleControlButton, Collapsible };
