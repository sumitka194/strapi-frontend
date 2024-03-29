import { useState } from 'react';
import styled from 'styled-components';
import MapComponent from './components/map';
import ListComp from './components/list';
import SearchBar from './components/searchBar';

const Container = styled.main`
  @media (min-width: 500px) {
    display: grid;
    grid-template-columns: repeat(12, [col-start] 1fr);
    & > * {
      grid-column: col-start / span 12;
    }
  }
`;

const ListSection = styled.section`
  display: flex;
  overflow: scroll;
  background-color: '#f6f3f3';
  position: relative;
  @media (min-width: 500px) {
    flex-direction: column;
    grid-row: 2;
    grid-column: 1 / 4;
    height: calc(100vh - 4rem);
  }
`;

const MapSection = styled.section`
  @media (min-width: 500px) {
    grid-row: 2;
    grid-column: 4 / 13;
    height: calc(100vh - 4rem);
  }
`;

function App() {
  const [activeLoc, setActiveLoc] = useState(null);
  const [insideBoundingBox, setInsideBoundingBox] = useState('');
  const [moveCard, setMoveCard] = useState(false);
  const [centerMap, setCenterMap] = useState(false);
  return (
    <Container>
      <SearchBar
        insideBoundingBox={insideBoundingBox}
        setCenterMap={setCenterMap}
        setMoveCard={setMoveCard}
        setActiveLoc={setActiveLoc}
      >
        <MapSection>
          <MapComponent
            setCenterMap={setCenterMap}
            centerMap={centerMap}
            setMoveCard={setMoveCard}
            activeLoc={activeLoc}
            setActiveLoc={setActiveLoc}
            setInsideBoundingBox={setInsideBoundingBox}
          />
        </MapSection>
        <ListSection>
          <ListComp
            setCenterMap={setCenterMap}
            moveCard={moveCard}
            activeLoc={activeLoc}
            setActiveLoc={setActiveLoc}
            setMoveCard={setMoveCard}
          />
        </ListSection>
      </SearchBar>
    </Container>
  );
}

export default App;
