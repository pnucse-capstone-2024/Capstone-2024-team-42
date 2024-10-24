import { useState } from "react";

const useTextarea = (input: string) => {
  const [value, setValue] = useState(input);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  return { value, setValue, onChange };
};

export default useTextarea;
