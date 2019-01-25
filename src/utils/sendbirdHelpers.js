/*
 * Functions used within Chat.jsx, NavMenu.jsx, and ChatMenu.jsx
 */

export const exitChannel = curChannel => {
  return new Promise(resolve => {
    curChannel.exit((response, error) => {
      if (error) console.log(error);
      resolve();
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
