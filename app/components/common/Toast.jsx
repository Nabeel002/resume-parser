import React from "react";

const Toast = (message) => {
  return (
    <div id="toast-bottom-left" className="fixed flex items-center w-full max-w-xs p-4 text-body bg-neutral-primary-soft rounded-base shadow-xs border border-default bottom-5 start-5" role="alert">
      <div className="text-sm font-normal">{message}</div>
    </div>
  );
};

export default Toast;
