/* eslint-disable */
import { useState } from 'react';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch, Configure, connectSearchBox,
} from 'react-instantsearch-dom';
import styled from 'styled-components';
import AutoComplete from './autoComplete';
import ArrowIcon from '../../assets/icons/Arrow.svg';
import SearchIcon from '../../assets/icons/Search.svg';
import CrossIcon from '../../assets/icons/cross.svg';
import useWindowDimensions from '../../hooks/dimension';

const Header = styled.header`
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

const HeaderSection = styled.div`
  height: 100%;
  flex: 1;
  background: white;
  position: relative;
  @media (min-width: 500px) {
    grid-column: 1 / 4;
  }
`;

const HeaderTitle = styled.h3`
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

const FilterContainer = styled.div`
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

const FilterBody = styled.div`
  margin: 1.5rem;
  @media (min-width: 500px) {
    display: flex;
    gap: 2rem;
    margin: 0 3rem;
    height: 100%;
    align-items: center;
  }
`;

const HeaderIconContainer = styled.div`
  background-color: #f9cb1c;
  display: flex;
  @media (min-width: 500px) {
    grid-row: 1;
    grid-column: 12;
    ${'' /* max-width: 15rem; */}
  }
`;

const HeaderIcon = styled.img`
  margin: auto;
  padding: 0 2rem 0 2rem;
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
  @media (min-width: 500px) {
    display: none;
  }
`;

const Typography = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.color ? props.color : '#333333'};
`;

const Input = styled.input`
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

const searchClient = algoliasearch('UORHJCOG49', '74fb98e8049e4753ce230f010774b425');

const VirtualSearchBox = connectSearchBox(() => null);

function MobileIcons({ openFilter, setOpenFilter }) {
  if (openFilter) {
    return (<HeaderIcon src={CrossIcon} onClick={() => setOpenFilter(false)} />);
  }
  return (
    <>
      <Typography style={{ margin: 'auto', padding: '0 1rem', color: 'white' }}>Look for a flight</Typography>
      <HeaderIcon src={SearchIcon} onClick={() => setOpenFilter(true)} />
    </>
  );
}

export default function SearchBar({
  children, insideBoundingBox, setActiveLoc, setMoveCard, setCenterMap,
}) {
  const [openFilter, setOpenFilter] = useState(false);
  const [itemSelected, setItemSelected] = useState({});

  const { innerWidth } = useWindowDimensions();
  const dynamicProps = insideBoundingBox ? { insideBoundingBox } : {};

  const applyFilter = () => {
    setOpenFilter(false);
    setMoveCard(true);
    setCenterMap(true);
    setActiveLoc(itemSelected?._geoloc);
  };

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="space-centers"
    >
      <Configure facets={['*,planet_code']} facetFilters={[['planet_code:EAR']]} {...dynamicProps} />
      <Header>
        <HeaderSection>
          <HeaderTitle>
            SPACE TRIPS
          </HeaderTitle>
        </HeaderSection>
        <VirtualSearchBox />
        <FilterContainer openFilter={openFilter}>
          <FilterBody>
            <Typography color='white'>Departure</Typography>
            <AutoComplete
              setItemSelected={setItemSelected}
              searchClient={searchClient}
              placeholder="Search"
              detachedMediaQuery="none"
              openOnFocus
            />
            <Typography color='white'>Departure time</Typography>
            <Input type="datetime-local" onChange={(e) => console.log(new Date(e.target.value).toISOString())} />
          </FilterBody>
          <Button onClick={applyFilter}>Save</Button>
        </FilterContainer>
        <HeaderIconContainer>
          {innerWidth <= 500
            ? <MobileIcons openFilter={openFilter} setOpenFilter={setOpenFilter} />
            : <HeaderIcon src={ArrowIcon} onClick={applyFilter} />}
        </HeaderIconContainer>
      </Header>
      {children}
    </InstantSearch>
  );
}

SearchBar.propTypes = {
  children: PropTypes.element.isRequired,
  insideBoundingBox: PropTypes.string.isRequired,
};
