# Automated-Scam-Reporter-v2

![Spam Banned Icon](https://github.com/AngelLozan/Automated-Scam-Reporter/blob/main/client/src/ban.png?raw=true)

Example stages. 

The app will take a url for a scam google form (or any) and sends it to the server where a puppeteer script runs and reports the form as a scam. It will then send a screenshot of the page following submission and send it to the app where a user can confirm the form was submitted. User is able to confirm and re-run the url if there is an error with copy paste. Simple UI lets a user know the script is running.

Google login routes added which can be modified for organization use.

App: https://scamreporterfront.onrender.com/

Server: https://autoreporter.onrender.com/

- `/api/ready` is an additional GET request you can test on the server. 
  
Local testing add   `"proxy": "http://localhost:8080",` to root package.json (above eslint).

## Updates needed for Localhost vs production:

- `server.js`
- `GeneralGoogle.jsx`
- `Signup.jsx`
- `Login.jsx`
- `Home.jsx`
- `TikTok.jsx`
  

## Project Organization

Two environment variables are needed in the server and one in the client side, which enable google authentication. 

The server is found on server.js and puppeteer scripts are stored as serverJobs and exported. 

The client side uses routing and screens to call different automated tasks according to the type of task.

Server job names and screen names should correspond, so that one screen may suffice to call multiple jobs in the future. 

Navbar, index.js in screens and App.js all need updating when a new screen is added. 



  


