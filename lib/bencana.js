const tsunami = [
  {
    position: [3.316, 95.854],
    title: 'Tsunami Aceh',
    location: 'Aceh, Sumatera',
    year: 2004,
    casualties: '230,000+ meninggal dunia',
    cause: 'Gempa bumi berkekuatan 9.1-9.3 SR di Samudra Hindia.',
    chronology:
      'Pada 26 Desember 2004, gempa bumi besar terjadi di lepas pantai barat Sumatera, yang memicu tsunami dahsyat. Gelombang tsunami menyapu Aceh dan berbagai wilayah di sekitar Samudra Hindia, menyebabkan kerusakan besar dan korban jiwa yang sangat tinggi.',
  },
  {
    position: [-0.18, 119.85],
    title: 'Tsunami Palu',
    location: 'Palu, Sulawesi Tengah',
    year: 2018,
    casualties: '4,340+ meninggal dunia',
    cause: 'Gempa bumi berkekuatan 7.5 SR yang diikuti longsoran bawah laut.',
    chronology:
      'Pada 28 September 2018, gempa bumi kuat mengguncang Palu dan Donggala, menyebabkan tsunami yang melanda pesisir Teluk Palu. Tsunami ini menghancurkan banyak bangunan dan menyebabkan ribuan korban jiwa.',
  },
  {
    position: [-6.103, 105.423],
    title: 'Tsunami Selat Sunda',
    location: 'Banten dan Lampung',
    year: 2018,
    casualties: '437 meninggal dunia',
    cause: 'Letusan Gunung Anak Krakatau yang menyebabkan longsoran bawah laut.',
    chronology:
      'Pada 22 Desember 2018, letusan Gunung Anak Krakatau menyebabkan longsoran bawah laut yang memicu tsunami. Gelombang tsunami ini menghantam pesisir Banten dan Lampung, menyebabkan kerusakan dan korban jiwa.',
  },
  {
    position: [-10.477, 112.835],
    title: 'Tsunami Banyuwangi',
    location: 'Banyuwangi, Jawa Timur',
    year: 1994,
    casualties: '223 meninggal dunia',
    cause: 'Gempa bumi berkekuatan 7.8 SR di Samudra Hindia.',
    chronology:
      'Pada 3 Juni 1994, gempa bumi besar terjadi di lepas pantai selatan Jawa, memicu tsunami yang menghantam pesisir Banyuwangi dan menyebabkan ratusan korban jiwa serta kerusakan parah.',
  },
  {
    position: [-3.201, 118.904],
    title: 'Tsunami Makassar',
    location: 'Makassar, Sulawesi Selatan',
    year: 1969,
    casualties: '64 meninggal dunia',
    cause: 'Gempa bumi berkekuatan 6.9 SR.',
    chronology:
      'Pada 23 Februari 1969, gempa bumi terjadi di dekat Makassar dan menyebabkan tsunami yang menghantam pesisir kota, menelan puluhan korban jiwa dan menyebabkan kerusakan.',
  },
  {
    position: [-7.898056, 109.264167],
    title: 'Tsunami Kebumen',
    location: 'Kebumen, Jawa Tengah',
    year: 2006,
    casualties: '802 meninggal dunia',
    cause: 'Gempa bumi berkekuatan 7.7 SR di Samudra Hindia.',
    chronology:
      'Pada 17 Juli 2006, gempa bumi besar di Samudra Hindia memicu tsunami yang menghantam pesisir selatan Jawa, termasuk Kebumen. Tsunami ini menyebabkan ratusan korban jiwa dan kerusakan besar.',
  },
  {
    position: [-8.48, 121.896],
    title: 'Tsunami Flores',
    location: 'Flores, Nusa Tenggara Timur',
    year: 1992,
    casualties: '2,500+ meninggal dunia',
    cause: 'Gempa bumi berkekuatan 7.8 SR.',
    chronology:
      'Pada 12 Desember 1992, gempa bumi besar mengguncang Flores dan memicu tsunami yang menghancurkan banyak desa pesisir, menyebabkan ribuan korban jiwa dan kerusakan parah.',
  },
  {
    position: [-7.693611, 108.651667],
    title: 'Tsunami Pangandaran',
    location: 'Pangandaran, Jawa Barat',
    year: 2006,
    casualties: '668 meninggal dunia',
    cause: 'Gempa bumi berkekuatan 7.7 SR di Samudra Hindia.',
    chronology:
      'Pada 17 Juli 2006, gempa bumi besar di Samudra Hindia memicu tsunami yang menghantam pesisir Pangandaran dan daerah sekitarnya, menyebabkan ratusan korban jiwa dan kerusakan.',
  },
  {
    position: [-3.464, 100.084],
    title: 'Tsunami Kepulauan Mentawai',
    location: 'Mentawai, Sumatera Barat',
    year: 2010,
    casualties: '435 meninggal dunia',
    cause: 'Gempa bumi berkekuatan 7.7 SR.',
    chronology:
      'Pada 25 Oktober 2010, gempa bumi besar mengguncang Kepulauan Mentawai dan memicu tsunami yang menghantam daerah pesisir, menyebabkan kerusakan parah dan ratusan korban jiwa.',
  },
  {
    position: [-8.5227, 116.5481],
    title: 'Tsunami Lombok',
    location: 'Lombok, Nusa Tenggara Barat',
    year: 2018,
    casualties: '563 meninggal dunia',
    cause: 'Gempa bumi berkekuatan 7.0 SR.',
    chronology:
      'Pada 5 Agustus 2018, gempa bumi kuat mengguncang Lombok dan memicu tsunami yang menyebabkan kerusakan besar dan ratusan korban jiwa di wilayah pesisir.',
  },
  {
    position: [2.09, 97.15],
    title: 'Tsunami Sumatra Barat',
    location: 'Sumatra Barat',
    year: 2005,
    casualties: '1,313 meninggal dunia',
    cause: 'Gempa bumi berkekuatan 8.6 SR.',
    chronology:
      'Pada 28 Maret 2005, gempa bumi besar mengguncang Sumatra Barat dan memicu tsunami yang menghantam daerah pesisir, menyebabkan kerusakan dan korban jiwa yang signifikan.',
  },
];

const eruption = [
  {
    position: [-7.540462014255598, 110.4456811234986],
    title: 'Erupsi Gunung Merapi',
    location: 'Sleman, D.I. Yogyakarta',
    year: 2010,
    casualties: '351 meninggal dunia',
    cause: 'Letusan eksplosif dan aliran piroklastik.',
    chronology:
      'Gunung Merapi mulai meletus pada akhir Oktober 2010, dengan letusan besar terjadi pada 5 November 2010. Letusan ini menghasilkan awan panas dan lahar yang menghancurkan desa-desa di sekitarnya.',
  },
  {
    position: [-8.410276025293497, 116.45739165431449],
    title: 'Erupsi Gunung Rinjani',
    location: 'Lombok, Nusa Tenggara Barat',
    year: 2015,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Aktivitas magmatik yang menyebabkan letusan abu vulkanik.',
    chronology:
      'Pada akhir Oktober 2015, Gunung Rinjani meletus dengan memuntahkan abu setinggi beberapa kilometer, yang menyebabkan gangguan pada penerbangan di Bali dan Lombok.',
  },
  {
    position: [-7.934192138218129, 112.31436090767102],
    title: 'Erupsi Gunung Kelud',
    location: 'Kediri, Jawa Timur',
    year: 2014,
    casualties: '4 meninggal dunia',
    cause: 'Peningkatan aktivitas magmatik dan tekanan gas.',
    chronology:
      'Pada 13 Februari 2014, Gunung Kelud meletus dengan kekuatan besar, menghasilkan abu vulkanik yang tersebar hingga ke Jawa Tengah dan Yogyakarta, serta mengganggu aktivitas penerbangan.',
  },
  {
    position: [-8.10686719203387, 112.92270784632521],
    title: 'Erupsi Gunung Semeru',
    location: 'Lumajang, Jawa Timur',
    year: 2021,
    casualties: '51 meninggal dunia',
    cause: 'Erupsi eksplosif yang disebabkan oleh tekanan gas magmatik.',
    chronology:
      'Pada 4 Desember 2021, Gunung Semeru mengalami letusan besar yang menghasilkan aliran piroklastik dan lahar, menghancurkan beberapa desa dan mengakibatkan banyak korban jiwa.',
  },
  {
    position: [1.3555170782098023, 124.79519833092498],
    title: 'Erupsi Gunung Lokon',
    location: 'Tomohon, Sulawesi Utara',
    year: 2011,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Peningkatan aktivitas magmatik.',
    chronology:
      'Pada 14 Juli 2011, Gunung Lokon meletus dengan menyemburkan abu vulkanik dan material panas, menyebabkan evakuasi ribuan penduduk di sekitarnya.',
  },
  {
    position: [-0.37948487105027645, 100.47399487693792],
    title: 'Erupsi Gunung Marapi',
    location: 'Sumatera Barat',
    year: 2017,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Aktivitas magmatik dan gas.',
    chronology:
      'Pada 4 Juni 2017, Gunung Marapi meletus dengan menyemburkan abu vulkanik hingga beberapa kilometer ke udara, namun tidak menyebabkan korban jiwa.',
  },
  {
    position: [-6.10254393199993, 105.42192248807638],
    title: 'Erupsi Gunung Anak Krakatau',
    location: 'Selat Sunda',
    year: 2018,
    casualties: '437 meninggal dunia',
    cause: 'Letusan vulkanik bawah laut yang menghasilkan tsunami.',
    chronology:
      'Pada 22 Desember 2018, Gunung Anak Krakatau meletus yang menyebabkan longsoran bawah laut dan memicu tsunami, menghancurkan daerah pesisir di sekitar Selat Sunda.',
  },
  {
    position: [-8.124855876354047, 114.04570449289854],
    title: 'Erupsi Gunung Raung',
    location: 'Banyuwangi, Jawa Timur',
    year: 2015,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Aktivitas magmatik yang menyebabkan letusan strombolian.',
    chronology:
      'Pada Juli 2015, Gunung Raung meletus dengan letusan strombolian, memuntahkan abu vulkanik dan material pijar, menyebabkan gangguan pada penerbangan di sekitar Bali dan Jawa Timur.',
  },
  {
    position: [-7.24096295357161, 109.21470183085776],
    title: 'Erupsi Gunung Slamet',
    location: 'Jawa Tengah',
    year: 2014,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Peningkatan aktivitas vulkanik dan tekanan gas.',
    chronology:
      'Pada Agustus 2014, Gunung Slamet mengalami peningkatan aktivitas dengan letusan kecil yang menyemburkan abu dan material vulkanik ke udara, mengakibatkan peningkatan status waspada.',
  },
  {
    position: [-7.454063573071724, 110.44012868485832],
    title: 'Erupsi Gunung Merbabu',
    location: 'Magelang, Jawa Tengah',
    year: 2007,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Aktivitas magmatik.',
    chronology:
      'Pada Mei 2007, Gunung Merbabu mengalami letusan kecil yang memuntahkan abu vulkanik, namun tidak menyebabkan korban jiwa atau kerusakan signifikan.',
  },
  {
    position: [1.0789174596083968, 114.37710413942406],
    title: 'Erupsi Gunung Liangpran',
    location: 'Kalimantan Timur',
    year: 1959,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Aktivitas vulkanik.',
    chronology:
      'Gunung Liangpran mengalami erupsi kecil pada tahun 1959, dengan aktivitas vulkanik yang menyebabkan letusan kecil dan tidak ada korban jiwa.',
  },
  {
    position: [1.1147015856462281, 124.73766999692431],
    title: 'Erupsi Gunung Soputan',
    location: 'Minahasa Tenggara, Sulawesi Utara',
    year: 2015,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Aktivitas magmatik.',
    chronology:
      'Gunung Soputan meletus pada 2015, memuntahkan abu vulkanik yang menyebar ke daerah sekitarnya, namun tidak ada korban jiwa yang dilaporkan.',
  },
  {
    position: [-8.342588426974741, 115.50684286224617],
    title: 'Erupsi Gunung Agung',
    location: 'Bali',
    year: 2017,
    casualties: 'Terdapat korban jiwa',
    cause: 'Aktivitas magmatik.',
    chronology:
      'Gunung Agung meletus pada tahun 2017, menyebabkan korban jiwa dan mengakibatkan evakuasi massal.',
  },
  {
    position: [-8.2389403927988, 115.37715101620134],
    title: 'Erupsi Gunung Batur',
    location: 'Bali',
    year: 2000,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Aktivitas freatik.',
    chronology:
      'Gunung Batur meletus pada tahun 2000, mengeluarkan gas dan abu vulkanik, namun tidak ada korban jiwa yang dilaporkan.',
  },
  {
    position: [-8.410912832322579, 116.45730582362862],
    title: 'Erupsi Gunung Rinjani',
    location: 'Lombok, Nusa Tenggara Barat',
    year: 2015,
    casualties: 'Tidak ada korban jiwa',
    cause: 'Aktivitas freatik.',
    chronology:
      'Gunung Rinjani meletus pada tahun 2015, mengeluarkan abu vulkanik dan menyebabkan gangguan penerbangan di sekitar wilayahnya.',
  },
  {
    position: [-8.247457132316535, 117.99101510826021],
    title: 'Erupsi Gunung Tambora',
    location: 'Pulau Sumbawa, Nusa Tenggara Barat',
    year: 1815,
    casualties: 'Terdapat korban jiwa',
    cause: 'Aktivitas eksplosif.',
    chronology:
      'Gunung Tambora meletus pada tahun 1815, menghasilkan letusan terbesar dalam sejarah yang direkam dan menyebabkan bencana global.',
  },
];

const earthquake = [
  {
    position: [3.2956, 95.9822],
    title: 'Gempa Aceh',
    location: 'Aceh, Sumatera',
    year: 2004,
    casualties: '230,000+ meninggal dunia',
    magnitude: '9.1-9.3 SR',
    cause: 'Pergerakan lempeng tektonik di Samudra Hindia.',
    chronology:
      'Pada 26 Desember 2004, gempa bumi berkekuatan 9.1-9.3 SR terjadi di lepas pantai barat Sumatera, yang memicu tsunami dahsyat. Gempa ini menyebabkan kerusakan besar dan banyak korban jiwa di Aceh dan wilayah sekitarnya.',
  },
  {
    position: [-0.7893, 119.8502],
    title: 'Gempa Palu',
    location: 'Palu, Sulawesi Tengah',
    year: 2018,
    casualties: '4,340+ meninggal dunia',
    magnitude: '7.5 SR',
    cause: 'Pergerakan lempeng tektonik yang memicu tsunami.',
    chronology:
      'Pada 28 September 2018, gempa bumi berkekuatan 7.5 SR mengguncang Palu dan Donggala. Gempa ini juga memicu tsunami yang menghantam pesisir Teluk Palu, menyebabkan kerusakan parah dan banyak korban jiwa.',
  },
  {
    position: [-6.102, 106.402],
    title: 'Gempa Banten',
    location: 'Banten, Jawa Barat',
    year: 2018,
    casualties: 'Tidak ada korban jiwa',
    magnitude: '6.4 SR',
    cause: 'Pergerakan lempeng tektonik.',
    chronology:
      'Pada 23 Januari 2018, gempa bumi berkekuatan 6.4 SR terjadi di lepas pantai Banten, mengguncang wilayah Jakarta dan sekitarnya. Meskipun tidak ada korban jiwa, gempa ini menyebabkan kerusakan pada beberapa bangunan.',
  },
  {
    position: [2.084, 97.082],
    title: 'Gempa Nias',
    location: 'Nias, Sumatera Utara',
    year: 2005,
    casualties: '1,313 meninggal dunia',
    magnitude: '8.6 SR',
    cause: 'Pergerakan lempeng tektonik di Samudra Hindia.',
    chronology:
      'Pada 28 Maret 2005, gempa bumi berkekuatan 8.6 SR mengguncang Pulau Nias dan wilayah Sumatera Utara. Gempa ini menyebabkan kerusakan besar dan korban jiwa yang signifikan.',
  },
  {
    position: [-8.3702, 116.1517],
    title: 'Gempa Lombok',
    location: 'Lombok, Nusa Tenggara Barat',
    year: 2018,
    casualties: '563 meninggal dunia',
    magnitude: '7.0 SR',
    cause: 'Pergerakan lempeng tektonik.',
    chronology:
      'Pada 5 Agustus 2018, gempa bumi berkekuatan 7.0 SR mengguncang Lombok, menyebabkan kerusakan besar dan ratusan korban jiwa. Gempa susulan terus terjadi selama beberapa minggu berikutnya.',
  },
  {
    position: [-7.55, 110.433],
    title: 'Gempa Yogyakarta',
    location: 'Yogyakarta, Jawa Tengah',
    year: 2006,
    casualties: '5,700+ meninggal dunia',
    magnitude: '6.3 SR',
    cause: 'Pergerakan lempeng tektonik.',
    chronology:
      'Pada 27 Mei 2006, gempa bumi berkekuatan 6.3 SR mengguncang Yogyakarta dan sekitarnya. Gempa ini menyebabkan kerusakan parah pada infrastruktur dan ribuan korban jiwa.',
  },
  {
    position: [-4.0777, 138.7565],
    title: 'Gempa Papua',
    location: 'Papua',
    year: 2009,
    casualties: '17 meninggal dunia',
    magnitude: '7.6 SR',
    cause: 'Pergerakan lempeng tektonik.',
    chronology:
      'Pada 4 Januari 2009, gempa bumi berkekuatan 7.6 SR mengguncang Papua. Gempa ini menyebabkan kerusakan pada beberapa bangunan dan menelan korban jiwa.',
  },
  {
    position: [-0.5897, 101.3431],
    title: 'Gempa Sumatra Barat',
    location: 'Padang, Sumatera Barat',
    year: 2009,
    casualties: '1,117 meninggal dunia',
    magnitude: '7.6 SR',
    cause: 'Pergerakan lempeng tektonik di Samudra Hindia.',
    chronology:
      'Pada 30 September 2009, gempa bumi berkekuatan 7.6 SR mengguncang Padang dan wilayah Sumatera Barat. Gempa ini menyebabkan kerusakan besar dan banyak korban jiwa.',
  },
  {
    position: [0.566, 123.149],
    title: 'Gempa Sulawesi Utara',
    location: 'Sulawesi Utara',
    year: 2014,
    casualties: 'Tidak ada korban jiwa',
    magnitude: '7.0 SR',
    cause: 'Pergerakan lempeng tektonik.',
    chronology:
      'Pada 15 November 2014, gempa bumi berkekuatan 7.0 SR mengguncang Sulawesi Utara. Meskipun tidak ada korban jiwa, gempa ini menyebabkan kepanikan dan kerusakan pada beberapa bangunan.',
  },
  {
    position: [1.073, 126.195],
    title: 'Gempa Halmahera',
    location: 'Halmahera, Maluku Utara',
    year: 2019,
    casualties: '14 meninggal dunia',
    magnitude: '7.2 SR',
    cause: 'Pergerakan lempeng tektonik.',
    chronology:
      'Pada 14 Juli 2019, gempa bumi berkekuatan 7.2 SR mengguncang Halmahera. Gempa ini menyebabkan kerusakan pada banyak rumah dan menelan korban jiwa.',
  },
  {
    position: [2.102, 128.087],
    title: 'Gempa Maluku Utara',
    location: 'Maluku Utara',
    year: 2019,
    casualties: '6 meninggal dunia',
    magnitude: '7.1 SR',
    cause: 'Pergerakan lempeng tektonik.',
    chronology:
      'Pada 7 Juli 2019, gempa bumi berkekuatan 7.1 SR mengguncang Maluku Utara. Gempa ini menyebabkan kerusakan dan korban jiwa di beberapa daerah.',
  },
  {
    position: [-2.9185, 119.5994],
    title: 'Gempa Sulawesi Barat',
    location: 'Majene, Sulawesi Barat',
    year: 2021,
    casualties: '105 meninggal dunia',
    magnitude: '6.2 SR',
    cause: 'Pergerakan lempeng tektonik.',
    chronology:
      'Pada 15 Januari 2021, gempa bumi berkekuatan 6.2 SR mengguncang Majene dan sekitarnya di Sulawesi Barat. Gempa ini menyebabkan kerusakan besar dan korban jiwa.',
  },
  {
    position: [-6.8186, 107.6174],
    title: 'Gempa Lembang',
    location: 'Lembang, Jawa Barat',
    year: 2022,
    casualties: 'Potensial korban besar',
    cause: 'Pergerakan sesar patahan',
    chronology:
      'Gempa yang dipicu oleh patahan Lembang di Jawa Barat merupakan ancaman potensial. Patahan ini dapat menyebabkan gempa bumi besar yang berpotensi merusak wilayah Bandung dan sekitarnya.',
  },
  {
    position: [-0.7893, 119.8502],
    title: 'Gempa Sesar Palu-Koro',
    location: 'Palu, Sulawesi Tengah',
    year: 2018,
    casualties: '4,340+ meninggal dunia',
    magnitude: '7.5 SR',
    cause: 'Pergerakan sesar patahan',
    chronology:
      'Gempa bumi pada 28 September 2018 diakibatkan oleh pergerakan sesar Palu-Koro yang memicu tsunami dan likuefaksi tanah di Palu, menyebabkan kerusakan besar dan banyak korban jiwa.',
  },
  {
    position: [-4.5, 104.0],
    title: 'Gempa Sesar Semangko',
    location: 'Sumatera',
    year: 1943,
    casualties: 'Ratusan meninggal dunia',
    cause: 'Pergerakan sesar patahan',
    chronology:
      'Patahan Semangko membentang sepanjang Pulau Sumatera dan telah menyebabkan beberapa gempa besar yang menimbulkan kerusakan dan korban jiwa di berbagai wilayah.',
  },
];

const disasterData = {
  tsunami,
  eruption,
  earthquake,
};

export default disasterData;
