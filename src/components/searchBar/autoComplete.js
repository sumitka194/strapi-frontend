/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import { createAutocomplete } from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import React, {
  useEffect, useRef, useState, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import '@algolia/autocomplete-theme-classic';
import { Input, InputWrapperSuffix } from './components';
import DropArrowIcon from '../../assets/icons/DropArrow.svg';
import useWindowDimensions from '../../hooks/dimension';

export default function Autocomplete(props) {
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const panelRef = useRef(null);
  const [autocompleteState, setAutocompleteState] = useState({});
  const { innerWidth } = useWindowDimensions();
  const { searchClient, setItemSelected } = props;

  const autocomplete = useMemo(() => createAutocomplete({
    onStateChange({ state }) {
      setAutocompleteState(state);
    },
    getSources() {
      return [{
        sourceId: 'spaceCenter',
        getItemInputValue({ item }) {
          return item.query;
        },
        onSelect({ item }) {
          setItemSelected(item);
          inputRef.current.value = item.name;
        },
        getItems({ query }) {
          return getAlgoliaResults({
            searchClient,
            queries: [{
              indexName: 'space-centers',
              query,
              params: {
                hitsPerPage: 5,
                facets: ['*,planet_code'],
                facetFilters: [['planet_code:EAR']],
              },
            }],
          });
        },
      }];
    },
    ...props,
  }), [props]);

  const { getEnvironmentProps } = autocomplete;

  useEffect(() => {
    if (!formRef.current || !panelRef.current || !inputRef.current) {
      return undefined;
    }

    const { onTouchStart, onTouchMove } = getEnvironmentProps({
      formElement: formRef.current,
      inputElement: inputRef.current,
      panelElement: panelRef.current,
    });

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [getEnvironmentProps, formRef, inputRef, panelRef]);

  return (
    <div className="aa-Autocomplete" {...autocomplete.getRootProps({})}>
      <form
        className={innerWidth <= 500 && 'aa-Form'}
        {...autocomplete.getFormProps({ inputElement: inputRef.current })}
      >
        <div className="aa-InputWrapper">
          <Input className="aa-Input" ref={inputRef} {...autocomplete.getInputProps({ inputElement: inputRef.current })} />
        </div>
        <InputWrapperSuffix className="aa-InputWrapperSuffix">
          <button className="aa-ClearButton" title="Clear" type="reset">
            <img src={DropArrowIcon} alt="drop-icon" />
          </button>
        </InputWrapperSuffix>
      </form>
      {autocompleteState.isOpen && (
        <div
          ref={panelRef}
          className={[
            'aa-Panel',
            'aa-Panel--desktop',
            autocompleteState.status === 'stalled' && 'aa-Panel--stalled',
          ]
            .filter(Boolean)
            .join(' ')}
          {...autocomplete.getPanelProps({})}
        >
          <div className="aa-PanelLayout aa-Panel--scrollable">
            {autocompleteState.collections.map((collection, index) => {
              const { source, items } = collection;

              return (
                <section key={`source-${index}`} className="aa-Source">
                  {items.length > 0 && (
                    <ul className="aa-List" {...autocomplete.getListProps()}>
                      {items.map((item) => (
                        <li
                          key={item.objectID}
                          className="aa-Item"
                          {...autocomplete.getItemProps({ item, source })}
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

Autocomplete.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  searchClient: PropTypes.any.isRequired,
  setItemSelected: PropTypes.func.isRequired,
};
