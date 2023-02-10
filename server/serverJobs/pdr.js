import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());
import chromium from 'chromium';
import path from 'path';

const PDR = async (url, _WC, _BLOG) => {

    function delay(time) {
        return new Promise(function(resolve) {
            setTimeout(resolve, time)
        });
    }

     async function noHTTPURLTwo(url) {
        let noHTTPTwo = await url.replace(/^.*h.*.*ps?:\/\//, '');
        let trimEndTwo = await noHTTPTwo.replace(/\/$/, '');
        let noEndTwo = await trimEndTwo.split('?');
        console.log("Formatted URL is: ", noEndTwo);
        return noEndTwo[0];
    }

    let reportType;
    let comment;


    //@dev Differs by report. Need to add link to video to report when calling script.
    let scamLink = url;

    if ( _WC === "true" ) {
         reportType = "🍉 Wallet Connect";
        comment = `${scamLink} \n \n This is a scam phishing website and not affiliated with any of the wallet platforms listed. This site phishes people\'s login phrase information and then steals their money. Clicking any of the wallet logos opens the page where info is phished. We have already started receiving support tickets from customers who have been scammed out of thousands of dollars. Please help us by shutting it down. Thank you! \n \n Scott Lozano \n Exodus Wallet Security Team \n scott.lo@exodus.com`;
    } else if ( _BLOG === "true" ) {
          reportType = "🖋 Blog Phishing";
        comment = `${scamLink} \n \n This is a blog that contains a link to a scam phishing website and not the real Exodus wallet. This blog is promoting a site that has copied our website using our trademarked company name and logo to impersonate us. The link redirects to a fake site that phishes people\'s login phrase information and then steals their money. We have already started receiving support tickets from customers who have been scammed out of thousands of dollars. Please help us by shutting it down. Thank you! \n \n Scott Lozano \n Exodus Wallet Security Team \n scott.lo@exodus.com`;
    } else {
         reportType = "🐠 Phishing General";
        comment = `${scamLink} \n \n This is a scam phishing website and not the real Exodus wallet. This site has copied our website using our trademarked company name and logo to impersonate us. It phishes people\'s login phrase information and then steals their money. We have already started receiving support tickets from customers who have been scammed out of thousands of dollars. Please help us by shutting it down. Thank you! \n \n Scott Lozano \n Exodus Wallet Security Team \n scott.lo@exodus.com`;
    }
     

    const browser = await puppeteer.launch({ executablePath: chromium.path, args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--no-default-browser-check'] });

       //@dev Reuse same tab in browser window.
    const pages = await browser.pages();
    const page = await pages[0];
    await page.goto(scamLink);
    console.log("📎 Starting PDR form reporting process, just a moment...");
    console.log("Reporting: ", scamLink);


    const site = 'https://publicdomainregistry.com/phishing/';
    const cookiePopUp = 'button[id="onetrust-accept-btn-handler"]';
    const name = 'input[name="your-name"]';
    const domain = 'input[name="text-748"]';
    const email = 'input[type="email"]';
    const describe = 'textarea[name="textarea-66"]';
    const upload = 'input[type="file"]';
    const check = 'input[name="gdpr-privacy-policy[]"]';
    const send = 'input[type="submit"]';
    const link = await noHTTPURLTwo(scamLink);

    try {

        await page.waitForTimeout(500)

        console.log('==> Taking screenshot');
        await page.screenshot({ 
            fullPage: true,
            path: 'pic.png' 
        });
      
        console.log('==> Saved screenshot!');
        await page.waitForTimeout(500)

   
        //@dev Report form through google form report page.
        console.log('==> Starting PDR report')
        await page.goto(site);
        await delay(1000)
        page.waitForNavigation({ waitUntil: 'domcontentloaded' })
        
        console.log("==> Accept cookies")
        await page.waitForSelector(cookiePopUp)
        await page.waitForTimeout(1000)
        await page.click(cookiePopUp)
        await page.waitForTimeout(500)

        console.log("==> Enter Name.")
        await page.waitForSelector(name)
        await page.waitForTimeout(500)
        await page.type(name, "Scott Lozano")
        await page.waitForTimeout(500)

        console.log("==> Enter Domain.")
        await page.waitForSelector(domain)
        await page.waitForTimeout(200)
        await page.type(domain, link)
        await page.waitForTimeout(500)

        console.log("==> Write Description.")
        await page.waitForSelector(describe)
        await page.waitForTimeout(200)
        await page.type(describe, comment)
        await page.waitForTimeout(500)

        console.log("==> Enter Email.")
        await page.waitForSelector(email)
        await page.waitForTimeout(500)
        await page.type(email, "scott.lo@exodus.io")
        await page.waitForTimeout(500)

        console.log('==>Upload screenshot')
        const filePath = path.relative(process.cwd(), './pic.png')
        const input = await page.$(upload)
        await page.waitForTimeout(500)
        await input.uploadFile(filePath)
        await page.waitForTimeout(2000)

        console.log("==> Check agree.")
        await page.waitForSelector(check)
        await page.waitForTimeout(1000)
        await page.click(check)
        await page.waitForTimeout(500)

        console.log("==> Submitting form")
        await page.waitForSelector(send)
        await page.waitForTimeout(1000)
        await page.click(send)
        await page.waitForTimeout(500)


        console.log("✅ Successfully reported form.")
     
        await page.waitForTimeout(500)

        console.log('==> Taking screenshot');
        let image = await page.screenshot({ fullPage: true });

        let strImg = await image.toString('base64');

        await page.waitForTimeout(500)

        await browser.close()

        console.log('==> Saved screenshot!');

        return (strImg);


    } catch (err) {
        let image = await page.screenshot({ fullPage: true });
        let strImg = await image.toString('base64');
        let exists = await Object.values(err).includes("TimeoutError");

        if (exists) {
            console.log(" ✔ Timed out, but that's normal")
            return (strImg);
        } else {
            console.log("🛑 Error occurred, please check your node server console as well: ", { err });
            return (strImg);
        }

    }

}

export default PDR;