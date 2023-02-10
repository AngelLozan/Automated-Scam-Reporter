import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());
import chromium from 'chromium';


const form = async (url) => {

    function delay(time) {
        return new Promise(function(resolve) {
            setTimeout(resolve, time)
        });
    };


    async function getReport(_page, _delay) {
        console.log("==> Getting link to form report and navigating there, stand by...")
        let linkEl = await _page.$eval('body > div > div:nth-child(2) > div > div.v1CNvb.sId0Ce > a:nth-child(1)', el => el.href)
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
        
        let strImg = await image.toString('base64');

        await browser.close()

        console.log('==> Saved screenshot!');

        return(strImg);

    } catch (err) {
        let image = await page.screenshot({fullPage : true});
        let strImg = await image.toString('base64');
        let exists = await Object.values(err).includes("TimeoutError");

        if (exists) {
            console.log(" ✔ Timed out, but that's normal");
            return(strImg);
        } else {
            console.log("🛑 Error occurred, please check your node server console as well: ", { err });
            return(strImg);
        }

    } 

}

export default form;