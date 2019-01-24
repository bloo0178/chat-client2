import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";

const styles = {
  root: {
    width: 250
  }
};

const mockParticipants = ["this", "is", "a", "mock", "list"];

class ParticipantsList extends React.Component {
  // change this to a stateless component. Will it still update on recieving props?

  render() {
    const {
      classes: { root, list },
      open,
      toggle, 
      participants, 
    } = this.props;


    const participantList = (
      <div className={root}>
        <List
          subheader={
            <ListSubheader color="primary">Active Users</ListSubheader>
          }
        >
          {mockParticipants.map((participant, index) => {
            return (
              <ListItem className={list} key={participant + index.toString()}>
                {participant}
              </ListItem>
            );
          })}
        </List>
      </div>
    );

    return (
      <React.Fragment>
        <Drawer open={open} onClick={toggle}>
          <div>{participantList}</div>
        </Drawer>
      </React.Fragment>
    );
  }
}


export default withStyles(styles)(ParticipantsList);
