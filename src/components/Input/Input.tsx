import React from "react";
import "./Input.css";
interface Props {
  query: string;
  handleChange(nextValue: string): void;
}

export const Input: React.FC<Props> = ({ query, handleChange }) => {
  return (
    <form>
      <input
        className="search-input"
        type="text"
        value={query}
        placeholder="Search..."
        onChange={e => handleChange(e.target.value)}
        data-testid="input"
      />
    </form>
  );
};
