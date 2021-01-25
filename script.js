'use strict';

// prettier-ignore

////////////// PLANNING ////////////////
/*

1. As a user, I want to log my running workouts with location, distance, time, pace and steps/minute, so I can keep a log of any running
--> Map where user clicks to add new workout (best way to get location coordinates)
    Geolocation to display map at current location
    Form to input distance, time, pace, steps/minute

2. As a user, I want to log my cycling workouts with location, distance, time, pace and elevation gain, so I can keep a log of any running
--> For to input distance, time, pace, elevation gain

3. As a user, I want to see all my workouts at a glance, so I can easily track my progress over time
--> Display all workouts in a list

4. As a user, I want to also see my workouts on a map, so I can easily check where I work out the most
--> Display all workouts on the map

5. As a user, I want to see all my workouts when I leave the app and come back later
--> Store workout data in the browser using local storage API
    On page load, read the saved data from local storage and display

*/

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// GEOLOCATION
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords; // Destructuring
      const { longitude } = position.coords;
      console.log(`https://www.google.it/maps/@${latitude},${longitude}`);
      // SHOW THE MAP (3rd party app: LEAFLET)

      const coords = [latitude, longitude];
      const map = L.map('map').setView(coords, 15);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
    },
    function () {
      alert('We could not get your position');
    }
  );
