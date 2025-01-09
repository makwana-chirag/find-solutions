import { KBarResults, useMatches } from "kbar";

export const RenderResults = () => {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div>{item}</div>
        ) : (
          <div
            style={{
              background: active ? "#eee" : "transparent",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            {item.name}
          </div>
        )
      }
    />
  );
};
