// Importerar beroenden för att kunna köra selenium-tester
const {Builder, By, until} = require('selenium-webdriver');
require('geckodriver'); // .exe eftersom Jest inte hittade filen annars

// Här anger vi var testfilen ska hämtas. De konstiga replaceAll-funktionerna ersätter
// mellanslag med URL-säkra '%20' och backslash (\) på Windows med slash (/).

// Pekar var vi vill testa på HTML-dokumentet
const fileUnderTest = "file://" + __dirname.replaceAll(/ /g, '%20').replaceAll(/\\/g, '/') + '/../dist/index.html';

// Används för att Selenium ska inte ligga och vänta på tester som inte går igenom
const defaultTimeout = 10000;

// Skapar en variabel för den driver som används för att köra anropen till webbläsaren
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång

// beforeAll körs innan alla testfall
beforeAll(async () => {
    console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen

// afterAll körs efter alla testfall
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

// Testfallet måste köras asynkront eftersom vi gör ett externt anrop till webbläsaren
test('The stack should be empty in the beginning', async() => {
    // Anropet för att hitta elementet använder await för att vänta efter respons från webbläsaren
    // .findElement(By.id) är Seleniums By-metoder
    let stack = await driver.findElement(By.id("top-of-stack")).getText();
    // Använder assertions från Jest för att verifiera om testet gick igenom
    expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
    it('should open a prompt box', async() => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Bananer");
        await alert.accept();
    });
});