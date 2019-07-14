import React, { useState, useEffect, useReducer } from "react";
import {
  QuerySubscription,
  Status,
  QueryState
} from "../../api/QuerySubscription";
import { ImageList } from "../ImageList/ImageList";
import { Status as InlineStatus } from "../Status/Status";
import { useIsCloseToBottom } from "../../hooks/useIsCloseToBottom";

interface SubscriptionAction {
  type: "subscription";
  nextState: QueryState;
}

interface ResetAction {
  type: "reset";
}

type Action = SubscriptionAction | ResetAction;

const reducer: React.Reducer<QueryState, Action> = (state, action) => {
  switch (action.type) {
    case "subscription":
      return action.nextState;
    case "reset":
      return { ...state, data: [] };
    default:
      return state;
  }
};

interface Props {
  query: string;
}

export const SearchResults: React.FC<Props> = ({ query }) => {
  const [subscription, setSubscription] = useState<null | QuerySubscription>(
    null
  );

  const [state, dispatch] = useReducer(reducer, {
    status: Status.idle,
    data: [],
    total: Number.MAX_SAFE_INTEGER
  });

  const hasResults = state.total > 0;
  const hasMore = state.total > state.data.length;
  const needsMore = useIsCloseToBottom([state.data]);
  const isFetching = state.status === Status.fetching;
  const isBroken = state.status === Status.error;

  /**
   * Handle query and subscription —
   * create new instance of subscription
   * every time query is changed and subscribe to changes.
   *
   * No data fetching is happening in this effect yet.
   */
  useEffect(() => {
    let isCurrent = true;
    if (!query) {
      return;
    }
    const subscription = new QuerySubscription({
      query,
      subscriber: nextState => {
        if (isCurrent) {
          dispatch({
            type: "subscription",
            nextState
          });
        }
      }
    });

    setSubscription(subscription);
    dispatch({
      type: "reset"
    });

    return () => {
      isCurrent = false;
    };
  }, [query, dispatch]);

  /**
   * This effect is responsible for actually
   * fetching the data, is it the first fetch or
   * the next ones.
   */
  useEffect(() => {
    if (query && subscription && needsMore && hasMore) {
      subscription.fetch();
    }
  }, [query, subscription, needsMore, hasMore]);

  let status = null;

  if (isFetching) {
    status = "⏳ Loading...";
  } else if (hasResults && !hasMore) {
    status = "🏁 That's all!";
  } else if (!hasResults) {
    status = "🤷 Sorry, can't find anything.";
  } else if (isBroken) {
    status = "Something went wrong.";
  }

  return (
    <>
      <ImageList items={state.data} />
      <InlineStatus>{status}</InlineStatus>
    </>
  );
};
