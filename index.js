'use strict';

const request = require('request');
const { apikey } = require('./config.js');

const options = {
  method: 'GET',
  url: 'https://geocode-maps.yandex.ru/1.x/',
  qs: {
    apikey,
    geocode: 'Тисовая улица 4',
    format: 'json'
  },
};

// Send request https://geocode-maps.yandex.ru/1.x/?apikey=API_KEY_FROM_CONFIG_JS&geocode=Тисовая улица 4&format=json
request(options, (error, response, body) => {
  if (error) throw new Error(error);

  // Parse body
  const json = JSON.parse(body)

  console.log(json);
  /*
    {"response":{"GeoObjectCollection":{"metaDataProperty":{"GeocoderResponseMetaData":{"request":"Волгоград Тисовая улица 4","results":"10","found":"1"}},"featureMember":[{"GeoObject":{"metaDataProperty":{"GeocoderMetaData":{"precision":"exact","text":"Россия, Волгоград, Советский район, микрорайон Горьковский, Тисовая улица, 4","kind":"house","Address":{"country_code":"RU","formatted":"Россия, Волгоград, Советский район, микрорайон Горьковский, Тисовая улица, 4","postal_code":"400038","Components":[{"kind":"country","name":"Россия"},{"kind":"province","name":"Южный федеральный округ"},{"kind":"province","name":"Волгоградская область"},{"kind":"area","name":"городской округ Волгоград"},{"kind":"locality","name":"Волгоград"},{"kind":"district","name":"Советский район"},{"kind":"district","name":"микрорайон Горьковский"},{"kind":"street","name":"Тисовая улица"},{"kind":"house","name":"4"}]},"AddressDetails":{"Country":{"AddressLine":"Россия, Волгоград, Советский район, микрорайон Горьковский, Тисовая улица, 4","CountryNameCode":"RU","CountryName":"Россия","AdministrativeArea":{"AdministrativeAreaName":"Волгоградская область","SubAdministrativeArea":{"SubAdministrativeAreaName":"городской округ Волгоград","Locality":{"LocalityName":"Волгоград","DependentLocality":{"DependentLocalityName":"Советский район","DependentLocality":{"DependentLocalityName":"микрорайон Горьковский","Thoroughfare":{"ThoroughfareName":"Тисовая улица","Premise":{"PremiseNumber":"4","PostalCode":{"PostalCodeNumber":"400038"}}}}}}}}}}}},"name":"Тисовая улица, 4","description":"микрорайон Горьковский, Советский район, Волгоград, Россия","boundedBy":{"Envelope":{"lowerCorner":"44.338309 48.6894","upperCorner":"44.34652 48.694836"}},"Point":{"pos":"44.342414 48.692118"}}}]}}}
  */

  // Get array 'featureMember'
  const featureMember = json.response.GeoObjectCollection.featureMember;

  for (let item of featureMember) {
    // Get each 'Components' in 'featureMember'
    const components = item.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components;

    // Find item where kind === 'area' (район, округ) in 'Components'
    const area = components.find(_ => _.kind === 'area');

    // Check area (can be not exist)
    if (area) {
      // Show 'name'
      console.log(area.name);
    }
  }
});
