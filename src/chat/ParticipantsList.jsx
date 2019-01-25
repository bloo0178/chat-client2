import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import styles from './styles';

const ParticipantsList = props => {
  const {
    classes: { participantsListContainer },
    open,
    toggle,
    participants
  } = props;

  const formattedList = (
    <div className={participantsListContainer}>
      <List
        subheader={<ListSubheader color="primary">Active Users</ListSubheader>}
      >
        {participants.map((participant, index) => {
          return (
            <ListItem key={participant + index.toString()}>
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
        <div>{formattedList}</div>
      </Drawer>
    </React.Fragment>
  );
};

export default withStyles(styles)(ParticipantsList);
