import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch,
} from "kbar";
import { WorldMapWithMultipleMarkers } from "./components/WorldMapWithMultipleMarkers";
import { HtmlCodeEditor } from "./components/HtmlCodeEditor";
import { SelectRecursion } from "./components/SelectRecursion/SelectRecursion";
import { RenderResults } from "./components/RenderResults/RenderResults";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Join } from "./view/ChatApp/Components/Join/Join";
// import { Chat } from "./view/ChatApp/Components/Chat/Chat";

const App = () => {
  const actions = [
    {
      id: "blog",
      name: "Blog",
      shortcut: ["b"],
      keywords: "writing words",
      perform: () => (window.location.pathname = "blog"),
    },
    {
      id: "contact",
      name: "Contact",
      shortcut: ["c"],
      keywords: "email",
      perform: () => (window.location.pathname = "contact"),
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner>
          <KBarAnimator>
            <KBarSearch />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      <div>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Find Solution to Your Daily Problems</h1>
      </div>
      <Router>
        <Routes>
          <Route path="/worldmap" element={<WorldMapWithMultipleMarkers />} />
          <Route path="/html-editor" element={<HtmlCodeEditor />} />
          <Route path="/recursion" element={<SelectRecursion />} />
        </Routes>
      </Router>
    </KBarProvider>
  );
};

export default App;
