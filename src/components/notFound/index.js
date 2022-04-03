import styled from 'styled-components';
import SmileyIcon from '../../assets/icons/Smiley@2x.svg';

const Typography = styled.p`
  font-size: 16px;
  color: #4e4e4e;
  font-weight: 400;
`;

const SmileyImage = styled.img`
  height: 24px;
  width: 24px;
`;

const NotFoundContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export default function NotFound() {
  return (
    <NotFoundContainer>
      <SmileyImage src={SmileyIcon} alt="not found" />
      <Typography>No results found</Typography>
    </NotFoundContainer>
  );
}
