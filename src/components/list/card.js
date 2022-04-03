import { useQuery } from '@apollo/client';
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Rocket from '../../assets/icons/Rocket@2x.svg';
import {
  Button, Card, CardBody, CardData, CardImage, FlightCountText,
  Image, PlanetText, SpaceCenterText,
} from './components';
import { GET_FLIGHTS, GET_FLIGHTS_WITHOUT_DATE, GET_SPACE_CENTER } from './query';

export default function ListCard({
  spaceCenter, departureDay = '', activeLoc, setCenterMap,
  setActiveLoc, moveCard, setMoveCard, activeCard, setActiveCard,
}) {
  const cardRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const { uid, _geoloc } = spaceCenter;
  const { data } = useQuery(GET_SPACE_CENTER, { variables: { uid } });
  const fightVairables = data && { from: data.spaceCenter.id };
  const flightQuery = departureDay ? GET_FLIGHTS : GET_FLIGHTS_WITHOUT_DATE;
  useEffect(() => {
    if (activeLoc && (activeLoc.lat === _geoloc.lat || activeLoc.lng === _geoloc.lng)) {
      if (moveCard) {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setActiveCard(uid);
      setAnimate(true);
    }
  }, [activeLoc, moveCard]);

  useEffect(() => {
    if (animate) {
      setTimeout(() => {
        setAnimate(false);
      }, 3000);
    }
  }, [animate]);
  if (departureDay) {
    fightVairables.departureDay = departureDay;
  }
  const { data: flightData } = useQuery(flightQuery, {
    skip: !data,
    variables: fightVairables,
  });
  if (!data || !flightData) {
    return null;
  }
  const onCardHover = () => {
    setCenterMap(false);
    setMoveCard(false);
    setActiveLoc(_geoloc);
  };

  return (
    <Card isActive={activeCard === uid} ref={cardRef} onMouseEnter={onCardHover}>
      <CardBody>
        <CardData>
          <SpaceCenterText>{data.spaceCenter.name}</SpaceCenterText>
          <PlanetText>{data.spaceCenter.planet.name}</PlanetText>
          <FlightCountText>
            {flightData.flights.pagination.total}
            {' '}
            departures planned today
          </FlightCountText>
        </CardData>
        <CardImage>
          <Image src={Rocket} animate={animate} />
        </CardImage>
      </CardBody>
      <Button>SEE ALL FLIGHTS</Button>
    </Card>
  );
}

ListCard.propTypes = {
  spaceCenter: PropTypes.objectOf({
    uid: PropTypes.string.isRequired,
    _geoloc: PropTypes.objectOf({
      lat: PropTypes.string.isRequired,
      lng: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  departureDay: PropTypes.string.isRequired,
  activeLoc: PropTypes.bool.isRequired,
  setActiveLoc: PropTypes.func.isRequired,
  moveCard: PropTypes.bool.isRequired,
  setMoveCard: PropTypes.func.isRequired,
  activeCard: PropTypes.string.isRequired,
  setActiveCard: PropTypes.func.isRequired,
  setCenterMap: PropTypes.func.isRequired,
};
