/* eslint-disable no-promise-executor-return */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';

import ListCard from './card';
import { GET_FLIGHTS_WITHOUT_DATE, GET_SPACE_CENTER, GET_FLIGHTS } from './query';

const mocks = [
  {
    request: {
      query: GET_SPACE_CENTER,
      variables: {
        uid: '609c8e2f-5ff4-4579-be07-6bd6ffe0bc48',
      },
    },
    result: {
      data: {
        spaceCenter: {
          id: '558',
          name: 'Yost Divide Space Center',
          planet: {
            name: 'Earth',
          },
          latitude: 20.0348,
          longitude: -0.149,
        },
      },
    },
  }, {
    request: {
      query: GET_FLIGHTS_WITHOUT_DATE,
      variables: {
        from: '558',
      },
    },
    result: {
      data: {
        flights: {
          pagination: {
            total: 2360693,
          },
        },
      },
    },
  },
  {
    request: {
      query: GET_FLIGHTS,
      variables: {
        from: '558',
        departureDay: '2019-09-23',
      },
    },
    result: {
      data: {
        flights: {
          pagination: {
            total: 2360693,
          },
        },
      },
    },
  },
];

const setCenterMap = jest.fn();
const setActiveLoc = jest.fn();
const setMoveCard = jest.fn();
const setActiveCard = jest.fn();

describe('Space Center Listing Component', () => {
  it('should load card with total flight 2360693', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ListCard
          spaceCenter={{ uid: '609c8e2f-5ff4-4579-be07-6bd6ffe0bc48', _geoloc: { lat: '20.0348', lng: '-0.149' } }}
          activeLoc={{ lat: '20.0348', lng: '-0.149' }}
          setCenterMap={setCenterMap}
          setActiveLoc={setActiveLoc}
          setMoveCard={setMoveCard}
          setActiveCard={setActiveCard}
          moveCard={false}
          activeCard="609c8e2f-5ff4-4579-be07-6bd6ffe0bc48"
        />
      </MockedProvider>,
    );
    const ele = await screen.findByText('2360693 departures planned today');
    expect(ele).toBeInTheDocument();
  });

  it('should call setCenterMap and setMoveCard with false', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ListCard
          spaceCenter={{ uid: '609c8e2f-5ff4-4579-be07-6bd6ffe0bc48', _geoloc: { lat: '20.0348', lng: '-0.149' } }}
          activeLoc={{ lat: '20.0348', lng: '-0.149' }}
          setCenterMap={setCenterMap}
          setActiveLoc={setActiveLoc}
          setMoveCard={setMoveCard}
          setActiveCard={setActiveCard}
          moveCard={false}
          activeCard="609c8e2f-5ff4-4579-be07-6bd6ffe0bc48"
        />
      </MockedProvider>,
    );
    const ele = await screen.findByText('2360693 departures planned today');
    userEvent.hover(ele);
    expect(setCenterMap).toBeCalledWith(false);
    expect(setMoveCard).toBeCalledWith(false);
  });
});
