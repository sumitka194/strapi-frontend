/* eslint-disable */
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Rocket from '../../assets/icons/Rocket@2x.svg';

const bounce = keyframes`
  0% { transform: translateY(-5px)  }
  50% { transform: translateY(10px) }
  100% { transform: translateY(-5px) }
`;

const Card = styled.div`
  margin: 1.5rem;
  min-width: 20rem;
  box-shadow: ${props => (props.isActive ? css`0 3px 10px rgb(0 0 0 / 0.2)` : '')};
  background-color: #fff;
  @media (min-width: 500px) {
    min-width: 0;
  }
`;
const CardBody = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
`;

const CardData = styled.div`
  flex: 3;
`;

const CardImage = styled.div`
  flex: 1;
  padding: 1.2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #4e4e4e;
  color: #fafafb;
  letter-spacing: 1px;
  font-weight: 400;
  width: 100%;
  border: none;
  font-size: 12px;
`;

const SpaceCenterText = styled.p`
  font-size: 16px;
  font-weight: 700;
  @media (max-width: 500px) {
    min-height: 40px;
  }
`;

const FlightCountText = styled.p`
  font-weight: 400;
`;

const PlanetText = styled.p`
  width: 65px;
  height: 15px;
  font-size: 12px;
`;

const Image = styled.img`
  animation: ${props => (props.animate ? css`${bounce} 1s linear infinite` : '')};
`

const GET_SPACE_CENTER = gql`
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

const GET_FLIGHTS = gql`
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

const GET_FLIGHTS_WITHOUT_DATE = gql`
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

export default function ListCard({
  spaceCenter, departureDay = '', activeLoc, setActiveLoc, moveCard, setMoveCard, activeCard, setActiveCard,
}) {
  const cardRef = useRef(null)
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
    fightVairables.departureDay = departureDay
  }
  const { data: flightData } = useQuery(flightQuery, {
    skip: !data,
    variables: fightVairables
  });
  if (!data || !flightData) {
    return null;
  }
  const onCardHover = () => {
    setMoveCard(false);
    setActiveLoc(_geoloc);
  }

  return (
    <Card isActive={activeCard === uid} ref={cardRef} onMouseEnter={onCardHover}>
      <CardBody>
        <CardData>
          <SpaceCenterText>{data.spaceCenter.name}</SpaceCenterText>
          <PlanetText>{data.spaceCenter.planet.name}</PlanetText>
          <FlightCountText>{flightData.flights.pagination.total} departures planned today</FlightCountText>
        </CardData>
        <CardImage>
          <Image src={Rocket} animate={animate} />
        </CardImage>
      </CardBody>
      <Button>SEE ALL FLIGHTS</Button>
    </Card>
  );
}
