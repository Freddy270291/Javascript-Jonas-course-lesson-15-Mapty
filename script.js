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

class App {
  // Private properties (present in all the istances created through this class)
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();

    // FUNCTION per creare workout quando si pigia invio
    form.addEventListener('submit', this._newWorkout.bind(this));

    // Change Cadence to Elevation gain when switch between running and cycling
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    // GEOLOCATION
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('We could not get your position');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords; // Destructuring
    const { longitude } = position.coords;
    // SHOW THE MAP (3rd party app: LEAFLET)

    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, 16);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map:
    // MARKER - we can add an event listener on the map (the method .on() comes from the Leaflet library)
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    // SHOW THE FORM
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    // Clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
      '';

    // Display the marker
    const { lat, lng } = this.#mapEvent.latlng;

    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  }
}

const app = new App();
