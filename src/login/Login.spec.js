import React from "react";
//import { mount, shallow } from "enzyme";
import { createShallow, createMount } from "@material-ui/core/test-utils";
import Login from "./Login";

describe("<Login />", () => {
  let shallow;
  let wrapper;
  //console.log(wrapper.find('div').debug()); <--need to place within function

  beforeAll(() => {
    shallow = createShallow({ dive: true });
    wrapper = shallow(<Login />);
  });

  it("should render correctly", () => expect(wrapper).toMatchSnapshot());

  it("should render a <div>", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });

  it("should render an <h1>", () => {
    expect(wrapper.find("h1").length).toEqual(1);
  });

  describe("Username input", () => {
    it("should respond to change event and change the state of the Login Component", () => {
      wrapper
        .find("#username")
        .simulate("change", { target: { name: "username", value: "test" } });
      expect(wrapper.state("username")).toEqual("test");
    });
    it("should clear input upon submitting a valid non-null name", () => {
        wrapper
        .find('#username')
        .simulate("change", { target: { name: "username", value: "test" }});
        wrapper
        .find("#submit-username").simulate('click');
        expect(wrapper.state("username")).toEqual('');
    })
  });


});

describe("<Login /> (mounted)", () => {
  let wrapper;
  let mount;

  beforeAll(() => {
    mount = createMount();
    wrapper = mount(<Login />);
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it("should work", () => {
    wrapper = mount(<Login />);
  });

 
});
