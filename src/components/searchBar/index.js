import { useState } from 'react';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch, Configure, connectSearchBox,
} from 'react-instantsearch-dom';
import {
  Button, FilterBody, FilterContainer, Header, HeaderIcon, HeaderIconContainer,
  HeaderIconWrapper, HeaderSection, HeaderTitle, Input, Typography,
} from './components';
import AutoComplete from './autoComplete';
import ArrowIcon from '../../assets/icons/Arrow.svg';
import SearchIcon from '../../assets/icons/Search.svg';
import CrossIcon from '../../assets/icons/cross.svg';
import useWindowDimensions from '../../hooks/dimension';

const { REACT_APP_ALGOLIA_APP_ID, REACT_APP_ALGOLIA_APP_KEY } = process.env;
const searchClient = algoliasearch(REACT_APP_ALGOLIA_APP_ID, REACT_APP_ALGOLIA_APP_KEY);

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

MobileIcons.propTypes = {
  openFilter: PropTypes.bool.isRequired,
  setOpenFilter: PropTypes.func.isRequired,
};

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
            <Typography color="white">Departure</Typography>
            <AutoComplete
              setItemSelected={setItemSelected}
              searchClient={searchClient}
              placeholder="Search"
              detachedMediaQuery="none"
              openOnFocus
            />
            <Typography color="white">Departure time</Typography>
            <Input type="datetime-local" onChange={(e) => console.log(new Date(e.target.value).toISOString())} />
          </FilterBody>
          <Button onClick={applyFilter}>Save</Button>
        </FilterContainer>
        <HeaderIconContainer>
          <HeaderIconWrapper>
            {innerWidth <= 500
              ? <MobileIcons openFilter={openFilter} setOpenFilter={setOpenFilter} />
              : <HeaderIcon src={ArrowIcon} onClick={applyFilter} />}
          </HeaderIconWrapper>
        </HeaderIconContainer>
      </Header>
      {children}
    </InstantSearch>
  );
}

SearchBar.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  insideBoundingBox: PropTypes.string.isRequired,
  setActiveLoc: PropTypes.func.isRequired,
  setMoveCard: PropTypes.func.isRequired,
  setCenterMap: PropTypes.func.isRequired,
};
