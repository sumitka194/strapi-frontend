import { gql } from '@apollo/client';

export const GET_SPACE_CENTER = gql`
  query GET_SPACE_CENTER($uid: String){
    spaceCenter(uid: $uid) {
      id
      name
      planet {
        name
      }
      latitude
      longitude
    }
  }
`;

export const GET_FLIGHTS = gql`
  query GET_FLIGHTS($from: ID, $departureDay: Date){
    flights(
      from: $from
      departureDay: $departureDay
    ) {
      pagination {
        total
      }
    }
  }
`;

export const GET_FLIGHTS_WITHOUT_DATE = gql`
  query GET_FLIGHTS($from: ID){
    flights(
      from: $from
    ) {
      pagination {
        total
      }
    }
  }
`;
