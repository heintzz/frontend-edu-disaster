'use client';

import disasterData from '@/lib/bencana';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import '../styles/tooltip.css';

const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], weight: '400' });

// const EruptionPopup = ({ eruption }) => {
//   const [showText, setShowText] = useState(true);

//   const handleNextClick = () => {
//     setShowText(!showText);
//   };

//   return (
//     <Popup closeButton={true}>
//       <div className="py-1 w-[260px]">
//         <div className={jakartaSans.className}>
//           {showText ? (
//             <>
//               <p className="font-semibold">{eruption.title}</p>
//               <p className="font-semibold">{eruption.eruption}</p>
//               <div className="description mt-5">
//                 <p>Tahun terjadi: {eruption.year}</p>
//                 <p>Banyak korban jiwa: {eruption.casualties}</p>
//                 <p>Penyebab: {eruption.cause}</p>
//                 <p>Kronologi: {eruption.chronology}</p>
//               </div>
//             </>
//           ) : (
//             <div className="images">
//               <img src="marker/erupsi.png" alt="Image 1" />
//             </div>
//           )}
//           <button
//             className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded"
//             onClick={handleNextClick}
//           >
//             {showText ? 'Next' : 'Back'}
//           </button>
//         </div>
//       </div>
//     </Popup>
//   );
// };

const Map = ({ disasterType }) => {
  let data;
  switch (disasterType) {
    case 'eruption':
      data = disasterData.eruption;
      break;
    case 'earthquake':
      data = disasterData.earthquake;
      break;
    case 'tsunami':
      data = disasterData.tsunami;
      break;
    default:
      data = disasterData.eruption;
  }

  const indonesiaCoordinate = [-0.7893, 113.9213];

  const marker = useMemo(() => {
    return L.icon({
      iconUrl:
        disasterType === 'eruption'
          ? 'marker/erupsi.png'
          : disasterType === 'earthquake'
          ? 'marker/gempa.png'
          : 'marker/tsunami.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  }, [disasterType]);

  console.log({ disasterType, marker });

  L.TileLayer.prototype.options.minZoom = 4;

  return (
    <div className={`${jakartaSans.className}`}>
      <MapContainer
        className="w-full h-screen"
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

        {data.map((eruption, index) => {
          return (
            <Marker key={index} position={eruption.position} icon={marker}>
              <Popup closeButton={true}>
                <div className="py-1 w-[260px]">
                  <div className={jakartaSans.className}>
                    <p className="font-semibold">{eruption.title}</p>
                    <p className="font-semibold">{eruption.eruption}</p>
                    <div className="description mt-5">
                      <p>Tahun terjadi: {eruption.year}</p>
                      <p>Banyak korban jiwa: {eruption.casualties}</p>
                      <p>Penyebab: {eruption.cause}</p>
                      <p>Kronologi: {eruption.chronology}</p>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
