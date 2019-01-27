import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import Channels from "../channels/Channels";
import ChannelsList from "../channels/ChannelList";
import { createMemoryHistory } from "history";

describe("Channels", () => {
  afterEach(cleanup);

  test("does it render everything", () => {
    const wrapper = render(<Channels />);
    const channelList = wrapper.getByText("Channels");
    const createChannelBtn = wrapper.getByTestId("create-channel-button");
    const title = wrapper.getByText("react.chat");
    //const cancelBtn = wrapper.getByText("Cancel");
    expect(channelList).toBeDefined();
    expect(createChannelBtn).toBeDefined();
    expect(title).toBeDefined();
    //expect(cancelBtn).toBeDefined();
  });
});

describe("CreateChannel", () => {
  afterEach(cleanup);

  test("does the create channel button work", () => {
    const wrapper = render(<Channels />);
    const createChannelBtn = wrapper.getByTestId("create-channel-button");
    fireEvent.click(createChannelBtn);
    const cancelBtn = wrapper.getByText("Cancel");
    expect(cancelBtn).toBeDefined();
  });
});

describe("ChannelsList", () => {
  afterEach(cleanup);
  test("channel list buttons render correctly", () => {
    const props = {
      channels: [
        { name: "channel1", url: "test1.com" },
        { name: "channel2", url: "test2.com" }
      ],
      enterChannel: jest.fn()
    };
    const wrapper = render(<ChannelsList {...props} />);
    const channelButton1 = wrapper.getByText("channel1");
    const channelButton2 = wrapper.getByText("channel2");
    expect(channelButton1).toBeDefined();
    expect(channelButton2).toBeDefined();
  });

  test("clicking a channel button should call handleClick", () => {
    const history = createMemoryHistory({ initialEntries: ["/channels"] });
    const props = {
      channels: [
        { name: "channel1", url: "test1.com" },
        { name: "channel2", url: "test2.com" }
      ],
      enterChannel: jest.fn(),
      history
    };

    const wrapper = render(<ChannelsList {...props} />);
    const channelButton1 = wrapper.getByText("channel1");
    fireEvent.click(channelButton1);
    expect(props.enterChannel).toHaveBeenCalledWith("test1.com");
    //console.log(history); // want to test redirect... This is not working.
  });
});
