# Automated-Scam-Reporter

![Spam Banned Icon](https://github.com/AngelLozan/Automated-Scam-Reporter/blob/main/client/src/ban.png?raw=true)

Example stages. 

The app will take a url for a scam google form (or any) and sends it to the server where a puppeteer script runs and reports the form as a scam. It will then send a screenshot of the page following submission and send it to the app where a user can confirm the form was submitted. User is able to confirm and re-run the url if there is an error with copy paste. Simple UI lets a user know the script is running.

App: https://scamreporterfront.onrender.com/

Server: https://autoreporter.onrender.com/

- `/api/ready` is an additional GET request you can test on the server. 
  
Local testing add   `"proxy": "http://localhost:8080",` to root package.json (above eslint).


  


