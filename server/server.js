import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs-extra';
import bodyParser from 'body-parser';
import express from 'express';
import chromium from 'chromium';
import {execFile} from 'child_process';
import * as dotenv from 'dotenv';
dotenv.config();
//import cors from 'cors';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

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

app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", ["https://scamreporterfront.onrender.com", "https://scamreporterfront.onrender.com/signup", "https://scamreporterfront.onrender.com/login"]); //@dev "https://scamreporterfront.onrender.com" For local: "http://localhost:3000/"
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS"
      );
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.header("Cross-Origin-Opener-Policy", "same-origin-allow-popups")
      res.header("Access-Control-Allow-credentials", true);
      res.header("Access-Control-Allow-Headers", "Content-Type");
      next();
    });

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
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
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}



app.post("/signup", async (req, res) => {
  try {
    // console.log({ verified: verifyGoogleToken(req.body.credential) });
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      DB.push(profile);

      res.status(201).json({
        message: "Signup was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, "myScret", {
            expiresIn: "1d",
          }),
        },
      });
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

      const profile = verificationResponse?.payload;

      const existsInDB = DB.find((person) => person?.email === profile?.email);

      if (!existsInDB) {
        return res.status(400).json({
          message: "You are not registered. Please sign up",
        });
      }

      res.status(201).json({
        message: "Login was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          }),
        },
      });
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
  res.json({ message: "Enter URL to scam Google Form ⬇" });
});

let DB = [];


;(async () => {

    app.post("/api", async (req, res) => {
        const url = req.body;
        const URL = url.URL;
        console.log('==> URL is: ', URL)
        
        const confirm = await form(URL);
        res.json({message: confirm });

        res.send()

})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


const form = async (url) => {

    function delay(time) {
        return new Promise(function(resolve) {
            setTimeout(resolve, time)
        });
    };


    async function getReport(_page, _delay) {
        console.log("==> Getting link to form report and navigating there, stand by...")
        let linkEl = await _page.$eval('body > div > div:nth-child(2) > div > div.v1CNvb.sId0Ce > a:nth-child(1)', el => el.href)
        //console.log(`==> Link is: ${linkEl}`)
        await _delay(1000)
        await _page.goto(linkEl);
    };


    //@dev Scam form link 
    let scamLink = url;

    //@dev Executable path comes from chromium package. Error thrown when attempt to download chromium with head and without specified package. 
    const browser = await puppeteer.launch( {executablePath: chromium.path, args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--no-default-browser-check']});

    //const browser = await puppeteer.launch( { executablePath: chromium.path} ); @dev this does not work. 

    //@dev Reuse same tab in browser window.
    const pages = await browser.pages();
    const page = await pages[0];
    await page.goto(scamLink);
    console.log("📎 Starting Google form reporting process, just a moment...");
    console.log("Reporting: ", scamLink);

    await page.setViewport({
        width: 1366,
        height: 786
    });

    //@dev Set constants for page selectors
    const spam = 'div[data-value="SPAM"]';
    const submit = 'body > div > div:nth-child(2) > form > div.GtnJQe > div.U26fgb.O0WRkf.zZhnYe.e3Duub.C0oVfc.M9Bg4d > div.ZFr60d.CeoRYc';

    try {

        await delay(1000)
        page.waitForNavigation({ waitUntil: 'domcontentloaded' })

        await getReport(page, delay)
        await delay(1000)

        console.log("==> Selecting report type")
        await page.waitForSelector(spam)
        await page.waitForTimeout(1000)
        await page.click(spam)
        await page.waitForTimeout(500)

        console.log("==> Submitting form")
        await page.waitForSelector(submit)
        await page.waitForTimeout(1000)
        await page.click(submit)
        await page.waitForTimeout(500)

        console.log(`✅ Successfully reported form: ${scamLink}`)

        await page.waitForTimeout(500)

        console.log('==> Taking screenshot');
        let image = await page.screenshot({fullPage : true});
        
        let strImg = image.toString('base64');

        await browser.close()

        console.log('==> Saved screenshot!');

        return(strImg);

    } catch (err) {

        let exists = await Object.values(err).includes("TimeoutError");

        if (exists) {
            console.log(" ✔ Timed out, but that's normal");
            return('✔ Timed out');
        } else {
            console.log("🛑 Error occurred, please check your node server console as well: ", { err });
            return('"🛑 Error occurred, please check your node server:', err.message );
        }

    } 

}

})()


