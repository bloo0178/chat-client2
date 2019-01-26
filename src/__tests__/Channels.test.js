import React from "react";
import {
  render,
  fireEvent,
  cleanup,
} from "react-testing-library";
import Channels from "../channels/Channels"

describe("Channels", () => {
    afterEach(cleanup);
    

    test("does it render", ()=> {
        const wrapper = render(<Channels />)
        const channelList = wrapper.getByText("Channels");
        const createChannelBtn = wrapper.getByTestId("create-channel-button")
        const title = wrapper.getByText("react.chat");
        //const cancelBtn = wrapper.getByText("Cancel");
        expect(channelList).toBeDefined();
        expect(createChannelBtn).toBeDefined();
        expect(title).toBeDefined();
        //expect(cancelBtn).toBeDefined();
    }); 

    test("does the create channel button work", () => {
        const wrapper = render(<Channels />)
        const createChannelBtn = wrapper.getByTestId("create-channel-button");
        fireEvent.click(createChannelBtn);
        const cancelBtn = wrapper.getByText("Cancel");
        expect(cancelBtn).toBeDefined();
    })


})