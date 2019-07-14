import { useState, useEffect } from "react";

/**
 * This hook implements one-way binding of
 * a state variable to the query string.
 *
 * State changes are reflected in query string,
 * but changes to query string do not affect state.
 */
export const useQueryString = (
  key: string,
  defaultValueFromProps: string = ""
): any => {
  const url = new URL(window.location.href);
  const defaultValueFromQs = url.searchParams.get(key);
  const defaultValue = defaultValueFromQs || defaultValueFromProps;
  const [state, setState] = useState<string>(defaultValue);

  useEffect(() => {
    url.searchParams.set(key, state);

    window.history.replaceState(
      {
        [key]: url.searchParams.toString()
      },
      `Search for "${state}"`,
      url.toString()
    );
  }, [state, key, url]);

  return [state, setState];
};
