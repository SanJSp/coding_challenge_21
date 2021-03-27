## GovData Dashboard

This webapp displays a small table displaying the amount of data-packages each ministry of germany has published on https://www.govdata.de/.
I've used the CKA-API and React to build this app.

## Setup

1. Clone this repository with `git clone https://github.com/SanJSp/coding_challenge_21.git`
2. Enter `cd gov-data-dashboard/` in your terminal
3. Run `npm start`
4. Open [http://localhost:3000](http://localhost:3000) to view the site in your browser.

#### Problems

If you run into Problems with your CORS requests, I recommend you to use chrome to test the app and use this [extension](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc). I did not have enough time to look deeper into that issue.

#### What I did

1. Setup React using [Facebooks Guide](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)
2. Setup [Material-UI Dashboard](https://medium.com/swlh/building-dashboards-quickly-with-react-and-material-ui-627074ff99ff)
3. Configure Dashboard to my liking
4. Implement Data Fetching using the CKA-API
5. Implemented the retrieval of the relevant data
6. Added data for ministries that had no data

#### Screenshots

![](https://i.imgur.com/y9pRw83.png)
