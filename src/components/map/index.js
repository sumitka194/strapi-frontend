import {
  useState, useCallback, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
import Map, {
  GeolocateControl, Marker, FullscreenControl, NavigationControl, Popup,
} from 'react-map-gl';
import { connectGeoSearch } from 'react-instantsearch-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import Pointer from '../../assets/icons/Pointer.svg';
import PointerSelected from '../../assets/icons/Pointer_selected.svg';

function MapComponent(props) {
  const {
    hits, activeLoc, setInsideBoundingBox, setActiveLoc, setMoveCard, setCenterMap, centerMap,
  } = props;
  const [viewState, setViewState] = useState({
    latitude: 41.579606918652054,
    longitude: 4.244298260567439,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
    transitionDuration: 1000,
  });
  const [popupInfo, setPopupInfo] = useState(null);
  const [currentLoc, setCurrentLoc] = useState([activeLoc?.lat || 0, activeLoc?.lng || 0]);
  const mapRef = useRef(null);
  const geolocateControlRef = useCallback((ref) => {
    if (ref) {
      ref.trigger();
    }
  }, []);
  const centerMapOnCoordinates = (coordinates) => {
    if (centerMap) {
      mapRef.current?.flyTo({
        essential: false,
        center: coordinates,
      });
    }
    const { lat: northEastLat = '', lng: northEastLng = '' } = mapRef.current?.getBounds().getNorthEast() || {};
    const { lat: southWestLat = '', lng: southWestLng = '' } = mapRef.current?.getBounds().getSouthWest() || {};
    setInsideBoundingBox(`${northEastLat},${northEastLng},${southWestLat},${southWestLng}`);
  };

  const onMapInteraction = (map) => {
    const { lat: northEastLat = '', lng: northEastLng = '' } = map.target.getBounds().getNorthEast();
    const { lat: southWestLat = '', lng: southWestLng = '' } = map.target.getBounds().getSouthWest();
    setInsideBoundingBox(`${northEastLat},${northEastLng},${southWestLat},${southWestLng}`);
  };

  useEffect(() => {
    if (activeLoc && activeLoc.lng !== currentLoc[0] && activeLoc.lat !== currentLoc[1]) {
      setCurrentLoc([activeLoc.lng, activeLoc.lat]);
    }
  }, [activeLoc]);

  useEffect(() => {
    centerMapOnCoordinates(currentLoc);
  }, [currentLoc]);

  const onMarkerClick = (_geoloc, name) => {
    setPopupInfo({ name, _geoloc });
    setCenterMap(false);
    setMoveCard(true);
    setActiveLoc(_geoloc);
  };
  function isSelected(_geoloc) {
    return (_geoloc.lng === activeLoc?.lng && _geoloc.lat === activeLoc?.lat);
  }
  return (
    <Map
      {...viewState}
      ref={mapRef}
      style={{ width: '100%', height: 'calc(100vh - 4rem)' }}
      onMove={(evt) => setViewState(evt.viewState)}
      onMoveEnd={onMapInteraction}
      mapStyle="mapbox://styles/mapbox/dark-v8"
    >
      <NavigationControl />
      <FullscreenControl />
      <GeolocateControl ref={geolocateControlRef} />
      {
        hits.map(({ _geoloc, uid, name }) => (
          <Marker onClick={() => onMarkerClick(_geoloc, name, uid)} key={uid} longitude={_geoloc.lng} latitude={_geoloc.lat} anchor="bottom">
            {isSelected(_geoloc)
              ? <img src={PointerSelected} alt={name} />
              : <img src={Pointer} alt={name} />}
          </Marker>
        ))
      }
      {popupInfo && (
        <Popup
          anchor="top"
          longitude={popupInfo && Number(popupInfo._geoloc.lng)}
          latitude={popupInfo && Number(popupInfo._geoloc.lat)}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
        >
          <img width="100%" src="./space-station.png" alt={popupInfo.name} />
          <p>{popupInfo.name}</p>
        </Popup>
      )}
    </Map>
  );
}

MapComponent.propTypes = {
  hits: PropTypes.arrayOf({
    _geoloc: PropTypes.objectOf({
      lat: PropTypes.string.isRequired,
      lng: PropTypes.string.isRequired,
    }).isRequired,
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  activeLoc: PropTypes.objectOf({
    lat: PropTypes.string.isRequired,
    lng: PropTypes.string.isRequired,
  }).isRequired,
  setInsideBoundingBox: PropTypes.func.isRequired,
  setActiveLoc: PropTypes.func.isRequired,
  setMoveCard: PropTypes.func.isRequired,
  setCenterMap: PropTypes.func.isRequired,
  centerMap: PropTypes.bool.isRequired,
};

export default connectGeoSearch(MapComponent);
