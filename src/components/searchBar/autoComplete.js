/* eslint-disable */
import { createAutocomplete } from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import React, {
  useEffect, useRef, useState, useMemo,
} from 'react';
import '@algolia/autocomplete-theme-classic';
import styled from 'styled-components';
import DropArrowIcon from '../../assets/icons/DropArrow.svg';
import useWindowDimensions from '../../hooks/dimension';

const Input = styled.input`
  @media (min-width: 500px) {
    border: none;
    border-bottom: 1px solid #fff;
    width: 10rem;
    color: white;
    background-color: #4e4e4e;
  }
`;

const InputWrapperSuffix = styled.div`
  @media (min-width: 500px) {
    display: none;
    width: 10rem;
  }
`;

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
              }
            }]
          })
        },
      }]
    },
    ...props,
  }), [props])

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
        className={innerWidth <= 500 && "aa-Form"}
        {...autocomplete.getFormProps({ inputElement: inputRef.current })}
      >
        <div className="aa-InputWrapper">
          <Input className="aa-Input" ref={inputRef} {...autocomplete.getInputProps({ inputElement: inputRef.current })} />
        </div>
        <InputWrapperSuffix className="aa-InputWrapperSuffix">
          <button className="aa-ClearButton" title="Clear" type="reset">
            <img src={DropArrowIcon} />
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
                      {items.map((item) => {
                        return (
                          <li
                            key={item.objectID}
                            className="aa-Item"
                            {...autocomplete.getItemProps({ item, source })}
                          >
                            {item.name}
                          </li>
                        );
                      })}
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
