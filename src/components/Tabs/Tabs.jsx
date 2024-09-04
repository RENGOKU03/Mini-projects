import React from "react";
import Tab from "./Tab";

const Tabs = () => {
  const tabs = [
    {
      label: "Tab 1",
      content: <div>Content Of tab 1</div>,
    },
    {
      label: "Tab 2",
      content: <div>Content Of tab 2</div>,
    },
    {
      label: "Tab 3",
      content: <div>Content Of tab 3</div>,
    },
  ];
  return <Tab tabsContent={tabs} />;
};

export default Tabs;
