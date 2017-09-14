var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'no-cors',
               cache: 'default' };

export function fetchCountryData() {
    return fetch('https://api.worldbank.org/countries?format=json&per_page=1000', myInit)
    .then((response) => response.json()).then((responseJson) => {
        console.log("result fetchCountryData");
        console.log(responseJson);
        return responseJson;
    })
    .catch((error) => {
        console.error(error);
    });
}

export function fetchCountryGDP(countryId, intervalDate, page) {
    var urlCountryGdp = 'https://api.worldbank.org/countries/' + countryId + '/indicators/NY.GDP.MKTP.CD/?date=' + intervalDate.start +  ":"
    + intervalDate.end + '&format=json' + '&page=' + "&per_page=1000";
    console.log('urlCountryGdp : ', urlCountryGdp);
    return fetch(urlCountryGdp, myInit)
    .then((response) => response.json()).then((responseJson) => {
        console.log("result fetchCountryGdpData");
        console.log(responseJson);
        return responseJson;
    })
    .catch((error) => {
        console.error(error);
    });
}
