# Space Trip Booking Application

## Project Setup
Environment Variables
| Variables | Description |
| ------ | ------ |
| REACT_APP_MAPBOX_ACCESS_TOKEN | access token to access map |
| REACT_APP_ALGOLIA_APP_ID | APPID to access algolia |
| REACT_APP_ALGOLIA_APP_KEY | APPKEY to access algolia |

Scripts
```sh
#Install
npm install
#Run on localhost
npm run start
#Run Eslint
npm run lint
#Fix Eslint
npm run lint:fix
#Run test
npm run test
```
## State used
| State Name | Description |
| ------ | ------ |
| activeLoc | current location which can be set from map, search, and ListComponent, it is used to communicate among components |
| insideBoundingBox | bounding box of map to get the spacecenter data between these coordinates |
| moveCard | controls the card movement in case of activeLoc(active Location) change, this used to prevent card movement in case of change in activeLoc state triggered due to hover of card |
| centerMap | controls the marker movement in center, it is only triggered when activeLoc state change from the search bar |

## Features
- Initially loads the space center on map and add marker and loads card for all the marker shown on the map
- Hovering over card will change the color of the marker on map and rocket icon on card will bounce for 3s
- Clicking on marker on Map will bring the corresponding card in the viewport a shadow is added to the card and rocket icon will bounce for 3s
- Clicking in auto-complete input field will open the dropdown of the space centers on Earth and typing will show the suggestion for the releated keyword
- Selecting space center from the auto complete dropdown will only center the map to the corresponding space center when > icon will be clicked in the Header or save icon should be clicked in case of mobile view
- Test is written for Card component

## Features not working
- Date Filter is not working (Getting error while running the below query)
```js
query GET_FLIGHTS(
  $from: ID,
  $departureDay: Date
){
  flights(
    from: $from
    departureDay: $departureDay
  ) {
    pagination {
      total
    }
    nodes {
      departureAt
    }
  }
}
```
Error message
```
"message": "Unknown type \"Date\".",
"code": "GRAPHQL_VALIDATION_FAILED",
while the type of departureDay is of Date in the documentation in playground
```
- In Mobile view need to scroll to view the list of space centers card, although selecting marker will automatically move the card to viewport which means it also scrolls the screen to view the card