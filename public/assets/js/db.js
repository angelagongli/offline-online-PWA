let db;
// create a new db request for a "budget" database.
let request = window.indexedDB.open("budget", 1);

request.onupgradeneeded = function(event) {
  // create object store called "pending" and set autoIncrement to true
  db = event.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = function(event) {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function(event) {
  // log error here
  console.log("Error due to " + request.error);
};

function saveRecord(record) {
  // create a transaction on the pending db with readwrite access
  const transaction = db.transaction("pending", "readwrite");
  // access your pending object store
  const store = transaction.objectStore("pending");
  // add record to your store with add method.
  store.add(record);
}

function checkDatabase() {
  // open a transaction on your pending db
  const transaction = db.transaction("pending", "readwrite");
  // access your pending object store
  const store = transaction.objectStore("pending");
  // get all records from store and set to a variable
  const getAll = store.getAll();

  getAll.onsuccess = function() {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(() => {
          // if successful, open a transaction on your pending db
          const clear = db.transaction("pending", "readwrite");
          // access your pending object store
          const store = clear.objectStore("pending");
          // clear all items in your store
          const clearRequest = store.clear();
          clearRequest.onsuccess = function(event) {
            console.log("Pending object store cleared!");
          }
      });
    }
  };
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);