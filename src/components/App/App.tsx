import React from "react";
import "./App.css";
import { Input } from "../Input/Input";
import { SearchResults } from "../SearchResults/SearchResults";
import { EmptyState } from "../EmptyState/EmptyState";
import { useQueryString } from "../../hooks/useQueryString";
import { useThrottledValue } from "../../hooks/useThrottledValue";

function App() {
  const [query, setQuery] = useQueryString("search", "");
  const throttled = useThrottledValue(query, 300);

  return (
    <div className="App">
      <Input query={query} handleChange={nextValue => setQuery(nextValue)} />

      {query ? (
        <SearchResults query={throttled} />
      ) : (
        <EmptyState setQuery={setQuery} />
      )}
    </div>
  );
}

export default App;
