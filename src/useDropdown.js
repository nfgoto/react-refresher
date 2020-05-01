import React, { useState } from "react";

// my custom hook
const useDropdown = (label, defaultState, options = []) => {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;
  const Dropdown = () => (
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

  return [state, Dropdown, setState];
};

export default useDropdown;
