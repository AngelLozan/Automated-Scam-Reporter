import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());
import chromium from 'chromium';
import path from 'path';


const tTok = async (url) => {

    function delay(time) {
         return new Promise(function(resolve) {
             setTimeout(resolve, time)
         });
     }

     async function usernameUse(_page){
        //console.log('==> Select do not want to use username')
            await page.waitForTimeout(500),
            await _page.keyboard.press('Tab')
            await _page.waitForTimeout(500)
            await _page.keyboard.press('Tab')
            await _page.waitForTimeout(500)
            await _page.keyboard.press('ArrowDown')
            await _page.waitForTimeout(500)
     };

    //@dev Differs by report. Need to add username to report when calling script.
    let scammerLink = url;


    //@dev Executable path comes from chromium package. Error thrown when attempt to download chromium with head and without specified package. 
    const browser = await puppeteer.launch( {executablePath: chromium.path, args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--no-default-browser-check']});


    //@dev Reuse same tab in browser window.
    const pages = await browser.pages();
    const page = await pages[0];
    await page.goto('https://www.tiktok.com/legal/report/Trademark?email=scott.lo%40exodus.io');
    console.log("🎵  Starting Tik Tok trademark reporting process, just a moment...");
    console.log("Reporting: ", scammerLink);

    await page.setViewport({
         width: 1200,
         height: 800
     });

    await page.setDefaultNavigationTimeout(120000);

//const reportForm = 'https://www.tiktok.com/legal/report/Trademark?email=scott.lo%40exodus.io';
//const cookies = await (await page.evaluateHandle(`document.querySelector("body > tiktok-cookie-banner").shadowRoot.querySelector("div > div.button-wrapper > button:nth-child(2)")`)).asElement();
//const cookies = (await page.waitForFunction(() => document.querySelector('div > div.button-wrapper > button:nth-child(2)'))).asElement();
const name = 'input[name="name"]';
const tmOwner = 'input[name="nameOfOwner"]';
const address = 'input[name="address"]';
const phone = 'input[name="phoneNumber"]';
const phoneNum = '18339922566';
const issue = 'div[id="extra.cfGoods"] > div:nth-child(3) > label > span';
const employee = '#relationship > div:nth-child(5) > label > span';
const upload = 'input[name="authorizations"]';
const jurisdiction = 'input[name="jurisdiction"]';
const registration = 'input[name="registrationNumber"]';
const tmGoods = 'input[name="goodsServiceClass"]';
const upload2 = 'input[name="certificate"]';
const urlTm = 'input[name="recordUrl"]';
const scammerBox = 'textarea[name="link"]';
const description = 'input[name="description"]';
const descriptionValue = 'This account is using our trademarked company name, logo and picture to impersonate us. They\'re commenting on our customers’ posts and luring them into DM\'s to phish their login information and then steal their money.';
const checkOne = '#Statement > div:nth-child(3) > label > span';
const checkTwo = '#Statement > div:nth-child(4) > label > span';
const checkThree = '#Statement > div:nth-child(5) > label > span';
const signature = 'input[name="signature"]';
const submit = '#main > div.jsx-741120737.jsx-1725592404.main-body.tiktok-web-article.page-with-header > div.jsx-3312377701.base-layout-container > main > article > div > button';

 try {

        await delay(2000)
        //page.waitForNavigation({ waitUntil: 'domcontentloaded' })
        //@dev Timeout set to detect if you've already reported tweet. If so, then end process or skip.
        await page.waitForSelector(name, {timeout: 1200})

                console.log("==> Accept cookies.")
                let pierced = await page.$$('pierce/button')
                await page.waitForTimeout(500)
                console.log(pierced)

               
                for (let i = 0; i < pierced.length; i++) {
                  let button = await (await pierced[i].getProperty('innerText')).jsonValue();
                    console.log(button)
                    if(button.includes('Accept')){
                      console.log('found')
                      await pierced[i].click();
                    }
                }

                console.log("==> Enter Name.")
                await page.waitForTimeout(1000)
                await page.type(name, "Scott Lozano")
                await page.waitForTimeout(500)

                console.log("==> Enter TM owner.")
                await page.waitForSelector(tmOwner)
                await page.waitForTimeout(500)
                await page.type(tmOwner, "Exodus Movement LLC")
                await page.waitForTimeout(500)

                console.log("==> Enter Address.")
                await page.waitForSelector(address)
                await page.waitForTimeout(500)
                await page.type(address, '15418 Weir St, Suite #333 Omaha, NE 68137')
                await page.waitForTimeout(500)

                console.log("==> Enter Phone number.")
                await delay(1000)
                await page.waitForSelector(phone)
                await page.waitForTimeout(500)
                await page.type(phone, phoneNum)
                await page.waitForTimeout(500)

                console.log("==> Select No.")
                await page.waitForSelector(issue)
                await page.waitForTimeout(500)
                await page.click(issue)
                await page.waitForTimeout(500)

                console.log("==> Choose employee.")
                await page.waitForSelector(employee)
                await page.waitForTimeout(1000)
                await page.click(employee)
                await page.waitForTimeout(500)

                console.log('==>Upload pdf of TM')
		        const filePath = path.relative(process.cwd(), './ExodusTradeMark.pdf')
				const input = await page.$(upload)
				await page.waitForTimeout(500)
				await input.uploadFile(filePath)
				await page.waitForTimeout(2000)

                console.log("==> Enter jurisdiction.")
                await page.waitForSelector(jurisdiction)
                await page.waitForTimeout(500)
                await page.type(jurisdiction, 'USPTO')
                await page.waitForTimeout(500)

                console.log("==> Enter Registration number.")
                await page.waitForSelector(registration)
                await page.waitForTimeout(500)
                await page.type(registration, '88021901')
                await page.waitForTimeout(500)
                
                console.log("==> Enter TM goods.")
                await page.waitForSelector(tmGoods)
                await page.waitForTimeout(500)
                await page.type(tmGoods, 'Company name "Exodus" & blue/purple logo')
                await page.waitForTimeout(500)

                console.log('==>Upload pdf of TM 2')
				const input2 = await page.$(upload2)
				await page.waitForTimeout(500)
				await input2.uploadFile(filePath)
				await page.waitForTimeout(2000)

                console.log("==> Enter Website.")
                await page.waitForSelector(urlTm)
                await page.waitForTimeout(500)
                await page.type(urlTm, 'https://uspto.report/TM/88021901'),
                await page.waitForTimeout(500)

                console.log("==> Enter scammer url")
                await page.waitForSelector(scammerBox)
                await page.waitForTimeout(500)
                await page.type(scammerBox, scammerLink)
                await page.waitForTimeout(500)

                console.log("==> Enter description")
                await page.waitForSelector(description)
                await page.waitForTimeout(500)
                await page.type(description, descriptionValue)
                await page.waitForTimeout(500)

                console.log("==> Check understanding one.")
                await page.waitForSelector(checkOne)
                await page.waitForTimeout(1000)
                await page.click(checkOne)
                await page.waitForTimeout(500)

                console.log("==> Check two.")
                await page.waitForSelector(checkTwo)
                await page.waitForTimeout(1000)
                await page.click(checkTwo)
                await page.waitForTimeout(500)

                console.log("==> Check three.")
                await page.waitForSelector(checkThree)
                await page.waitForTimeout(1000)
                await page.click(checkThree)
                await page.waitForTimeout(500)

                console.log("==> Enter Signature")
                await page.waitForSelector(signature)
                await page.waitForTimeout(500)
                await page.type(signature, 'Scott Lozano')
                await page.waitForTimeout(500)

                console.log("==> Submit.")
                await page.waitForSelector(submit)
                await page.waitForTimeout(1000)
                await page.click(submit)
                await page.waitForTimeout(500)
                
                await delay(1000),
                console.log("✅ Report filled successfully!")
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

export default tTok;









