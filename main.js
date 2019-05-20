//require('dotenv').config()

const publicKey = "a0bcb75f9238bdf6361b953fd34f830e";
const privateKey = "e7458c06a6a98005d3055a05e01ac82e74c2a3dfY";
let ts = new Date().getTime();
const stringToHash = ts + privateKey + publicKey;
const hash = md5(stringToHash);

let url =
  "http://gateway.marvel.com:443/v1/public/characters/1009215/comics?orderBy=focDate" +
  "&ts=" +
  ts +
  "&apikey=" +
  publicKey +
  "&hash=" +
  hash;

let newArray = null;

fetch(url)
  .then(response => response.json())
  .then(data => {
    newArray = data.apis;
    console.log(data);
    console.log(newArray);
    console.log(newArray.operations);

    newArray.map(currentValue => {
      //selects id #characters on the <ul>
      let characterList = document.getElementById("characters");

      //create <li> element
      let createLi = document.createElement("li");

      //adds id #listItem to each <li>
      createLi.id = "listItem";

      //creates an <img> element
      let image = document.createElement("img");

      //creates <button> element
      let button = document.createElement("button");

      //creates text for each <button>
      let buttonText = document.createTextNode("See More");

      //adds text inside <button>
      button.appendChild(buttonText);

      //adds id #seeMoreButton to each <button>
      button.id = "seeMoreButton";

      //when <button> is clicked, adds a <p> element inside each <li>
      let boolean = true;
      button.addEventListener("click", e => {
        //prevents button from being clicked more than once
        if (boolean == false) {
          return;
        }
        boolean = false;

        //creates a <p> element
        let ageText = document.createElement("p");

        //adds id #moreInfo to each <p>
        ageText.id = "moreInfo";

        //creates text for each <p> from api
        let age = document.createTextNode("Age: " + currentValue.dob.age);
        let br = document.createElement("br");
        let zip = document.createTextNode(
          "Zip Code: " + currentValue.location.postcode
        );

        //adds text to each <p>
        ageText.appendChild(age);
        ageText.appendChild(br);
        ageText.appendChild(zip);

        //adds <p> inside <li>
        createLi.appendChild(ageText);
      });

      //adds the image url from api to <img>
      image.src = currentValue.Image;

      //adds <img> to <li>
      createLi.appendChild(image);

      //adds names from api inside each <li>
      createLi.appendChild(
        document.createTextNode(currentValue.Character.properties.name)
      );
      //adds <button> inside <li>
      createLi.appendChild(button);

      //adds each <li> inside <ul>
      characterList.append(createLi);
    });
  });
