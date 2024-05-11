'use client';

import L from 'leaflet';
import MarkerIcon from '../node_modules/leaflet/dist/images/marker-icon.png';
import MarkerShadow from '../node_modules/leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { useState } from 'react';

const Map = () => {
  const indonesiaCoordinate = [-0.7893, 113.9213];
  const [coord, setCoord] = useState(indonesiaCoordinate);

  const SearchLocation = () => {
    return (
      <div className="search-location">
        <input type="text" placeholder="Search Location" />
      </div>
    );
  };

  L.TileLayer.prototype.options.minZoom = 6;

  const GetMyLocation = () => {
    const getMyLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCoord([position.coords.latitude, position.coords.longitude]);
        });
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    };

    return (
      <div className="get-my-location">
        <button onClick={getMyLocation}>Get My Location</button>
      </div>
    );
  };

  return (
    <div>
      <SearchLocation />
      <GetMyLocation />
      <MapContainer
        style={{
          height: '100vh',
          width: '100vw',
        }}
        center={coord}
        zoom={6}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <CircleMarker
          center={[-7.797068, 110.370529]}
          radius={8}
          color="blue"
          fillColor="blue"
          fillOpacity={0.5}
        >
          <Popup>
            <p className="text-[20px]">Yogyakarta</p>
          </Popup>
        </CircleMarker>

        <Marker
          icon={
            new L.Icon({
              iconUrl: MarkerIcon.src,
              iconRetinaUrl: MarkerIcon.src,
              iconSize: [25, 41],
              iconAnchor: [12.5, 41],
              popupAnchor: [0, -41],
              shadowUrl: MarkerShadow.src,
              shadowSize: [41, 41],
            })
          }
          position={[51.505, -0.09]}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
