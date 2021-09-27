const db = require('../db/db_connector');
const dbConfig = require('../db/dbConfig.json');
const puppeteer = require('puppeteer');
const TIMEOUT = 10000;
const fs = require('fs');
// const C = require('../config.json');
const USERNAME_SELECTOR = '#email';
const PASSWORD_SELECTOR = '#pass';
const CTA_SELECTOR = 'button[type="submit"]';
var postCount, membersCount, timeSpan;

startBrowser = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    return { browser, page };
}

closeBrowser = async (browser) => browser.close();

playTest = async (url, searchString, postGroup, username, password) => {

    const { browser, page } = await startBrowser();
    page.setViewport({ width: 1366, height: 768 });

    await page.goto(url);
    await page.screenshot({ path: 'glance-1.png' });

    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(username);
    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(password);
    await page.click(CTA_SELECTOR);

    // await page.waitForNavigation();
    await page.waitForTimeout(TIMEOUT + 2000);
    // await waitTillHTMLRendered(page)

    await page.screenshot({ path: 'glance0.png' });

    // await page.click('[title="Accept All"]');
    await page.waitForTimeout(TIMEOUT);

    await page.waitForSelector("[href='/groups/']");

    await page.click("[href='/groups/']");
    // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(TIMEOUT);

    await page.screenshot({ path: 'glance1.png' });


    // await page.waitForSelector('[placeholder="Search groups"]');
    await page.click('[placeholder="Search groups"]');
    await page.keyboard.type(searchString);
    await page.screenshot({ path: 'glance2.png' });

    await page.keyboard.press("Enter");
    await page.waitForTimeout(TIMEOUT);

    // await page.waitForNavigation({ waitUntil: 'networkidle2' });


    await page.screenshot({ path: 'glance3.png' });
    await page.click('[aria-label="See All"]');
    await page.waitForTimeout(TIMEOUT);

    await page.screenshot({ path: 'glance4.png' });

    // await autoScroll(page);

    const text = await page.evaluate(() => Array.from(document.querySelectorAll('[role="article"] [role="link"] span'), element => element.textContent));
    const groupDetails = await page.evaluate(() => Array.from(document.querySelectorAll('[role="article"] '), element => element.textContent));
    // console.log("Text:\n", groupDetails[0]);
    let match = /[0-9]{1,4}\S/.exec("one two 100");
    // await page.waitForTimeout(TIMEOUT);

    await page.screenshot({ path: 'glance4.png' });
    console.log("Join Group Will Call");
    // joinGroup(page);
    // await page.click('[role="article"] [role="button"]');
    await page.waitForTimeout(3000);

    await page.click('[role="article"] [role="button"]');

    await page.waitForTimeout(TIMEOUT);
    await page.screenshot({ path: 'glance5.png' });

    await page.click('[role="article"] [role="link"] span');
    await page.waitForTimeout(TIMEOUT);


    await page.screenshot({ path: 'glance6.png' });

    await page.click('[data-pagelet="GroupInlineComposer"] [role="button"] span');

    await page.waitForTimeout(TIMEOUT);


    await page.screenshot({ path: 'glance7.png' });


    // await page.click('[id="placeholder-6hpma"]');
    await page.keyboard.type(postGroup);

    await page.click('[aria-label="Post"]');


    await page.waitForTimeout(TIMEOUT);


    await page.screenshot({ path: 'glance8.png' });








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

    await page.screenshot({ path: 'glance.png' });


}
module.exports = {
    runScript
};