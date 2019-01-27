import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import Chat from "../chat/Chat";
import ChatHeader from "../chat/ChatHeader";
import ChatMenu from "../chat/ChatMenu";
import MessagesDisplay from "../chat/MessagesDisplay";
import { SharedSnackbarProvider } from "../common/SharedSnackbar.context";

describe("Channels", () => {
  afterEach(cleanup);

  describe("Chat Menu", () => {
    afterEach(cleanup);

    test("does it render", () => {
      const props = {
        participants: ["test1", "test2", "test3"],
        channel: { isOperatorWithUserId: jest.fn() }, //get this to return true
        sb: { getCurrentUserId: jest.fn() }
      };
      const wrapper = render(<ChatMenu {...props} />);
      const chatMenuButton = wrapper.getByTestId("chatMenuButton");
      expect(chatMenuButton).toBeDefined();
    });

    //test("is the delete button disabled for a non-operator", ()=> {
    test("the delete button can be navigated to and clicked", () => {
      const props = {
        participants: ["test1", "test2", "test3"],
        channel: { isOperatorWithUserId: jest.fn() }, //get this to return true
        sb: { getCurrentUserId: jest.fn() }
      };
      const customRender = (node, options) => {
        return render(
          <SharedSnackbarProvider>{node}</SharedSnackbarProvider>,
          options
        );
      };
      const wrapper = customRender(<ChatMenu {...props} />);
      //const instance = wrapper.instance(); // need to use enyzme for this approach...
      //const spy = jest.spyOn(ChatMenu.prototype, 'handleDelete');
      const chatMenuButton = wrapper.getByTestId("chatMenuButton");
      fireEvent.click(chatMenuButton);
      const deleteButton = wrapper.getByText("Delete Channel");
      expect(deleteButton).toBeDefined();
      fireEvent.click(deleteButton);
    });
  });

  describe("Messages Display", () => {
      let wrapper;
      const props = {
        messages: [
          { sender: "You", message: "test-you" },
          { sender: "someoneElse", message: "other-test" },
          { sender: "info", message: "someone has left" }
        ]
      };
      beforeEach(() =>
        wrapper = render(<MessagesDisplay {...props}/>)
        )
      afterEach(cleanup);
    
    test("does it render", () => {
      expect(wrapper).toBeDefined();
    });
  });
});

//render a few messages as props
// test that delete button is inactive for non-operator
