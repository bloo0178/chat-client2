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
