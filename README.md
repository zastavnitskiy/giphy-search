# Giphy Search

Simple app that uses Giphy API to
show an infinite list of gif images matching the query.

## Running

Install dependencies.
`yarn`

Tests:
`GIPHY_API_KEY=<place your giphy api key here> yarn test`

Run
`GIPHY_API_KEY=<place your giphy api key here> yarn start`

# Structure

The application is bootstrapped using create-react-app. The main entry point is
`index.js`, which renders `<App />`.

The data flow in the app happens in the following way:

1. The user enters a search query in the input field.
2. Query is reflected in browser query string.
3. Query is passed to the `SearchResults` component.
4. `SearchResults` component has 3 important effects:

   - 4.1 Watch browser window and document dimensions and scroll position.
   - 4.2 Create a new instance of QuerySubscription for every incoming query.
   - 4.3 Ask API for more data if once the subscription has new data and new data is needed.

# Few notes

## Testing

Testing is crucial and essential. I covered the backend API with necessary tests; however, hooks and components are not yet tested.

As far as I understand, current React version doesn't have a nice way of testing async updates, however, 16.9 would [release an async version of act](https://github.com/facebook/react/issues/15379), which will make unit testing of async hooks simpler.

Meanwhile, I would have used e2e tests to ensure async updates work, but I decided not to do this in this exercise to save time.

## Rendering performance

When too many gif images are displayed and animated, the browser is having hard times.

In this exercise I didn't do any optimizations; in a production application, I would.

The first thing that comes to my mind is virtualisation — hiding or somehow disabling images that are off-screen.
