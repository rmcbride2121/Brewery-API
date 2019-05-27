require('dotenv').config();
const fetch = require('node-fetch');

const baseURL = 'https://sandbox-api.brewerydb.com/v2/';

  fetch(baseURL + 'locations/?key=' + process.env.KEY + '&postalCode') //eventually add user input
  .then(res => {
    if(!res.ok) {
      throw Error(res.statusText)
    } return res.json()
  })
  .then(obj => {
    const data = obj.data[0];

    const breweryName = data.name;
    const breweryAddress = data.streetAddress;
    const breweryPhone = data.phone;

    console.log(breweryName);
    console.log(breweryAddress);
    console.log(breweryPhone);
  })
  .catch(err => console.log(`Error,  ${err}`))