//https://github.com/kentcdodds/react-testing-library/issues/222

import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "react-testing-library";
import Login from "../login/Login";
import LoginButton from "../login/LoginButton";
import { createMemoryHistory } from "history";


describe("Login", () => {

  afterEach(cleanup);

  test("does entering a username work", () => {
    const usernameInput = render(<Login />).getByLabelText("Username");
    fireEvent.change(usernameInput, { target: { value: "testing" } });
    expect(usernameInput.value).toBe("testing");
  });

  test("does the login button render", () => {
    const loginButton = render(<LoginButton />).getByText("Submit");
    expect(loginButton).toBeDefined();
  });
});

describe("Login Button", () => {
  test("does it redirect?", () => {
    //global.window = { location: { pathname: null } };
    const history = createMemoryHistory({
      initialEntries: ["/"]
    });
    const props ={
      history: history,
      username: 'test', 
      setSB: jest.fn(),
    }
    const loginButton = render(<LoginButton {...props}/>).getByText("Submit");
    fireEvent.click(loginButton);
    //history.push("/channels");
    //console.log(history);
    //expect(history.location.pathname).toEqual("/channels");
    //expect(global.window.location.pathname).toEqual("/channels");
  })
})
