import React from "react";
import { TablesProps } from "./TablesProps.model";
import { TablesTemp } from "./TablesTemp";

export const Tables: React.FC<TablesProps> = () => {
  return (
    <div>
      <TablesTemp />
    </div>
  );
};
