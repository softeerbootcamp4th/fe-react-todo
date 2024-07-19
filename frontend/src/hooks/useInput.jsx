import React, { useState } from "react";

const useInput = () => {
  const [content, setContent] = useState("");

  const onChange = (event) => {
    setContent(event.currentTarget.value);
  };

  const resetContent = () => {
    setContent("");
  };

  return { content, onChange, resetContent, setContent };
};

export default useInput;
