# K-Tuotteet

K-Tuotteet is a service that allows users to query for and delete products.

Frontend:
React (tsx) & MUI

Backend: Express JS (ts)

Database:
All app data is stored in memory


### Local development

#### Requirements

You need to have node v20.\*.\* and npm installed on your machine.
nvm is also recommended:
running `nvm use` within the root folder of each project (k-frontend/k-backend) checks
that you have the required node version installed.

#### Starting the apps

##### Backend

- cd into k-backend and make sure you are running node v20.\*.\* (`nvm use`, if you have nvm installed)
- run `npm i` to install dependencies
- start backend with `npm run dev`
- backend will respond at http://localhost:3001

##### Frontend

- cd into k-frontend and make sure you are running node v20.\*.\* (`nvm use`, if you have nvm installed)
- run `npm i` to install dependencies
- start frontend with `npm run start`
- frontend will be available at http://localhost:3000

Running `ctrl-c` in the terminal stops the app(s).

Hot reload is utilized in both apps, so you don't need to restart after making changes.


#### Running tests

Jest is used as the test runner for both apps. 

React Testing Library is also used to facilitate component testing in the frontend.


To execute backend tests:
cd into k-backend and run `npm run test`

To execute frontend tests:
cd into k-frontend and run `npm run test`

### Endpoints

The backend has endpoints for querying products and brands by different criteria


#####  All products

`curl http://localhost:3001/products`

##### Product by id (ean)

`curl -G -d "ean=6411401015090" http://localhost:3001/products/search`

##### Products by name/brand/ean/category (case insensitive, substring match)

`curl -G -d "name=fazer" http://localhost:3001/products/search`

###### Searching for products by multiple filters (frontend does not support this yet)

`curl -G -d "name=banaani"  -d "brand=pirkka" http://localhost:3001/products/search`

##### Products by price range

`curl -G -d "minPrice=4"  -d "maxPrice=10" http://localhost:3001/products/search`

##### Deleting a product by ean (not yet fully implemented in frontend)

`curl -X "DELETE" http://localhost:3001/products/delete/2000798000006`

#### All brands

`curl http://localhost:3001/brands`


### Future considerations

- Both apps should be dockerized to avoid having to install stuff on your own computer + 
ease running apps with `docker compose`.
- An actual db should be implemented to persist data.
- Backend error handling should be improved (at least when a real db is introduced)
- A logging system should be introduced, to allow documenting errors
- e2e tests (frontend app already has Playwright!)
- frontend UX and color scheme need work
- frontend error handling for async functions
- all user input should be validated/sanitized
- for now, only the input field is debounced in the frontend, whereas
a request is sent to the backend every time a filter or the price range changes 
    - especially the price range is problematic, as it runs A LOT of queries, should be debounced
    but the initial attempt made the slider wonky
- should cleanup unused files, package.json entries and dependencies
- categories and brands should probably be presented to the user in a multiselect dropdown of some sort
    - then, the keywords used for the query should only apply to the name and/or brand -properties (currently, the keywords are used
    to filter the results against every selected property except price)
- currently, if no filter is selected, backend returns all results regardless of the keyword provided (this pertains to the above observations and change requirements)





