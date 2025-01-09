import { useState, useEffect } from "react";

export const SelectTree = ({
  node,
}: {
  node: { id: number; label: string; child: any[] };
}) => {
  const [childNodes, setChildNodes] = useState<any[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const { label } = node;

  useEffect(() => {
    if (node.child && node.child.length) {
      setChildNodes(node.child);
    }
  }, [node.child]);

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const renderChildNodes = () => {
    if (childNodes?.length) {
      return (
        <div className="pl-4">
          {childNodes.map((childNode) => (
            <SelectTree key={childNode.id} node={childNode} />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className="cursor-pointer"
        onClick={toggleExpand}
        style={{
          fontWeight: "bold",
          padding: "5px 10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        {label}
        {childNodes?.length ? (
          <span style={{ marginLeft: "10px" }}>{isExpanded ? "▼" : "▶"}</span>
        ) : null}
      </div>
      {isExpanded && renderChildNodes()}
    </div>
  );
};
