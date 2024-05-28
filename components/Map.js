'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import '../styles/tooltip.css';

const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], weight: '400' });

const eruptions = [
  {
    position: [-7.80168, 110.365529],
    title: 'Erupsi Gunung Merapi',
    location: 'Sleman, D.I. Yogyakarta',
    year: 2010,
    casualties: '351 meninggal dunia',
    cause: 'Letusan eksplosif dan aliran piroklastik.',
    chronology:
      'Gunung Merapi mulai meletus pada akhir Oktober 2010, dengan letusan besar terjadi pada 5 November 2010. Letusan ini menghasilkan awan panas dan lahar yang menghancurkan desa-desa di sekitarnya.',
  },
  {
    position: [-8.3427, 116.4638],
    title: 'Erupsi Gunung Rinjani',
    location: 'Lombok, Nusa Tenggara Barat',
    year: 2015,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Aktivitas magmatik yang menyebabkan letusan abu vulkanik.',
    chronology:
      'Pada akhir Oktober 2015, Gunung Rinjani meletus dengan memuntahkan abu setinggi beberapa kilometer, yang menyebabkan gangguan pada penerbangan di Bali dan Lombok.',
  },
  {
    position: [-7.54, 112.95],
    title: 'Erupsi Gunung Kelud',
    location: 'Kediri, Jawa Timur',
    year: 2014,
    casualties: '4 meninggal dunia',
    cause: 'Peningkatan aktivitas magmatik dan tekanan gas.',
    chronology:
      'Pada 13 Februari 2014, Gunung Kelud meletus dengan kekuatan besar, menghasilkan abu vulkanik yang tersebar hingga ke Jawa Tengah dan Yogyakarta, serta mengganggu aktivitas penerbangan.',
  },
  {
    position: [-8.2824, 112.92],
    title: 'Erupsi Gunung Semeru',
    location: 'Lumajang, Jawa Timur',
    year: 2021,
    casualties: '51 meninggal dunia',
    cause: 'Erupsi eksplosif yang disebabkan oleh tekanan gas magmatik.',
    chronology:
      'Pada 4 Desember 2021, Gunung Semeru mengalami letusan besar yang menghasilkan aliran piroklastik dan lahar, menghancurkan beberapa desa dan mengakibatkan banyak korban jiwa.',
  },
  {
    position: [-1.4676, 120.25],
    title: 'Erupsi Gunung Lokon',
    location: 'Tomohon, Sulawesi Utara',
    year: 2011,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Peningkatan aktivitas magmatik.',
    chronology:
      'Pada 14 Juli 2011, Gunung Lokon meletus dengan menyemburkan abu vulkanik dan material panas, menyebabkan evakuasi ribuan penduduk di sekitarnya.',
  },
  {
    position: [-0.1, 100.458],
    title: 'Erupsi Gunung Marapi',
    location: 'Sumatera Barat',
    year: 2017,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Aktivitas magmatik dan gas.',
    chronology:
      'Pada 4 Juni 2017, Gunung Marapi meletus dengan menyemburkan abu vulkanik hingga beberapa kilometer ke udara, namun tidak menyebabkan korban jiwa.',
  },
  {
    position: [-6.102, 106.402],
    title: 'Erupsi Gunung Krakatau',
    location: 'Selat Sunda',
    year: 2018,
    casualties: '437 meninggal dunia',
    cause: 'Letusan vulkanik bawah laut yang menghasilkan tsunami.',
    chronology:
      'Pada 22 Desember 2018, Gunung Anak Krakatau meletus yang menyebabkan longsoran bawah laut dan memicu tsunami, menghancurkan daerah pesisir di sekitar Selat Sunda.',
  },
  {
    position: [-8.14, 113.55],
    title: 'Erupsi Gunung Raung',
    location: 'Banyuwangi, Jawa Timur',
    year: 2015,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Aktivitas magmatik yang menyebabkan letusan strombolian.',
    chronology:
      'Pada Juli 2015, Gunung Raung meletus dengan letusan strombolian, memuntahkan abu vulkanik dan material pijar, menyebabkan gangguan pada penerbangan di sekitar Bali dan Jawa Timur.',
  },
  {
    position: [-7.25, 109.95],
    title: 'Erupsi Gunung Slamet',
    location: 'Jawa Tengah',
    year: 2014,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Peningkatan aktivitas vulkanik dan tekanan gas.',
    chronology:
      'Pada Agustus 2014, Gunung Slamet mengalami peningkatan aktivitas dengan letusan kecil yang menyemburkan abu dan material vulkanik ke udara, mengakibatkan peningkatan status waspada.',
  },
  {
    position: [-7.3, 110.442],
    title: 'Erupsi Gunung Merbabu',
    location: 'Magelang, Jawa Tengah',
    year: 2007,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Aktivitas magmatik.',
    chronology:
      'Pada Mei 2007, Gunung Merbabu mengalami letusan kecil yang memuntahkan abu vulkanik, namun tidak menyebabkan korban jiwa atau kerusakan signifikan.',
  },
  {
    position: [0.0, 114.0],
    title: 'Erupsi Gunung Liangpran',
    location: 'Kalimantan Tengah',
    year: 1959,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Aktivitas vulkanik.',
    chronology:
      'Gunung Liangpran mengalami erupsi kecil pada tahun 1959, dengan aktivitas vulkanik yang menyebabkan letusan kecil dan tidak ada korban jiwa.',
  },
  {
    position: [-1.4676, 120.25],
    title: 'Erupsi Gunung Lokon',
    location: 'Tomohon, Sulawesi Utara',
    year: 2011,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Peningkatan aktivitas magmatik.',
    chronology:
      'Pada 14 Juli 2011, Gunung Lokon meletus dengan menyemburkan abu vulkanik dan material panas, menyebabkan evakuasi ribuan penduduk di sekitarnya.',
  },
  {
    position: [1.6881, 124.8034],
    title: 'Erupsi Gunung Soputan',
    location: 'Minahasa Tenggara, Sulawesi Utara',
    year: 2015,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Aktivitas magmatik.',
    chronology:
      'Gunung Soputan meletus pada 2015, memuntahkan abu vulkanik yang menyebar ke daerah sekitarnya, namun tidak ada korban jiwa yang dilaporkan.',
  },
];

const Map = () => {
  const indonesiaCoordinate = [-0.7893, 113.9213];

  const marker = L.icon({
    iconUrl: 'https://i.ibb.co/7zFvDSt/Play.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  L.TileLayer.prototype.options.minZoom = 6;

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

        {eruptions.map((eruption, index) => {
          const popupRef = useRef(null);
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
