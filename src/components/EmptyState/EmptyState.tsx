import React from "react";
import "./EmptyState.css";

interface Props {
  setQuery(query: string): void;
}

const suggestions = [
  ["🐱", "kittens"],
  ["🐶", "puppies"],
  ["🐼", "pandas"],
  ["🐇", "rabbits"]
];

export const EmptyState: React.FC<Props> = ({ setQuery }) => {
  return (
    <div className="emptystate">
      <h3>Hello there!</h3>
      <p>Try searching some gifs by typing or clicking suggestions below.</p>
      <div className="emptystate-buttons">
        {suggestions.map(([icon, term]) => {
          return (
            <button
              key={term}
              className="emptystate-button"
              onClick={() => setQuery(term)}
            >
              {icon}
            </button>
          );
        })}
      </div>
    </div>
  );
};
