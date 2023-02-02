import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.get("/", (req, res) => {
    res.json("Server is ready.")
})

app.get("/api/ready", (req, res) => {
  res.json({ message: "Enter URL to scam Google Form ⬇" });
});


;(async () => {

    app.post("/api", async (req, res) => {
        const url = req.body;
        console.log('==> url is: ', url)
        const URL = url.URL;
        console.log('==> URL is: ', URL)
        const confirm = await form(URL);
        res.json({ message: confirm });

    res.send()

})



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


const form = async (url) => {

    //@dev Change pace of spin with timeout near bottom. Just for kicks. 
    var timerAnimation = (function() {
        var P = ["[\\]", "[|]", "[/]", "[-]"];
        var start = 0;
        return setInterval(function() {
            process.stdout.write("\r" + P[start++]);
            start &= 3;
        }, 150);
    })();

    function delay(time) {
        return new Promise(function(resolve) {
            setTimeout(resolve, time)
        });
    }

    async function getReport(_page, _delay) {
        console.log("==> Getting link to form report and navigating there, stand by...")
        let linkEl = await _page.$eval('body > div > div:nth-child(2) > div > div.v1CNvb.sId0Ce > a:nth-child(1)', el => el.href)
        await _delay(1000)
        await _page.goto(linkEl);
    };


    //@dev Differs by report. Need to add link to video to report when calling script.
    let scamLink = url;

    const browser = await puppeteer.launch({headless:false});

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

        await browser.close()

        
        return(`✅ Successfully reported form: ${scamLink}`);

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


