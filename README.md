# Giphogram

Simple app, that uses Giphy API to
show infinite list of gif images matching the query.

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

1. User enters search query in the input field.
2. Query is reflected in brower query string.
3. Query is passed to the `SearchResults` component.
4. `SearchResults` component has 3 important effects:
   4.1 Watch browser window and document dimensions and scroll position.
   4.2 Create new instance of QuerySubscription for every incoming query.
   4.3 Ask api for more data if once subscription has new data and new data is needed.

# Few notes

## Testing

Testing is cruicial and important. I covered backend api with basic tests, howewever, hooks and components are not yet tested.

As far as I understand, current React version doesn't have a nice way of testing async updates, however, 16.9 would [release an async version of act](https://github.com/facebook/react/issues/15379), which will make unit testing of async hooks simplier.

Meanwhile, I would have used e2e tests to ensure async updates work, but I decided not to do this in this excersize to save time.

## Rendering performance

When too many gif images are displayed and animated, browser is having hard times.

In this excersice I didn't do any optimizations; in real applications, I would.

First thing that comes to my mind is virtualisation — hiding or somehow disabling images that are off screen.
