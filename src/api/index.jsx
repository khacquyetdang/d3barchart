var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

export default function fetchCountryData() {
    return fetch('http://api.worldbank.org/countries?format=json&per_page=1000', myInit)
    .then((response) => response.json()).then((responseJson) => {
        console.log("result fetchCountryData");
        console.log(responseJson);
        return responseJson;
    })
    .catch((error) => {
        console.error(error);
    });
}
