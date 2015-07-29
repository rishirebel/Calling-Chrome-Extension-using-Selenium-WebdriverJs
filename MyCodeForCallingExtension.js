/* Code By Rishikesh Chandra 
**For Automated testing of Chrome extension 
**Test cases are written in NodeJs, MochaJs and Selenium WebdriverJs
*- This test contains 
 -1 Calling Some Chrome Extension from Selenium WebdriverJs and ChromeDriver
 -2 Login into SOME Chrome Extension */
var assert = require ('assert');
var test = require ('selenium-webdriver/testing');
//chrome is called seperately for accessing chrome options
var chrome = require ('selenium-webdriver/chrome');
var webdriver = require ('selenium-webdriver');
//for handelling File System Operations if required
var fs = require ('fs');

test.describe ('Chrome Extension Test Using Selenium WebdriverJs', function () {
	this.timeout (100000);
	test.it ('Testing SOME Chrome Extension Test', function () {
		//Link should be specified for the CRX file of the ChromeExtension to be Tested
		//You can Load the CRX file for a perticular chrome extension by using chrome extension source viewer(https://chrome.google.com/webstore/detail/chrome-extension-source-v/jifpbeccnghkjeaalbbjmodiffmgedin)
		//Download the zipped file from the above given CRX link and unzip it
		//Then goto chrome://extensions/ on your chrome browser and select Pack Extension button
		//It will ask for the Extension Root Directory
		//click on browse and select the folder where you unzipped the CRX extension file
		//Then click on Pack extension
		//It will then give you a popup containg the address of the Extension containing the .crx file and Key file with .pem 
		//That CRX location is given below for the Chrome Extension which I downloaded
		var options = new chrome.Options ().addExtensions ("C:\\Users\\Rishikesh\\Desktop\\nvnt.crx");
		var driver = new webdriver.Builder ().withCapabilities (webdriver.Capabilities.chrome ()).setChromeOptions (options).build ();
		//Timelag for 3 seconds is given to preven the ChromeDriver crash
		driver.sleep (3000);
		//This is used for scrolling the page as sometimes the element is present but not clickable so by using this it can be done
		driver.executeScript("scroll(90,542);");
		//This is used to maximize the browser window 
		driver.manage().window().maximize();
		//This command is used for navigating back to the previous page	 
		driver.navigate().back();
		//This command is used for navigating forward to the previous page
		driver.navigate().forward();
	    //This ID is not present in your default Chrome Browser. It should be taken from ChromeDriver Browser. It can be viwed in chrome://extensions/ by selecting developer mode
		//The undergiven ID will not work with your code as it was generated in my browser for SOME ChromeExtension
		driver.get ('chrome-extension://gkcfcdfidgpddiodgjnomehnfpdnfgcm/login.html');
		//Timelag of 6 seconds is given to load the screen, else elliments are not visible error can be encountered 
		driver.sleep (6000);
		//One time operation of entering username and password
		driver.findElement (webdriver.By.name ('username')).sendKeys ('your username');
		driver.findElement (webdriver.By.name ('password')).sendKeys ('your password');
		driver.findElement (webdriver.By.id ('login')).click ();
		//For taking Screenshot if required
		driver.takeScreenshot ().then (function (img) {
                fs.writeFileSync ("/tmp/n5.png", new Buffer (img, 'base64'));
            });

 driver.quit();
	});
});
