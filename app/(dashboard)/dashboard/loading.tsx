import React from "react";

const Loading = () => {
  return (
    <div className="z-[999] h-full w-full grid place-content-center ">
      <p className="animate-pulse text-foreground">Loading...</p>
    </div>
  );
};

export default Loading;
