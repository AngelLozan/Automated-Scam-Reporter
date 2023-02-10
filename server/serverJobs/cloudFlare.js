import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());
import chromium from 'chromium';



async function Cloud(url, _WC, _BLOG) {

    function delay(time) {
         return new Promise(function(resolve) {
             setTimeout(resolve, time)
         });
     }


//@dev Differs by report. Need to add link to video to report when calling script.
    let scamLink = url;
    

    let reportType;
    let comment;

    if ( _WC === "true" ) {
        reportType = "🍉 Wallet Connect";
        comment = 'This is a scam phishing website and not affiliated with any of the wallet platforms listed. This site phishes people\'s login phrase information and then steals their money. Clicking any of the wallet logos opens the page where info is phished. We have already started receiving support tickets from customers who have been scammed out of thousands of dollars. Please help us by shutting it down. Thank you! \n \n Scott Lozano \n Exodus Wallet Security Team \n scott.lo@exodus.com';
    } else if ( _BLOG === "true" ) {
        reportType = "🖋 Blog Phishing";
        comment = 'This is a blog that contains a link to a scam phishing website and not the real Exodus wallet. This blog is promoting a site that has copied our website using our trademarked company name and logo to impersonate us. The link redirects to a fake site that phishes people\'s login phrase information and then steals their money. We have already started receiving support tickets from customers who have been scammed out of thousands of dollars. Please help us by shutting it down. Thank you! \n \n Scott Lozano \n Exodus Wallet Security Team \n scott.lo@exodus.com';
    } else {
        reportType = "🐠 Phishing General";
        comment = 'This is a scam phishing website and not the real Exodus wallet. This site has copied our website using our trademarked company name and logo to impersonate us. It phishes people\'s login phrase information and then steals their money. We have already started receiving support tickets from customers who have been scammed out of thousands of dollars. Please help us by shutting it down. Thank you! \n \n Scott Lozano \n Exodus Wallet Security Team \n scott.lo@exodus.com';
        
    }

//@dev Executable path comes from chromium package. Error thrown when attempt to download chromium with head and without specified package. 
    const browser = await puppeteer.launch( {executablePath: chromium.path, args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--no-default-browser-check']});

    const cookies = [
  {
    name: '__cf_bm',
    path: '/',
    expires: 1709251199,
    size: 152,
    httpOnly: true,
    secure: true,
    session: false,
    sameSite: 'None',
    sameParty: false,
    sourceScheme: 'Secure',
    sourcePort: 443
  }
];

    //@dev Reuse same tab in browser window.
    const pages = await browser.pages();
    const page = await pages[0];
    await page.goto('https://abuse.cloudflare.com/phishing');
    await page.setCookie(...cookies)
    console.log("🌧 Starting Cloudflare Phishing reporting process, just a moment...");
    console.log(`Reporting: ${scamLink} for ${reportType}`);



//@dev Set constants for page selectors
const name = 'input[name="name"]';
const email = 'input[name="email"]';
const confirmEmail = 'input[name="email2"]';
const company = 'input[name="company"]';
const evidence = 'textarea[name="urls"]';
const logs = 'textarea[name="justification"]';
const submit = 'button[type="submit"]';

try {

        await delay(1000)
        //page.waitForNavigation({ waitUntil: 'domcontentloaded' })
   
        
        console.log("==> Enter Name.")
        await page.waitForSelector(name)
        //await page.waitForTimeout(1000),
        await page.type(name, "Scott lozano")
        await page.waitForTimeout(500)

        console.log("==> Enter Email.")
        await page.waitForSelector(email)
        await page.waitForTimeout(500)
        await page.type(email, "scott.lo@exodus.io")
        await page.waitForTimeout(500)

        console.log("==> Confirm Email.")
        await page.waitForSelector(confirmEmail)
        await page.waitForTimeout(500)
        await page.type(confirmEmail, "scott.lo@exodus.io")
        await page.waitForTimeout(500)

        console.log("==> Enter Company.")
        await page.waitForSelector(company)
        await page.waitForTimeout(500) 
        await page.type(company, "Exodus Movement, Inc.")
        await page.waitForTimeout(500)

        console.log("==> Enter URL.")
        await page.waitForSelector(evidence)
        await page.waitForTimeout(500) 
        await page.type(evidence, scamLink)
        await page.waitForTimeout(500)

        console.log("==> Enter violation description.")
        await page.waitForSelector(logs)
        await page.waitForTimeout(500) 
        await page.type(logs, comment)
        await page.waitForTimeout(500)


        console.log("==> Submit")
        await page.waitForSelector(submit)
        await page.waitForTimeout(1000)
        await page.click(submit)
        await page.waitForTimeout(500)

        console.log("✅ Completed the cloudflare report form.")
        await page.waitForTimeout(500)

        console.log('==> Taking screenshot');
        let image = await page.screenshot({fullPage : true});
        
        let strImg = await image.toString('base64');

        await page.waitForTimeout(500)

        await browser.close()

        console.log('==> Saved screenshot!');

        return(strImg);

        
} catch (err) {
            let image = await page.screenshot({fullPage : true});
            let strImg = await image.toString('base64');
            let exists = await Object.values(err).includes("TimeoutError");
            
            if (exists){
                console.log(" ✔ Timed out, but that's normal")
                return(strImg);
            } else {
                console.log("🛑 Error occurred, please check your node server console as well: ", {err});
                return(strImg);
            }

    } 

}


export default Cloud;




