import { StrictMode } from "react";
import ReactDOM from "react-dom";

import AalList from "./AalList";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <AalList />
  </StrictMode>,
  rootElement
);
