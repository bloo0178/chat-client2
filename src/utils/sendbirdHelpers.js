export const createChannel = (sendbird, channelName) => {
  const userID = sendbird.currentUser.userId;
  return new Promise(resolve => {
    // Array adds the oepratorID's to the channel to provide admin privs.
    sendbird.OpenChannel.createChannel(
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
        resolve(() => {console.log('success')}); 
      });
    });
  });
};

export const exitChannel = (sb, curChannel, clearMessages) => {
  return new Promise(resolve => {
    //sb.removeChannelHandler(channelHandlerID); ---> makeChannelHandlerID = channelURL
    sb.removeAllChannelHandlers();
    curChannel.exit((response, error) => {
      if (error) console.log(error);
      clearMessages(); // could use load previous messages and get rid of this entirely...
      resolve(() => console.log('success')); 
    });
  });
};
