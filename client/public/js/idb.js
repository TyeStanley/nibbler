// create variable to hold db connection
let db;

// establish a connection
const request = indexedDB.open('food_fans', 1);

request.onupgradeneeded = function (event) {
  const db = event.target.result;

  db.createObjectStore('new_data', { autoIncrement: true });
}

// if successful, save reference to db in global variable
request.onsuccess = function (event) {
  db = event.target.result;

  // if app is online, upload data to api
  if (navigator.online) {
    
  }
}