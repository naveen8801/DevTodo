import React, { HTMLProps } from "react";

interface IProp {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const SearchField: React.FC<IProp> = (props): React.ReactElement => {
  const { value, onChange, placeholder } = props;
  return (
    <input
      className="w-full h-10 px-4 py-2 text-sm rounded-lg bg-slate-200 dark:bg-black dark:text-slate-400 outline-none"
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default SearchField;
