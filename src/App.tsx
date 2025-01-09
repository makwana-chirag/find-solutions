import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch,
} from "kbar";
// import { WorldMapWithMultipleMarkers } from "./components/WorldMapWithMultipleMarkers";
// import HTMLEditor from "./components/HTMLEditor/HTMLEditor";
// import { HtmlCodeEditor } from "./components/HtmlCodeEditor";
import { SelectRecursion } from "./components/SelectRecursion/SelectRecursion";
import { RenderResults } from "./components/RenderResults/RenderResults";

function App() {
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
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Find Solution to You're Daily Problems</h1>
      {/* <WorldMapWithMultipleMarkers /> */}
      {/* <HTMLEditor /> */}
      {/* <HtmlCodeEditor /> */}
      <SelectRecursion />
    </KBarProvider>
  );
}

export default App;
