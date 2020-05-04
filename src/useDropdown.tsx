import React, { useState, FunctionComponent, Dispatch } from "react";

// my custom hook
const useDropdown = (
  label: string,
  defaultState: string,
  options: string[]
) => {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;
  const Dropdown: FunctionComponent = () => (
    <div>
      <label htmlFor={id}>
        {label}
        <select
          id={id}
          value={state}
          onChange={(e) => setState(e.target.value)}
          onBlur={(e) => setState(e.target.value)}
          disabled={options.length === 0}
        >
          <option>All</option>
          {options.map((opt) => (
            <option key={id + opt.toLowerCase()} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    </div>
  );

  // be specific about type of element at position
  return [state, Dropdown, setState] as [
    string,
    FunctionComponent,
    Dispatch<string>
  ];
};

export default useDropdown;
