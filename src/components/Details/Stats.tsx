import React from "react";

const DetailsStats = (props: any) => {
  return (
    <div className="flex items-center pt-4 rounded-lg">
      <div className="flex flex-shrink-0 items-center justify-center  h-10 w-10 rounded-lg bg-[#e2e2e2] text-[#4b4b4b]">
        {props.icon}
      </div>
      <div className="flex-grow flex flex-col ms-4">
        <span className="text-lg font-bold text-start">{props.value}</span>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">{props.label}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailsStats;
