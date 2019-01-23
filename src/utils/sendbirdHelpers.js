export const createChannel = (sb, channelName) => {
  const userID = sb.currentUser.userId;
  return new Promise(resolve => {
    // Array adds the oepratorID's to the channel to provide admin privs.
    sb.OpenChannel.createChannel(
      channelName,
      null,
      null,
      ["admin", userID],
      (channel, error) => {
        if (error) return console.log(error);
        resolve(channel.url);
      }
    );
  });
};

export const enterChannel = (sb, channelURL) => {
  return new Promise(async resolve => {
    sb.OpenChannel.getChannel(channelURL, (channel, error) => {
      if (error) return console.log(error);
      channel.enter((response, error) => {
        if (error) return console.log(error);
        console.log(channel);
        resolve(channel); 
      });
    });
  });
};

export const exitChannel = (sb, curChannel) => {
  return new Promise(resolve => {
    //sb.removeChannelHandler(channelHandlerID); ---> makeChannelHandlerID = channelURL
    sb.removeAllChannelHandlers();
    curChannel.exit((response, error) => {
      if (error) console.log(error);
      //clearMessages(); // could use load previous messages and get rid of this entirely...
      resolve(() => console.log('success')); 
    });
  });
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


