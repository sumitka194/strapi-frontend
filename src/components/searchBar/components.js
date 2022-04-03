import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  height: 4rem;
  width: 100%;
  background: #4e4e4e;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0px 2px 2px rgba(199,199,199,0.5));
  @media (min-width: 500px) {
    display: grid;
    grid-template-columns: repeat(12, [col-start] 1fr);
  }
`;

export const HeaderSection = styled.div`
  height: 100%;
  flex: 1;
  background: white;
  position: relative;
  @media (min-width: 500px) {
    grid-column: 1 / 4;
  }
`;

export const HeaderTitle = styled.h3`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 4px;
  color: #333333;
  font-weight: bold;
  position: absolute;
  top: 25%;
  left: 10%;
  @media (min-width: 500px) {
    margin: 0;
    font-size: 24px;
  }
`;

export const FilterContainer = styled.div`
  display: ${(props) => (props.openFilter ? '' : 'none')};
  position: absolute;
  top: 4rem;
  left: 0;
  background: white;
  width: 100%;
  @media (min-width: 500px) {
    display: grid;
    position: static;
    grid-row: 1;
    grid-column: 4 / 11;
    background: transparent;
    align-items: center;
  }
`;

export const FilterBody = styled.div`
  margin: 1.5rem;
  @media (min-width: 500px) {
    display: flex;
    gap: 2rem;
    margin: 0 3rem;
    height: 100%;
    align-items: center;
  }
`;

export const HeaderIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (min-width: 500px) {
    grid-row: 1;
    grid-column: 12;
  }
`;

export const HeaderIconWrapper = styled.span`
  background-color: #f9cb1c;
  display: flex;
`;

export const HeaderIcon = styled.img`
  margin: auto;
  padding: 0 2rem 0 2rem;
  cursor: pointer;
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
  @media (min-width: 500px) {
    display: none;
  }
`;

export const Typography = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => (props.color ? props.color : '#333333')};
`;

export const Input = styled.input`
  height: 2.75rem;
  width: 100%;
  color: rgba(38,38,39,1);
  @media (min-width: 500px) {
    border: none;
    border-bottom: 1px solid #fff;
    width: 10rem;
    color: white;
    background-color: #4e4e4e;
  }
`;

// export const Input = styled.input`
//   @media (min-width: 500px) {
//     border: none;
//     border-bottom: 1px solid #fff;
//     width: 10rem;
//     color: white;
//     background-color: #4e4e4e;
//   }
// `;

export const InputWrapperSuffix = styled.div`
  @media (min-width: 500px) {
    display: none;
    width: 10rem;
  }
`;
