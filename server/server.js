import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs-extra';
import form from './serverJobs/form.js';
import tTok from './serverJobs/tTikTok.js';
//import bodyParser from 'body-parser';
import express from 'express';
import chromium from 'chromium';
import {execFile} from 'child_process';
import * as dotenv from 'dotenv';
dotenv.config();
//import cors from 'cors';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import path from 'path';

puppeteer.use(StealthPlugin());

//import Blob from 'node:buffer';
// import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;

const app = express();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

let DB = [];

app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "https://scamreporterfront.onrender.com"); //@dev "https://scamreporterfront.onrender.com" For local: "http://localhost:3000/"
      res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS"
      );
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.header("Cross-Origin-Opener-Policy", "same-origin-allow-popups")
      // res.header("Access-Control-Allow-credentials", true);
      res.header("Access-Control-Allow-Headers", "Content-Type");
      next();
    });

// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())

//@dev can use cors package, but does not set correct headers.
// app.use(
//   cors({
//     origin: ["https://scamreporterfront.onrender.com", "https://scamreporterfront.onrender.com/signup", "https://scamreporterfront.onrender.com/login", "https://autoreporter.onrender.com"], //@dev local dev http://localhost:3000
//     methods: "GET,POST,PUT,DELETE,OPTIONS",
//     credentials: true,
//   })
// );

app.use(express.json());


async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const pay = ticket.getPayload();
    return { payload: pay };

  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}



app.post("/signup", async (req, res) => {
  try {
    
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      } 

      const profile = await verificationResponse?.payload;
      //console.log(profile)
      
      if(profile.hd !== "exodus.io"){
       return res.status(400).json({ message: "Invalid user detected. Please use Exodus email." });
      } else {
        await DB.push(profile);
        res.set( "Content-Type", "application/json") 

        res.json({
          message: "Signup was successful",
          user: {
            firstName: profile?.given_name,
            lastName: profile?.family_name,
            picture: profile?.picture,
            email: profile?.email,
            token: jwt.sign({ email: profile?.email }, "myScret", {
              expiresIn: "1d"
            })
          }
        });
       res.send();
      }
    
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred. Registration failed.",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = await verificationResponse?.payload;

       if(profile.hd !== "exodus.io"){
          return res.status(400).json({ message: "Invalid user detected. Please use Exodus email." });
      } else {
          const existsInDB = await DB.find((person) => person?.email === profile?.email);

        if (!existsInDB) {
          return res.status(400).json({
            message: "You are not registered. Please sign up",
          });
        }
        res.set( "Content-Type", "application/json") 
        res.json({
          message: "Login was successful",
          user: {
            firstName: profile?.given_name,
            lastName: profile?.family_name,
            picture: profile?.picture,
            email: profile?.email,
            token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
              expiresIn: "1d"
            })
          }
        });
        res.send()
      }

    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
});

app.get("/", (req, res) => {
    res.json({message: "Server is ready."})
})

app.get("/api/ready", (req, res) => {
  res.json({ message: "Enter URL to scam ⬇" });
});


app.post("/api/google", async (req, res) => {
        const url = req.body;
        const URL = url.URL;
        console.log('==> URL is: ', URL)
        const confirm = await form(URL);
        res.status(201).json({message: confirm })
        // res.json({message: confirm });
        // res.send()
})

app.post("/api/tiktok", async (req, res) => {
        const url = req.body;
        const URL = url.URL;
        console.log('==> URL is: ', URL)
        const confirm = await tTok(URL);
        res.status(201).json({message: confirm })
        // res.json({message: confirm });
        // res.send()
})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});




