import React, { useState } from "react";

const useInput = () => {
  const [content, setContent] = useState("");

  const onChange = (event) => {
    setContent(event.currentTarget.value);
  };

  const reset = () => {
    setContent("");
  };

  return { content, onChange, reset };
};

export default useInput;
