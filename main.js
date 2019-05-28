"use strict";
const assert = require("assert");

require('dotenv').config();
const fetch = require('node-fetch');
const readline = require('readline');

const apiKey = '3c82ce574363740a47d3fb42a6269a94';

const baseURL = 'https://sandbox-api.brewerydb.com/v2/';

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

function getPrompt() {
rl.question('Which US zipcode would you like to look up? ', (zipcode) => {
getBreweries(zipcode);
});
}

const getBreweries = (zipcode) => {
fetch(baseURL + 'locations/?key=' + apiKey + '&postalCode=' + zipcode)
.then(res => {
if(!res.ok) {
throw Error(res.statusText);
} return res.json();
})
.then(obj => {
const data = obj.data;
if (obj.totalResults === undefined) {
console.log('No breweries available. Try another zipcode.'.red);
getPrompt();
} else {
console.log(colors.blue('Total Results: ') + obj.totalResults);
console.log(' ');
printResults(data);
}
})
.catch(err => console.log(Error,  `${err}`))
}

const printResults = (brewery) => {
brewery.forEach(val => {
console.log(colors.green('Name: ') + val.name);
console.log(colors.green('Phone: ') + val.phone);
console.log(colors.green('Website: ') + val.website);
console.log(colors.green('Address: ') + val.streetAddress);
console.log(colors.green('Desription: ') + val.brewery.description); 
console.log(' ');
});
getPrompt();
}

getPrompt();

//tests
describe('fetch', function() {
  it('baseURL', function() {
    assert.deepEqual(baseURL, "https://sandbox-api.brewerydb.com/v2/")
  })
  it('apiKey', function() {
    assert.deepEqual(apiKey, '3c82ce574363740a47d3fb42a6269a94')
  })
  it('nodeFetch', function() {
    assert.deepEqual(fetch, require('node-fetch'))
  })
  it('readline', function() {
    assert.deepEqual(readline, require('readline'))
  })
})