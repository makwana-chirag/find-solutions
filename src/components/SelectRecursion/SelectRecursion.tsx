import { SelectTree } from "./SelectTree";

export const SelectRecursion = () => {
  const selectMenuData = [
    {
      label: "IPL",
      id: 1,
      child: [{ id: 1, label: "GT", child: null }],
    },
    {
      label: "WORLD",
      id: 2,
      child: [
        {
          id: 1,
          label: "COUNTRY",
          child: [
            {
              id: 1,
              label: "INDIA",
              child: [
                { id: 1, label: "GUJARAT", child: null },
                { id: 1, label: "DELHI", child: null },
                { id: 1, label: "GOA", child: null },
                { id: 1, label: "KERALA", child: null },
                { id: 1, label: "MEGHALAY", child: null },
              ],
            },
            {
              id: 2,
              label: "USA",
              child: [
                { id: 1, label: "NEW YORK", child: null },
                { id: 1, label: "TEXAS", child: null },
                { id: 1, label: "NEW MAXICO", child: null },
                { id: 1, label: "CALIFONIA", child: null },
                { id: 1, label: "NEWADA", child: null },
              ],
            },
            { id: 3, label: "UK", child: null },
            { id: 4, label: "RUSSIA", child: null },
            { id: 5, label: "CHINA", child: null },
          ],
        },
      ],
    },
  ];

  return (
    <form className="flex flex-col">
      {selectMenuData?.map((node) => (
        <SelectTree key={node.id} node={node} />
      ))}
    </form>
  );
};
