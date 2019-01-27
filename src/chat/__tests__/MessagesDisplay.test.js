import React from 'react';
import {createShallow } from '@material-ui/core/test-utils';
import MessagesDisplay from "../MessagesDisplay";

describe("<MessagesDisplay />", () => {
    let shallow; 
    const props = {
        messages: [
          { sender: "You", message: "test-you" },
          { sender: "someoneElse", message: "other-test" },
          { sender: "info", message: "someone has left" }
        ]
      };

    beforeEach(() => {
        shallow = createShallow({dive: true});
    })

    test("does it render", () => {
        const wrapper = shallow(<MessagesDisplay {...props} />);
        expect(wrapper).toBeDefined();
    })

})