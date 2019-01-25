const styles = {
  /* --- <Chat /> --- */

  chatContainer: {
    width: "100%",
    height: "90vh", // maybe position at bottom?
    display: "flex",
    flexFlow: "column",
    justifyContent: "flex-end"
  },
  createMessage: {
    width: "100%"
  },
  chatHeader: {
    maxHeight: "7vh",
    minHeight: "7vh",
    marginBottom: "auto",
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    paddingLeft: "10px",
    paddingRight: "10px"
  },
  loadingSpinner: {
    height: "90vh", // maybe position at bottom?
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  /* --- <ChatMenu /> --- */

  deleteButton: {
    color: "red"
  },

  /* --- <MessagesContainer /> --- */

  messagesDisplay: {
    overflowY: "auto"
  },

  /* --- <MessageBubble /> --- */

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
  },

  /* --- <MessageInput /> --- */

  messageInputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto"
  },
  messageInputTextField: {
    width: "60%"
  },

  /* --- <MessagesDisplay /> --- */

  messageList: {
    listStyle: "none",
    padding: 0 // gets rid of the indent
  },

  /* --- <ParticipantsList /> --- */

  participantsListContainer: {
    width: 250
  }
};

export default styles;
