"use client";

type SortOption = {
  value: string;
  label: string;
};

type SortDropdownProps = {
  label: string;
  value: string;
  options: SortOption[];
  onChange: (value: string) => void;
};

const SortDropdown = ({
  label,
  value,
  options,
  onChange,
}: SortDropdownProps) => {
  return (
    <div className="sort-toolbar">
      <span className="sort-label">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="sort-select"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
