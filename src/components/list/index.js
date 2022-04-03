import { useState } from 'react';
import { connectHits } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import ListCard from './card';
import NotFound from '../notFound';

function ListComp({
  activeLoc, setActiveLoc, hits, moveCard, setMoveCard,
}) {
  if (!hits || !hits.length) {
    return (<NotFound />);
  }

  const [activeCard, setActiveCard] = useState(null);

  return hits.map(
    (hit) => (
      <ListCard
        setMoveCard={setMoveCard}
        moveCard={moveCard}
        activeLoc={activeLoc}
        setActiveLoc={setActiveLoc}
        key={hit.uid}
        spaceCenter={hit}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
      />
    ),
  );
}

ListComp.propTypes = {
  activeLoc: PropTypes.objectOf(PropTypes.string).isRequired,
  setActiveLoc: PropTypes.func.isRequired,
  setMoveCard: PropTypes.func.isRequired,
  moveCard: PropTypes.bool.isRequired,
  hits: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default connectHits(ListComp);
