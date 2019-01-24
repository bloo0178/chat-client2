export const getParticipantList = channel => {
  let list = [];
  // Below is periodically causing issues.
  // "channel.createParticipantListQuery is not a function."
  const participantListQuery = channel.createParticipantListQuery();
  participantListQuery.next((participantList, error) => {
    if (error) return console.log(error);
    participantList.map(participant => {
      return list.push(participant.userId);
    });
  });
  return list;
};

export const transformMessage = (rawMessage, sb) => {
  let message = rawMessage.message;
  let currentUser = sb.currentUser.userId;
  let sender = rawMessage._sender.userId;
  if (sender === currentUser) {
    //used for initial load
    return { sender: "You", message: message };
  }
  return { sender: sender, message: message };
};

export const addChannelHandler = (sb, channel, addMessage, updateParticipants) => {
  const ChannelHandler = new sb.ChannelHandler();
  const channelHandlerID = channel.url;

  ChannelHandler.onUserEntered = (openChannel, user) => {
    //why does this return openChannel?
    const participantList = getParticipantList(channel);
    const newMessage = {
      sender: "info",
      message: `${user.userId} has joined.`
    };
    addMessage(newMessage);
    updateParticipants(participantList); 
  };
  ChannelHandler.onUserExited = (openChannel, user) => {
    const participantList = getParticipantList(channel);
    const newMessage = {
      sender: "info",
      message: `${user.userId} has left.`
    };
    addMessage(newMessage);
    updateParticipants(participantList);
  };
  ChannelHandler.onMessageReceived = (channel, message) => {
    addMessage(message);
  };
  // Add channel event handler to the SendBird object.
  sb.addChannelHandler(channelHandlerID, ChannelHandler);
};

export const getMessages = channel => {
    return new Promise(resolve => {
      let messageListQuery = channel.createPreviousMessageListQuery();
      messageListQuery.limit = 30;
      messageListQuery.reverse = true;
      messageListQuery.load((messageList, error) => {
        if (error) return error;
        resolve(messageList);
      });
    });
  };

  export const getChannel = (sb, channelURL) => {
    return new Promise(resolve => {
      sb.OpenChannel.getChannel(channelURL, (channel, error) => {
        if (error) return error;
        resolve(channel);
      });
    });
  };
