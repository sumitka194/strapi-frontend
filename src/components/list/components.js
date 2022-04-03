import styled, { keyframes, css } from 'styled-components';

const bounce = keyframes`
  0% { transform: translateY(-5px)  }
  50% { transform: translateY(10px) }
  100% { transform: translateY(-5px) }
`;

export const Card = styled.div`
  margin: 1.5rem;
  min-width: 20rem;
  box-shadow: ${(props) => (props.isActive ? css`0 3px 10px rgb(0 0 0 / 0.2)` : '')};
  background-color: #fff;
  @media (min-width: 500px) {
    min-width: 0;
  }
`;

export const CardBody = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
`;

export const CardData = styled.div`
  flex: 3;
`;

export const CardImage = styled.div`
  flex: 1;
  padding: 1.2rem;
`;

export const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #4e4e4e;
  color: #fafafb;
  letter-spacing: 1px;
  font-weight: 400;
  width: 100%;
  border: none;
  font-size: 12px;
`;

export const SpaceCenterText = styled.p`
  font-size: 16px;
  font-weight: 700;
  @media (max-width: 500px) {
    min-height: 40px;
  }
`;

export const FlightCountText = styled.p`
  font-weight: 400;
`;

export const PlanetText = styled.p`
  width: 65px;
  height: 15px;
  font-size: 12px;
`;

export const Image = styled.img`
  animation: ${(props) => (props.animate ? css`${bounce} 1s linear infinite` : '')};
`;
