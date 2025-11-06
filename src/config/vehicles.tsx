const vehicleObjects = [
    {
      id: 'v1',
      model: 'tornado',
      yearStart: '2022',
      yearEnd: '2024',
      side: 'lado',
      image: 'chevrolet-tornado-2022-2024-lado.png',
      manufacturer: 'Chevrolet'
    },
    {
      id: 'v2',
      model: 'ducato',
      yearStart: '2015',
      yearEnd: '2024',
      side: 'lado',
      image: 'fiat-ducato-2015-2024-lado.png',
      manufacturer: 'Fiat'
    },
    {
      id: 'v3',
      model: 'ducatoMaxi18',
      yearStart: '2015',
      yearEnd: '2024',
      side: 'lado',
      image: 'fiat-ducatoMaxi-2015-2024-lado.png',
      manufacturer: 'Fiat'
    },
    {
      id: 'v4',
      model: 'ducatoambulancia',
      yearStart: '2015',
      yearEnd: '2024',
      side: 'lado',
      image: 'fiat-ducatoambulancia-2015-2024-lado.png',
      manufacturer: 'Fiat'
    },
    {
      id: 'v5',
      model: 'etransit',
      yearStart: '2023',
      yearEnd: '2024',
      side: 'lado',
      image: 'ford-etransit-2023-2024-lado.png',
      manufacturer: 'Ford'
    },
    {
      id: 'v6',
      model: 'transit-83.2',
      yearStart: '2015',
      yearEnd: '2024',
      side: 'lado',
      image: 'ford-transit-83.2-2015-2024-lado.png',
      manufacturer: 'Ford'
    },
    {
      id: 'v7',
      model: 'transit100.8',
      yearStart: '2015',
      yearEnd: '2024',
      side: 'lado',
      image: 'ford-transit100.8-2015-2024-lado.png',
      manufacturer: 'Ford'
    },
    {
      id: 'v8',
      model: 'transit110.2',
      yearStart: '2015',
      yearEnd: '2024',
      side: 'lado',
      image: 'ford-transit110.2-2015-2024-lado.png',
      manufacturer: 'Ford'
    },
    {
      id: 'v9',
      model: 'transit110.2L',
      yearStart: '2015',
      yearEnd: '2024',
      side: 'lado',
      image: 'ford-transit110.2L-2015-2024.png',
      manufacturer: 'Ford'
    },
    {
      id: 'v10',
      model: 'transitambulancia',
      yearStart: '2015',
      yearEnd: '2024',
      side: 'lado',
      image: 'ford-transitambulancia-2015-2024-lado.png',
      manufacturer: 'Ford'
    },
    {
      id: 'v11',
      model: 'transitcorta',
      yearStart: '2007',
      yearEnd: '2014',
      side: 'lado',
      image: 'ford-transitcorta-2007-2014-lado.png',
      manufacturer: 'Ford'
    },
    // {
    //   id: 'v12',
    //   model: 'transitcustom',
    //   yearStart: '2017',
    //   yearEnd: '2021',
    //   side: 'lado',
    //   image: 'ford-transitcustom-2017-2021-lado.png',
    //   manufacturer: 'Ford'
    // },
    // {
    //   id: 'v13',
    //   model: 'transitcustomvancortatdi',
    //   yearStart: null,
    //   yearEnd: null,
    //   side: 'lado',
    //   image: 'ford-transitcustomvancortatdi-lado.png',
    //   manufacturer: 'Ford'
    // },
    {
      id: 'v14',
      model: 'viewcs2',
      yearStart: '2014',
      yearEnd: '2024',
      side: 'lado',
      image: 'foton-viewcs2-2014-2024-lado.png',
      manufacturer: 'Foton'
    },
    {
      id: 'v15',
      model: 'solatih350',
      yearStart: '2024',
      yearEnd: '2025',
      side: 'lado',
      image: 'hiunday-solatih350-2024-2025-lado.png',
      manufacturer: 'Hyundai'
    },
    {
      id: 'v16',
      model: 'statex',
      yearStart: '2023',
      yearEnd: '2024',
      side: 'lado',
      image: 'hiunday-statex-2023-2024-lado.png',
      manufacturer: 'Hyundai'
    },
    {
      id: 'v17',
      model: 'sunray',
      yearStart: '2023',
      yearEnd: '2024',
      side: 'lado',
      image: 'jack-sunray-2023-2024-lado.png',
      manufacturer: 'JAC'
    },
    {
      id: 'v18',
      model: 'sprinter',
      yearStart: '2008',
      yearEnd: '2018',
      side: 'lado',
      image: 'mercedes-sprinter-2008-2018-lado.png',
      manufacturer: 'Mercedes'
    },
    // {
    //   id: 'v19',
    //   model: 'sprinter2',
    //   yearStart: '2008',
    //   yearEnd: '2018',
    //   side: 'lado',
    //   image: 'mercedes-sprinter2-2008-2018-lado.png',
    //   manufacturer: 'Mercedes'
    // },
    {
      id: 'v20',
      model: 'sprinter3',
      yearStart: '2008',
      yearEnd: '2018',
      side: 'lado',
      image: 'mercedes-sprinter3-2008-2018-lado 2.png',
      manufacturer: 'Mercedes'
    },
    {
      id: 'v21',
      model: 'sprinter',
      yearStart: '2008',
      yearEnd: '2024',
      side: 'lado',
      image: 'merecedes-sprinter-2008-2024-lado.png',
      manufacturer: 'Mercedes'
    },
    {
      id: 'v22',
      model: 'nv350',
      yearStart: '2013',
      yearEnd: '2024',
      side: 'lado',
      image: 'nissan-nv350-2013-2024-lado.png',
      manufacturer: 'Nissan'
    },
    {
      id: 'v23',
      model: 'managerL2h2',
      yearStart: '2016',
      yearEnd: '2020',
      side: 'lado',
      image: 'peugeot-managerL2h2-2016-2020-lado.png',
      manufacturer: 'Peugeot'
    },
    {
      id: 'v24',
      model: 'managerL4h2',
      yearStart: '2016',
      yearEnd: '2020',
      side: 'lado',
      image: 'peugeot-managerL4h2-2016-2020-lado.png',
      manufacturer: 'Peugeot'
    },
    {
      id: 'v25',
      model: 'partner',
      yearStart: '2022',
      yearEnd: '2024',
      side: 'lado',
      image: 'peugeot-partner-2022-2024-lado.png',
      manufacturer: 'Peugeot'
    },
    {
      id: 'v26',
      model: 'rifter',
      yearStart: '2022',
      yearEnd: '2024',
      side: 'lado',
      image: 'peugeot-rifter-2022-2024-lado.png',
      manufacturer: 'Peugeot'
    },
    {
      id: 'v27',
      model: 'promaster1500',
      yearStart: null,
      yearEnd: null,
      side: 'lado',
      image: 'ram-promaster1500-lado.png',
      manufacturer: 'Ram'
    },
    {
      id: 'v28',
      model: 'promaster2500',
      yearStart: null,
      yearEnd: null,
      side: 'lado',
      image: 'ram-promaster2500-lado.png',
      manufacturer: 'Ram'
    },
    {
      id: 'v29',
      model: 'promaster3500',
      yearStart: null,
      yearEnd: null,
      side: 'lado',
      image: 'ram-promaster3500-lado.png',
      manufacturer: 'Ram'
    },
    {
      id: 'v30',
      model: 'promasterambulancia',
      yearStart: null,
      yearEnd: null,
      side: 'lado',
      image: 'ram-promasterambulancia-lado.png',
      manufacturer: 'Ram'
    },
    {
      id: 'v31',
      model: 'kangoo',
      yearStart: '2023',
      yearEnd: '2024',
      side: 'lado',
      image: 'renault-kangoo-2023-2024-lado.png',
      manufacturer: 'Renault'
    },
    {
      id: 'v32',
      model: 'hiace',
      yearStart: '2011',
      yearEnd: '2019',
      side: 'lado',
      image: 'toyota-hiace-2011-2019-lado.png',
      manufacturer: 'Toyota'
    },
    {
      id: 'v33',
      model: 'hiace',
      yearStart: '2020',
      yearEnd: '2024',
      side: 'lado',
      image: 'toyota-hiace-2020-2024-lado.png',
      manufacturer: 'Toyota'
    },
    {
      id: 'v34',
      model: 'caddyvan',
      yearStart: '2015',
      yearEnd: '2019',
      side: 'lado',
      image: 'vw-caddyvan-2015-2019-lado.png',
      manufacturer: 'Volkswagen'
    },
    {
      id: 'v35',
      model: 'crafter5.0',
      yearStart: '2011',
      yearEnd: '2018',
      side: 'lado',
      image: 'vw-crafter5.0-2011-2018-lado.png',
      manufacturer: 'Volkswagen'
    },
    {
      id: 'v36',
      model: 'crafter5.0',
      yearStart: '2019',
      yearEnd: '2024',
      side: 'lado',
      image: 'vw-crafter5.0-2019-2024-lado.png',
      manufacturer: 'Volkswagen'
    },
    {
      id: 'v37',
      model: 'eurovandiesel',
      yearStart: '2010',
      yearEnd: '2018',
      side: 'lado',
      image: 'vw-eurovandiesel-2010-2018-lado.png',
      manufacturer: 'Volkswagen'
    }
  ];
  
  export default vehicleObjects;