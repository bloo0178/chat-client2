import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
    bubbleWrapper: {
      width: "100%",
      display: "inline-flex", // sizes bubble to the text
      overflowWrap: "break-word",
      whiteSpace: "pre-wrap" // preserves whitespace
    },
    bubbleYou: {
      background: "#e3f2fd",
      color: "#1c54b2",
      borderRadius: 30,
      lineHeight: 1.3,
      marginBottom: "0.25rem",
      marginRight: "2rem",
      marginLeft: "auto", // pushes bubble to the right
      maxWidth: "60%",
      padding: 10
    },
    bubbleOther: {
      background: "#dbdbdb",
      color: "dark gray",
      borderRadius: 30,
      lineHeight: 1.3,
      marginBottom: "0.25rem",
      marginLeft: "2rem", // keeps bubble to the left
      maxWidth: 400,
      padding: 10
    },
    infoMessage: {
      margin: "auto",
      marginBottom: "0.5rem",
      marginTop: "0.5rem"
    }
  }

const MessageBubble = props => {
  const {
    classes: { bubbleYou, infoMessage, bubbleOther, bubbleWrapper },
    sender,
    message
  } = props;
  let bubbleClass;
  let displayMessage;
  if (sender === "You") {
    bubbleClass = bubbleYou;
    displayMessage = `${sender}: ${message}`;
  } else if (sender === "info") {
    bubbleClass = infoMessage;
    displayMessage = `${message}`;
  } else {
    bubbleClass = bubbleOther;
    displayMessage = `${sender}: ${message}`;
  }
  return (
    <div className={bubbleWrapper}>
      <div className={bubbleClass}>{displayMessage}</div>
    </div>
  );
};

export default withStyles(styles)(MessageBubble);
