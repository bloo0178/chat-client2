import React from "react";
import { render } from "react-testing-library";
import { GlobalStateProvider } from "./common/GlobalState.context";

// https://github.com/kentcdodds/testing-workshop/blob/92c6d4d4de8ee1c351aca8e53010428ad1dd9a0c/client/test/til-client-test-utils.js#L8-L18

const customRender = (node, options) => {
  return render(<GlobalStateProvider>{node}</GlobalStateProvider>, options);
};

// re-export everything
export * from "react-testing-library";

// override render method
export { customRender as render };









/* PREVIOUS WORKING IMPELEMENTATION 

import React from "react";
import { render } from "react-testing-library";
import { GlobalStateProvider } from "./common/GlobalState.context";

const customRender = (node, options) => {
  return render(<GlobalStateProvider>{node}</GlobalStateProvider>, options);
};

// re-export everything
export * from "react-testing-library";

// override render method
export { customRender as render };

*/
