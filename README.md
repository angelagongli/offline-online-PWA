# Offline-Online Budget Tracker PWA

## Description
This budget tracker application is a progressive web application that allows the user to track their expenses over time and also maintain functionality when the user is offline as one inevitably finds oneself. In the offline state, transactions are stored in an IndexedDB database until the application is able to identify that it is back online with its event listener listening for that event.

As a PWA, the budget tracker can be downloaded to your computer desktop by clicking on the small + enclosed in a circle on the right-hand side of your browser's address bar, and similarly can be added to the home screen of your iOS/Android phone via the share button. The application has a service worker registered in `index.html` and defined in `service-worker.js`, and a manifest file containing the app's metadata in `manifest.webmanifest`, two defining qualities of a PWA.

The budget tracker app is deployed to Heroku here: https://mighty-chamber-44000.herokuapp.com/

## Credits
The frontend of this project was completely written by the Coding Boot Camp at UT.

The budget tracker app uses [Express](http://expressjs.com/) to create the server and [mongoose](https://www.npmjs.com/package/mongoose) to create the MongoDB database/transaction model and perform queries on the database. IndexedDB stores transactions in a "pending" object store when the user is offline, while the service worker retrieves request responses stored in the cache to display app content that would otherwise be inaccessible in the offline state.

The [mLab MongoDB](https://devcenter.heroku.com/articles/mongolab) Heroku add-on hosts the MongoDB database used by the deployed app on the cloud.

[Chart.js](https://www.chartjs.org/) is used to create the visual representations of transactions over time with Canvas API.

## License
Copyright (c) Angela Li. All rights reserved.
Licensed under the [MIT License](LICENSE).