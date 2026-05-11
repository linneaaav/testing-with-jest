/* Bygger upp selenium för att börja testa hemsidan */

const {Builder, By, until} = require('selenium-webdriver');
require('geckodriver');

// Testar samma HTML dokument som förra browser.test.js
const fileUnderTest = 'file://' + __dirname.replaceAll(/ /g, '%20').replaceAll(/\\/g, '/') + '/../dist/index.html';

// Skapar samma gräns för att selenium inte ska ligga och testa i bakgrunden
const defaultTimeout = 10000;
let driver;
jest.setTimeout(10000 * 60 * 5);

// Starta upp sleniumtesterna till Firefox
beforeAll (async () => {
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

afterAll (async() => {
    await driver.quit();
}, defaultTimeout);

/* De olika testfallen */

// Poppar man ett element ska användaren se vilket värde som poppas
describe('Clicking "Poppa stacken!"', () => {
    it("should show an alert with the popped element", async() => {
        // Hämta push-knappen och klickar
        let push = await driver.findElement(By.id('push'));
        await push.click();

        // Förväntas en alert-funktion där vi skriver in värdet "hej" och accepterar
        let alertPush = await driver.switchTo().alert();
        await alertPush.sendKeys("hej");
        await alertPush.accept();

        // Letar upp pop-knappen och klickar
        let pop = await driver.findElement(By.id('pop'));
        await pop.click();

        // Förväntas alert-funktion där värdet som poppas visas för användaren
        let alertPop = await driver.switchTo().alert();
        let alertText = await alertPop.getText();

        // Stänger ner alert-funktionen för att nästa test också ska gå igenom
        // Fick felmeddelandet "UnexpectedAlertOpenError" annars
        await alertPop.accept();

        // Kollar texten så vi fått med rätt värde
        expect(alertText).toBeUndefined(); // Fel med vilje
    });
});

// Efter att ha poppat ett element ska rätt värde visas när man peekar
test('Clicking "Vad finns överst på stacken?" should return correct element after pop', async() => {
    // Pushar "1" till stacken
    let push = await driver.findElement(By.id('push'));
    await push.click();
    let alertPush = await driver.switchTo().alert();
    await alertPush.sendKeys("1");
    await alertPush.accept();

    // Poppar översta elementet i stacken
    let pop = await driver.findElement(By.id('pop'));
    await pop.click();
    let alertPop = await driver.switchTo().alert();
    await alertPop.accept();

    // Letar efter peek-knappen och klickar
    let peek = await driver.findElement(By.id('peek'));
    await peek.click();

    // Letar upp top-of-stack <span>-elementet och kollar så rätt värde peekas
    let topOfStack = await driver.findElement(By.id('top-of-stack')).getText();
    expect(topOfStack).toEqual("1"); // Fel med vilje
});