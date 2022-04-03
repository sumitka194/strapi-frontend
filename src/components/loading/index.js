import styled from 'styled-components';

const Dots = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${(props) => (props.color ? props.color : '#333')};
`;

const Typography = styled.p`
  font-size: 16px;
  color: #4e4e4e;
  font-weight: 400;
`;

export default function Loader() {
  return (
    <>
      <Dots color="#f9cb1c" />
      <Dots />
      <Dots color="#f9cb1c" />
      <Typography>Loading</Typography>
    </>
  );
}
