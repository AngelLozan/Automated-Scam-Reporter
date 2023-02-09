import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());
import chromium from 'chromium';
import path from 'path';

const Youtube = async (url, _WC, _BLOG) => {

    function delay(time) {
        return new Promise(function(resolve) {
            setTimeout(resolve, time)
        });
    }

    let link;
    let spam;
    let report;


    //@dev Differs by report. Need to add link to video to report when calling script.
    let scamLink = url;
    let linksDescription;

    if ( _WC === "true" ) {
         linksDescription === 1
    } else if ( _BLOG === "true" ) {
         linksDescription === 2
    } else {
         linksDescription === 3
    }
     

    async function getReport(_page) {
        console.log('==> Finding the report button, stand by...')
        let options = await _page.evaluate(
            () => Array.from(
                document.querySelectorAll('tp-yt-iron-dropdown > #contentWrapper > ytd-menu-popup-renderer > #items > ytd-menu-service-item-renderer > tp-yt-paper-item > yt-formatted-string'),
                yt => yt.textContent
            ));
        let opt = await options.findIndex(element => element.includes('Report'));
        let addOne = await opt + 1;
        report = `#items > ytd-menu-service-item-renderer:nth-child(${addOne}) > tp-yt-paper-item`;
        //console.log("Report selector path is: ", report)
        return report;
    };

    async function findAbout(_page, _delay) {
        console.log('==> Finding the about tab, stand by...')
        let options = await _page.evaluate(
            () => Array.from(
                document.querySelectorAll('tp-yt-paper-tab'),
                tabDiv => tabDiv.textContent
            ));
        let tab = await options.findIndex(element => element.includes('About'))

        let list = await _page.$$('tp-yt-paper-tab');
        await _delay(1000)
        await list[tab].click()
    };



    async function findScamItem(_page, _delay) {
        console.log('==> Choosing scam from list, stand by...')
        let arr = await _page.evaluate(
            () => Array.from(
                document.querySelectorAll('tp-yt-paper-item'),
                tabDiv => tabDiv.textContent
            ));

        let choice = await arr.findIndex(element => element.includes('Scams'));

        console.log('Choice is: ', choice)

        let listItems = await _page.$$('tp-yt-paper-item');
        await _delay(1000)
        await listItems[choice].click()

    };


    async function linksInDescription(_linksDescription, _page) {
        if (_linksDescription == 1) {
            console.log('==> Applies to links in video description is true');
            await _page.waitForTimeout(1000);
            const linksCheck = '#checkboxContainer'; //based on parameter 
            await _page.waitForSelector(linksCheck);
            await _page.waitForTimeout(1000);
            await _page.click(linksCheck);
        } else {
            console.log('==> No links in description selected.');
        }
    };

    async function detailsLinksDescriptionVideo(_linksDescription, _page, _textarea, _detailsValue, _detailsThree, _detailsFour, _submitOne) {
        if (_linksDescription == 1) {
            console.log("==> Enter additional details for malicious description link.")
            await _page.waitForSelector(_textarea),
                //await _page.waitForTimeout(1000),
                await _page.type(_textarea, _detailsValue, { delay: 10 }),
                await _page.waitForTimeout(500),

                console.log("==> Submit video report.")
            await _page.waitForSelector(_submitOne)
            await _page.waitForTimeout(500)
            await _page.click(_submitOne)
            await _page.waitForTimeout(1000)

        } else if (_linksDescription == 2) {
            console.log("==> Enter additional details for malicious comment link.")
            await _page.waitForSelector(_textarea),
                await _page.waitForTimeout(1000),
                await _page.type(_textarea, _detailsThree, { delay: 10 }),
                await _page.waitForTimeout(500),

                console.log("==> Submit video report.")
            await _page.waitForSelector(_submitOne)
            await _page.waitForTimeout(500)
            await _page.click(_submitOne)
            await _page.waitForTimeout(1000)

        } else {
            console.log("==> Enter additional details for general malicious wallet.")
            await _page.waitForSelector(_textarea)
            await _page.waitForTimeout(1000)
            await _page.type(_textarea, _detailsFour, { delay: 10 })
            await _page.waitForTimeout(500)

            console.log("==> Submit video report.")
            await _page.waitForSelector(_submitOne)
            await _page.waitForTimeout(500)
            await _page.click(_submitOne)
            await _page.waitForTimeout(1000)
        }
    };

    async function detailsLinksDescriptionProfile(_linksDescription, _page, _details, _detailsTwo, _detailsThree, _detailsFive, _submitTwo) {
        if (_linksDescription == 1) {
            console.log("==> Enter additional details for malicious description link.")
            await _page.waitForSelector(_details),
                //await _page.waitForTimeout(1000),
                await _page.type(_details, _detailsTwo, { delay: 10 }),
                await _page.waitForTimeout(500),

                console.log("==> Submit profile report.")
            await _page.waitForSelector(_submitTwo)
            await _page.waitForTimeout(500)
            await _page.click(_submitTwo)
            await _page.waitForTimeout(1000)

        } else if (_linksDescription == 2) {
            console.log("==> Enter additional details for malicious comment link.")
            await _page.waitForSelector(_details),
                await _page.waitForTimeout(1000),
                await _page.type(_details, _detailsThree, { delay: 10 }),
                await _page.waitForTimeout(500),

                console.log("==> Submit profile report.")
            await _page.waitForSelector(_submitTwo)
            await _page.waitForTimeout(500)
            await _page.click(_submitTwo)
            await _page.waitForTimeout(1000)

        } else {
            console.log("==> Enter additional details for general malicious wallet.")
            await _page.waitForSelector(_details)
            await _page.waitForTimeout(1000)
            await _page.type(_details, _detailsFive, { delay: 10 })
            await _page.waitForTimeout(500)

            console.log("==> Submit profile report.")
            await _page.waitForSelector(_submitTwo)
            await _page.waitForTimeout(500)
            await _page.click(_submitTwo)
            await _page.waitForTimeout(1000)
        }
    };

    async function getProfileLink(_page) {
        console.log('==> Getting link to scammer profile.')
        let links = await _page.evaluate(
            () => Array.from(
                document.querySelectorAll('a[href]'),
                a => a.getAttribute('href')
            ));
        let username = await links.find(element => element.includes("@"));

        link = `https://www.youtube.com` + username;
        console.log('==> Link to scammer profile is: ', link);
        return link;
    };


    async function getScamItem(_listItems) {
        spam = _listItems[33];
        return spam;
    };


    const browser = await puppeteer.launch({ executablePath: chromium.path, args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-first-run', '--no-default-browser-check'] });

    //@dev Reuse same tab in browser window.
    const pages = await browser.pages();
    const page = await pages[0];
    await page.goto(scamLink);
    console.log("📼 Starting youtube scam reporting process, just a moment...");
    console.log("Reporting: ", scamLink);

    await page.setViewport({
        width: 1366,
        height: 786
    });

    //@dev Set constants for page selectors

    const dots = '#button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill';
    const dropDown = '#input-6 > input';
    const next = 'yt-button-renderer[id="submit-button"]';
    const textArea = '#description-text > div.textarea-container.fit.style-scope.tp-yt-iron-autogrow-textarea > #textarea'; //@dev This did change
    //@dev This var for testing 👇
    //const detailsValue = 'Videos have link in description that forwards people to malicious download that phishes people\'s login information and then steals their money. We have customers who\'ve been scammed out of thousands of dollars. Same link is being used in multiple accounts on multiple videos. Please remove this scammer. Thank you! ';
    //@dev This var for prod 👇
    const detailsValue = 'Videos have link in description that forwards people to malicious download that phishes people\'s login information and then steals their money. Same link is being used in multiple accounts on multiple videos. Please remove this scammer. Thank you! \n \n Scott Lozano \n Exodus Wallet Security Team \n scott.lo@exodus.com / scott.lo@exodus.io \n www.exodus.com';
    const submitOne = '#submit-button > yt-button-renderer > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill';
    const close = '#confirm-button > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill';

    const reportUser = 'button[aria-label="Report user"]';
    const reportUserStr = '#items > ytd-menu-service-item-renderer:nth-child(4) > tp-yt-paper-item';
    const spamScam = 'tp-yt-paper-radio-button[name="6"]';
    const nextIssue = '#next-button > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill';
    const nextOptions = '#next-button > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill';
    const details = '#textarea';
    const detailsTwo = 'Videos have links in the description that forward people to malicious download that phishes people\'s login info & then steals their money. We have customers who\'ve been scammed out of thousands of dollars. Same link being used in multiple accounts on multiple videos. Please remove. Thanks!';
    const detailsThree = 'Videos have links in the comments from the poster for a malicious download that phishes login info. We have customers scammed out of thousands of dollars. The link is used in multiple videos. Please remove. Thank you! \n Exodus Wallet Security Team \n scott.lo@exodus.com \n scott.lo@exodus.io';
    const detailsFour = 'This video is deceptive in nature, it encourages users to use compromised software and steal the funds sent to that software by the user. We have customers who\'ve been scammed out of thousands of dollars. Thank you for removing this 🙏 Thank you! \n \n Scott Lozano \n Exodus Wallet Security Team \n scott.lo@exodus.com / scott.lo@exodus.io \n www.exodus.com';
    const detailsFive = 'This profile is posting videos deceptive in nature, encouraging use of compromised software that steals funds sent to that software by a user. We have customers who\'ve been scammed out of thousands. Please remove. \n Exodus Wallet Security Team \n scott.lo@exodus.com \n scott.lo@exodus.io';
    const submitTwo = '#next-button > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill';
    const ok = '#confirm-button > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill';

    try {

        await delay(1000)
        page.waitForNavigation({ waitUntil: 'domcontentloaded' })

        await page.waitForSelector(dots)
        console.log("==> Reporting video")
        await page.waitForTimeout(1000)
        await page.click(dots)
        await page.waitForTimeout(500)

        await getReport(page)
        await delay(1000)

        await page.waitForSelector(report)
        await page.waitForTimeout(1000)
        await page.click(report)
        await page.waitForTimeout(500)


        let spamList = await page.$$('#radioContainer');
        console.log("==> Selecting Spam/Misleading.")
        await delay(1000)
        await spamList[8].click();

        await delay(1000)

        await page.waitForSelector(dropDown)
        await page.click(dropDown)
        await page.waitForTimeout(1000)

        // await page keyboard.press('Tab');
        // await page.waitForTimeout(500)
        // await page.keyboard.press('Space')
        // await page.waitForTimeout(500)
        // await page.keyboard.press('ArrowDown')
        // await page.waitForTimeout(500)
        // await page.keyboard.press('ArrowDown')
        // await page.waitForTimeout(500)
        // await page.keyboard.press('ArrowDown')
        // await page.waitForTimeout(500)
        // await page.keyboard.press('ArrowDown')
        // await page.waitForTimeout(500)
        // await page.keyboard.press('ArrowDown')
        // await page.waitForTimeout(500)
        // await page.keyboard.press('Enter')
        // await page.waitForTimeout(500)

        //@dev How to find list items, return to: let listItems = await page.evaluate(() => Array.from(document.querySelectorAll('tp-yt-paper-item'), element => element.textContent));
        //@dev Can improve by getting all items and then finding matching inner text then output match. Lazy way here.

        //@dev Select correct item from list dropdown
        await findScamItem(page, delay)

        //@dev Check box or not depending if links are in description
        await linksInDescription(linksDescription, page)

        //@dev TO DO: Insert function for matching url of video to list of videos and selecting. 

        await page.waitForSelector(next)
        await page.waitForTimeout(500)
        await page.click(next)
        await page.waitForTimeout(500)

        //@dev Enter details depending on parameter passed for malicious links found in comments or description
        await detailsLinksDescriptionVideo(linksDescription, page, textArea, detailsValue, detailsThree, detailsFour, submitOne)


        await delay(1000)


        console.log("==> Close and report user account")
        await page.waitForSelector(close)
        await page.waitForTimeout(500)
        await page.click(close)


        await delay(2000)

        //@dev Get the user profile link, navigate there and report user.
        await getProfileLink(page)


        await delay(1000)
        console.log('==> Navigate to profile to report.')
        await page.goto(link);
        await delay(3000)

        await findAbout(page, delay)

        await delay(1000)

        console.log("==> Start report of profile.")

        await page.waitForSelector(reportUser)
        await page.waitForTimeout(500)
        await page.click(reportUser)
        await page.waitForTimeout(500)

        await page.waitForSelector(reportUserStr)
        await page.waitForTimeout(500)
        await page.click(reportUserStr)
        await page.waitForTimeout(500)


        console.log("==> Select Spam and scams")
        await page.waitForSelector(spamScam)
        await page.waitForTimeout(500)
        await page.click(spamScam)
        await page.waitForTimeout(500)

        console.log("==> Click next")
        await page.waitForSelector(nextIssue)
        await page.waitForTimeout(500)
        await page.click(nextIssue)
        await page.waitForTimeout(500)

        //@dev to do: Match URL of video from before to list item

        console.log("==> Click next again")
        await page.waitForSelector(nextOptions)
        await page.waitForTimeout(500)
        await page.click(nextOptions)
        await page.waitForTimeout(500)

        //@dev If more details due to the precense of links in description, user input 1 or nothing, then add detail. Else submit. 
        await detailsLinksDescriptionProfile(linksDescription, page, details, detailsTwo, detailsThree, detailsFive, submitTwo)


        await page.waitForSelector(ok)
        await page.waitForTimeout(500)
        await page.click(ok)
        await page.waitForTimeout(500)

        console.log("✅ Successfully reported video and scammer profile.")
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

export default Youtube;