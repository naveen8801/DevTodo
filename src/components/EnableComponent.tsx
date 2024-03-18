"use client";

import React from "react";
import toast from "react-hot-toast";

interface IProps {
  label: string;
  handleChange: (val: boolean) => any;
  checked: boolean;
  onSuccessMsg?: string;
}

const EnableComponent: React.FC<IProps> = (props): React.ReactElement => {
  const { label, handleChange, checked, onSuccessMsg } = props;

  const handleCheckBoxChange = async (val: boolean) => {
    const { data, error } = await handleChange(val);
    if (error) {
      toast.error(error);
    }
    if (data) {
      toast.success(onSuccessMsg || "Success");
    }
  };

  return (
    <div className="flex items-center gap-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          handleCheckBoxChange(e.target.checked!);
        }}
      />
      <label className="text-sm">{label}</label>
    </div>
  );
};

export default EnableComponent;
