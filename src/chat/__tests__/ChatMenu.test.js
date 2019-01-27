import React from "react";
import { createShallow } from "@material-ui/core/test-utils";
import ChatMenu from "../ChatMenu";

describe("<ChatMenu />", () => {
  let shallow;
  const props = {
    participants: ["test1", "test2", "test3"],
    channel: { isOperatorWithUserId: jest.fn() }, //get this to return true
    sb: { getCurrentUserId: jest.fn() }
  };

  beforeEach(() => {
        //shallow = createShallow({dive: true});
        shallow = createShallow();
    })

  test("does it render", () => {
    const wrapper = shallow(<ChatMenu {...props} />);
    expect(wrapper).toBeDefined();
  });

});
