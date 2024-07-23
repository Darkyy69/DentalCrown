// Loading.js
import React from "react";
import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="animate-spin">
      <LoaderCircle size="2em" />
    </div>
  );
};

export default Loading;
