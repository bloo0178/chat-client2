const styles = {
  /* --- <Channels /> --- */

  channelsContainer: {
    width: "100%",
    display: "flex",
    direction: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  channelList: {
    width: "75%",
    minWidth: 300,
    maxWidth: 600,
    padding: "3rem",
    justifyContent: "center"
  },
  createChannel: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 15
  },

  /* --- <ChannelList /> --- */

  channelListContainer: {
    textAlign: "center"
  },
  channelButtonList: {
    maxHeight: "70vh",
    overflowY: "auto"
  },
  channelButton: {
    width: "100%",
    padding: "1rem"
  }
};

export default styles;