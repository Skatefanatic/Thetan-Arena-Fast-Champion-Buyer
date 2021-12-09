# Thetan-Arena-Fast-Champion-Buyer

## What is Thetan Arena Fast Champion Buyer?

The project includes a JavaScript file that can be executed in the browser in the developer tools.
This JavaScript file will cyclically (user defined) call all champions on https://marketplace.thetanarena.com/ after execution. The first champion (top left) will be selected and purchased. The purchase process will go through until the Metamask dialog. The last click at Metamask has to be done manually by the user.

## Why

If you are unlucky and everyone buys your champion, this script is for you. With this script you will be the fastest buyer on Thetan Arena. You don't need to manually press F5 every few seconds or refresh the page. You can decide how often the script should refresh the page for you by simply defining it in the configuration (the top lines). Furthermore, you don't even have to be at the computer, the script will start beeping when it has a match and starts the buying process. Of course you can turn this off.

### My personal use case

I was going to buy a cluster for under 0.3 WBNB. This was a bargain at the time. Since I manually reloaded the page all the time and hoped to buy a champion, I was disappointed after a short time. Since everyone was faster than me. Times I was not in the place. Another time I refreshed too rarely. This frustrated me. I decided to let my JavaScript Skills do it for me. With success!

## Requirements

- Google Chrome
- Logged in at https://marketplace.thetanarena.com/ with your Metamask

## Setup

To use the script perfectly you should first set your filters in the marketplace so that exactly the champion you want to have appears in the first place (top left). Because the script always looks at the first element. It is recommended to select "latest" in the "Sort by" filter. This way you will always get the newest element in the market in the first place.

#### Example:
You want a Meiko with a mythic skin. But you don't want to pay more than 0,7 WBNB. Then your filters should look like here in the link: https://marketplace.thetanarena.com/?sort=Latest&priceMin=0&priceMax=70000000&heroTypeIds=14&skinIds=&skinRarity=2&page=1

## Gettings started

1. Download the script here on GitHub
2. Open the main.js
3. Copy the complete code of main.js
4. Go to your marketplace tab in your browser
5. Press F12 to open your developer tools
6. Switch to console tab
7. Paste the script(from main.js) in here
8. Wait and enjoy

The script will now try to buy the first champion directly, here you can simply click on reject at Metamask and navigate back to the main view. The script remembers the champions it has already tried to buy, you can see this well in the console. You can stop the script by closing the tab, leaving the page or pressing F5.

The script has saved me time and nerves. The 3 hours of coding were worth it :)

Have fun
