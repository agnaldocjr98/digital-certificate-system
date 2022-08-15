import React from "react";
import { ToastContainer } from "react-toastify";

export const Toast = () => {
  return (
    <ToastContainer
      theme="colored"
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
