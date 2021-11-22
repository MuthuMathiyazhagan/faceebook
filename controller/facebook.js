const db = require('../db/db_connector');
const dbConfig = require('../db/dbConfig.json');
const puppeteer = require('puppeteer');
const useProxy = require('puppeteer-page-proxy');

const TIMEOUT = 15000;
const fs = require('fs');
// const C = require('../config.json');
const USERNAME_SELECTOR = '#email';
const PASSWORD_SELECTOR = '#pass';
const CTA_SELECTOR = 'button[type="submit"]';
var postCount, membersCount, timeSpan;

startBrowser = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        // args: ['--proxy-server=114.79.146.137:8080']
        // args: ['--proxy-server=139.5.29.97:39241']
    });
    const page = await browser.newPage();
    // await useProxy(page, 'http://125.16.111.194:8080');

    await page.authenticate({
        username: 'Selkaustavghosh',
        password: 'G4q3TcW',

        // for 103.199.187.15 // New One 
    });

    return { browser, page };
}

closeBrowser = async (browser) => browser.close();

playTest = async (url, searchString, postGroup, username, password) => {

    const { browser, page } = await startBrowser();
    page.setViewport({ width: 1366, height: 768 });

    await page.goto(url);
    console.log("Go to URL");

    // await page.screenshot({ path: 'glance-1.png' });

    // try {
    //     await page.waitForTimeout(TIMEOUT);

    //     await page.$(['data-cookiebanner="accept_button"']);
    //     // await page.screenshot({ path: 'withCookies.png' });
    //     await page.waitForTimeout(TIMEOUT);
    //     await page.click(['data-cookiebanner="accept_button"']);

    //     console.log("Exist");
    //     postMessage()

    // } catch {
    //     console.log("Does not exist");
    //     // await page.screenshot({ path: 'withOutCookies.png' });
    //     postMessage();
    // }



    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(username);
    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(password);
    // await page.click('[name="login"]');
    await page.keyboard.press("Enter");


    // await page.waitForNavigation();
    await page.waitForTimeout(TIMEOUT + 25000);
    // await waitTillHTMLRendered(page)
    console.log("Logged IN");
    // await page.screenshot({ path: 'glance0.png' });
    console.log("Please wait while all content get Loading..............");

    // // await page.click('[title="Accept All"]');
    await page.waitForTimeout(TIMEOUT + 5000);
    // console.log("Logged In Button Clicked");

    // await page.screenshot({ path: 'glance.png' });


    await page.waitForSelector('[href="/groups/"]');

    await page.click("[href='/groups/']");
    // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(TIMEOUT);

    console.log("Group Tab");

    // await page.screenshot({ path: 'glance1.png' });


    // await page.waitForSelector('[placeholder="Search groups"]');
    await page.click('[placeholder="Search groups"]');
    await page.keyboard.type(searchString);

    console.log("Search String Entered");
    // await page.screenshot({ path: 'glance2.png' });

    await page.keyboard.press("Enter");
    await page.waitForTimeout(TIMEOUT);

    // await page.waitForNavigation({ waitUntil: 'networkidle2' });


    // await page.screenshot({ path: 'glance3.png' });
    // await page.waitForSelector(`[aria-label="See All"]`);

    await page.click(`[aria-label="See all"]`);
    await page.waitForTimeout(TIMEOUT);
    console.log("See All Clicked");




    // await page.screenshot({ path: 'glance4.png' });

    // await autoScroll(page);

    const text = await page.evaluate(() => Array.from(document.querySelectorAll('[role="article"] [role="link"] span'), element => element.textContent));
    const groupDetails = await page.evaluate(() => Array.from(document.querySelectorAll('[role="article"] '), element => element.textContent));
    // console.log("Text:\n", groupDetails[0]);
    let match = /[0-9]{1,4}\S/.exec("one two 100");
    // await page.waitForTimeout(TIMEOUT);

    // await page.screenshot({ path: 'glance4B.png' });
    console.log("Join Group Will Call");
    // joinGroup(page);
    // await page.click('[role="article"] [role="button"]');
    await page.waitForTimeout(3000);

    // await page.click('[role="article"] [role="button"]');
    console.log("Join Group Button Clicked, for Unjoined Group");
    await nov3Code();
    async function nov3Code() {
        const join = await page.$$('[role="article"] [role="button"]');

        // await join[2].click();

        await page.waitForTimeout(TIMEOUT + 5000);


        await page.screenshot({ path: 'glance5.png' });
        const example = await page.$$('[role="article"] [role="link"] span');
        // await page.screenshot({ path: 'glance5.png' });
        const openGroup = await page.$$('[role="article"] [role="link"] span');

        for (let index = 0; index < 5; index++) {

            await page.evaluate(() => {
                window.scrollBy(0, 100);
            });

            await join[index].click();
            await page.waitForTimeout(3000);

            await openGroup[index].click();
            // await page.click('[role="article"] [role="link"] span');
            await postInGroup(page);

        }
    }


    // Duplicate
    async function newCode() {
        await page.evaluate(async () => {

            let join = $$('[role="article"] [role="button"]').toArray();
            let openGroup = $$('[role="article"] [role="link"] span').toArray();
            for (i = 0; i < /*elements.length*/5; i++) {
                console.log(join[i]);
                $(join[i]).click();
                await page.waitForTimeout(10000);

                console.log(openGroup[i]);
                $(openGroup[i]).click();

                await postInGroup(page);

            }
        });
    }

    async function oldOne() {

        const join = await page.$$('[role="article"] [role="button"]');
        // console.log(join);

        // await join[2].click();


        // await page.waitForTimeout(TIMEOUT + 5000);
        // await page.screenshot({ path: 'glance5.png' });
        const openGroup = await page.$$('[role="article"] [role="link"] span');

        for (let index = 0; index < 5; index++) {

            // console.log("Waiting for Selector  :   ", index, "\n");

            await page.waitForSelector(join[index]);
            await page.click(join[index]);

            await page.waitForSelector(openGroup[index]);

            await page.click(openGroup[index]);


            // await page.waitForTimeout(3000);
            // await page.click('[role="article"] [role="link"] span');
            await postInGroup(page);
        }

        // await openGroup[2].click();
        // await page.click('[role="article"] [role="link"] span');

        await page.waitForTimeout(TIMEOUT);
        // const Dialog = await page.evaluate(() => Array.from(document.querySelectorAll('[role="dialog"] '), element => element.textContent));
        // console.log(Dialog);

        // await postInGroup(page);


    }

    // await page.screenshot({ path: 'Dialog.png' });
    async function postInGroup(page) {
        try {
            console.log("Post Group");
            // await page.screenshot({ path: 'glance6.png' });
            console.log("Open Post Popup");

            try {
                await page.waitForTimeout(3000);
                await page.click('[data-pagelet="GroupInlineComposer"] [role="button"] span');
                // Does exist
            } catch {
                // Does not
                await page.goBack();
                return;
            }


            await page.waitForTimeout(TIMEOUT);


            // await page.screenshot({ path: 'glance7.png' });

            // await page.click('[id="placeholder-6hpma"]');
            await page.keyboard.type(postGroup);
            console.log("Typing the post text");
            await page.waitForTimeout(5000);


            await page.click('[aria-label="Post"]');

            console.log("Hit Post");

            await page.waitForTimeout(TIMEOUT);

            // await page.screenshot({ path: 'glance8.png' });
            console.log("\\n");
            await page.waitForTimeout(TIMEOUT);

            await page.goBack();

            await page.waitForTimeout(TIMEOUT);





        } catch (err) {
            console.log("Error On Posting ");
            console.log(err); // TypeError: failed to fetch
        }

    }


    // regEX();
    async function regEX() {
        console.log("regCalled");
        for (let i = 0; i < groupDetails.length; i++) {
            // console.log(i, "= ", groupDetails[i]);

            let str = groupDetails[i];
            let strR = str.replace("members", "members ");
            let strR2 = strR.replace(" · ", "");
            console.log("String:\n", strR2.substring(0, 200));
            console.log("Group Name: ", text[i]);


            postCount = /\w+(?=\s+posts)/.exec(strR2); // For No of Posts
            postCount = postCount[0];
            console.log("Post Count: ", postCount);

            membersCount = /(?<=group\s).*(?=\members)/.exec(strR2); // For No of Members
            membersCount = membersCount[0];
            console.log("Member Count: ", membersCount);

            timeSpan = /(?<=\bposts a\s)(\w+)/.exec(strR2); // For No of Members
            timeSpan = timeSpan[0];
            console.log("Time Span: ", timeSpan);
            console.log("i", i, "\n");

        }
    }

    // return db.getInstance().collection.insertOne(dbConfig.collections.group, { text: text, searchString: searchString, textFeed: groupDetails });

}

runScript = async (searchString, postGroup, username, password) => {
    await playTest("https://www.facebook.com/", searchString, postGroup, username, password);
    process.exit(1);
}

autoScroll = async (page) => {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 1000);
        });
    });
}

async function joinGroup(page) {
    console.log("Join Group Called");
    // await page.click('[role="article"] [role="button"]');
    // await page.waitForTimeout(3000);

    await page.click('[role="article"] [role="button"]');

    await page.waitForTimeout(TIMEOUT);

    // await page.screenshot({ path: 'glance.png' });


}
module.exports = {
    runScript
};