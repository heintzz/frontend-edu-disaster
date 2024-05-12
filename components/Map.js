'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerIcon from '../node_modules/leaflet/dist/images/marker-icon.png';
import MarkerShadow from '../node_modules/leaflet/dist/images/marker-shadow.png';

import '../styles/tooltip.css';
import { useRef } from 'react';

const Map = () => {
  const indonesiaCoordinate = [-0.7893, 113.9213];

  const popupRef = useRef(null);

  const marker = L.icon({
    iconUrl: 'https://i.ibb.co/7zFvDSt/Play.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  L.TileLayer.prototype.options.minZoom = 6;

  return (
    <div>
      <MapContainer
        style={{
          height: '100vh',
          width: '100vw',
        }}
        center={indonesiaCoordinate}
        zoom={6}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.arcgis.com/">ArcGIS</a> contributors'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        <TileLayer
          attribution='&copy; <a href="https://www.arcgis.com/">ArcGIS</a> contributors'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        />

        <Marker position={[-7.80168, 110.365529]} icon={marker}>
          <Popup closeButton={false} ref={popupRef}>
            <div className="py-1 w-[260px]">
              <IoCloseCircleOutline
                size={24}
                className="absolute top-2 right-2"
                role="button"
                onClick={() => {}}
              />
              <div>
                <p className="font-semibold">Erupsi Gunung Merapi</p>
                <p className="font-semibold">Sleman, D.I. Yogyakarta</p>
                <div className="description mt-5">
                  <p>Tahun terjadi: 2010</p>
                  <p>Banyak korban jiwa: 351 meninggal dunia</p>
                  <p>Penyebab: </p>
                  <p>Kronologi: </p>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>

        <Marker position={[-6.22462, 106.837]} icon={marker}>
          <Popup closeButton={false}>
            <div className="py-1 w-[260px]">
              <IoCloseCircleOutline
                size={24}
                className="absolute top-2 right-2"
                role="button"
                onClick={() => {}}
              />
              <div>
                <p className="font-semibold">Erupsi Gunung Merapi</p>
                <p className="font-semibold">Sleman, D.I. Yogyakarta</p>
                <div className="description mt-5">
                  <p>Tahun terjadi: 2010</p>
                  <p>Banyak korban jiwa: 351 meninggal dunia</p>
                  <p>Penyebab: </p>
                  <p>Kronologi: </p>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
