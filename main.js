// TA Champion Buyer - Version 1.2
const UPDATE_IN_SECONDS = 3;
const I_WANT_THE_BEEP = true;

// Dont edit
let inBuyProgress = false;
let buyIntervalId = -1;
let checkoutIntervalId = -1;
let beepIntervalId = -1;
let alreadyChecked = []

const getFirstChampElement = () => document.getElementsByClassName("_z3zxaiB0W5_79Oh41hd")[0]
const getBuyButton = () => document.getElementsByClassName("_adUdUfWOz0RV3mCy5UZ")[0]
const getCheckoutButton = () => document.getElementsByClassName("j3_hmGlmJ95C9BOcyOFv lY43WCC5Ek_dhmKjb_Cw")[0]
const getFirstChampElementSeller = () => getFirstChampElement().getElementsByClassName("cGnfWVqUjWDf7blY11f3")[0].innerText
const getFirstChampElementPrice = () => getFirstChampElement().getElementsByClassName("_mtcJlWGt1iDNAKqoGXz")[0].innerText

const addChampionToAlreadyChecked = (champion) => {
    console.log("➕ Adding champion for ", champion.price, " from ", champion.seller)
    alreadyChecked.push(champion)
}

const isChampionAlreadyChecked = (champion) => {
    console.log("🔎 Checking champion for ", champion.price, " from ", champion.seller)
    return alreadyChecked.some(checkedChampion => JSON.stringify(checkedChampion) === JSON.stringify(champion))
}

const playBeep = () => {
    let beepSound = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    beepSound.play();
}

const startBeeping = () => {
    beepIntervalId = setInterval(() => {
        playBeep()
    }, 1000)
}

const stopBeeping = () => {
    clearInterval(beepIntervalId)
}

const fakeClickOnChampion = async () => {
    try{
        console.log("✔ Clicking on champion!")
        await getFirstChampElement().click()
    }
    catch(error){
        console.log("Could not click on Champion. Retrying...")
        fakeClickOnChampion()
    }
}

const fakeClickOnBuyButton = async () => {
    console.log("✔ Buy button found! Clicking on buy button now!")
    await getBuyButton().click()
}

const fakeClickOnCheckout = async () => {
    console.log("✔ Checkout button found! Clicking on checkout now!")
    await getCheckoutButton().click()
}

const fakeClickOnFirstCheckbox = async () => {
    await document.getElementsByClassName("eqna9ncNfzg_kPbdlP_W")[0].click()
}

const finish = (champion) => {
    clearInterval(checkoutIntervalId)
    addChampionToAlreadyChecked(champion)
    console.log("-------------------------------------------")
    console.log("💸💸💸")
    console.log("BUY YOUR CHAMP IN METAMASK NOW!!!!!!!")
    console.log("💸💸💸")
    console.log("-------------------------------------------")
    console.log("✅ Script done!")
    inBuyProgress = false;
}

const startSearchingForCheckoutButton = async (champion) => {
    console.log("👓 Starting to search for checkout button every 100ms")
    checkoutIntervalId = await setInterval(async () => {
        if (getCheckoutButton()) {
            await fakeClickOnCheckout()
            if (getCheckoutButton().innerText === 'Processing') {
                finish(champion)
            }
            else {
                getCheckoutButton().click()
            }
        }
    }, 100)
}

const startSearchingForBuyButton = async (champion) => {
    console.log("👓 Starting to search for buy button every 100ms")
    buyIntervalId = await setInterval(async () => {
        if (getBuyButton() && getBuyButton().innerText === "BUY NOW"){
            clearInterval(buyIntervalId)
            await fakeClickOnBuyButton()
            startSearchingForCheckoutButton(champion)
        }
        else {
            console.log("Buy button does not exist")
            console.log("Button: ", getBuyButton())
            console.log("Button Text: ", getBuyButton().innerText)
            console.log("Trying to click on champion again...")
            fakeClickOnChampion()
        }
    }, 100)
}

const startBuyProcess = async (champion) => {
    inBuyProgress = true;
    I_WANT_THE_BEEP ? startBeeping() : stopBeeping()
    await fakeClickOnChampion()
    startSearchingForBuyButton(champion)
}

const searchForChampion = () => {
    console.log("👓 Searching for champion...")
    if (!getFirstChampElement()) {
        console.log("😨 No champion found")
        return;
    }
    console.log("✅ We found one!")
    let champion = {
        seller: getFirstChampElementSeller(),
        price: getFirstChampElementPrice()
    }
    isChampionAlreadyChecked(champion) ?
        console.log("👍 We already checked this champion!") :
        startBuyProcess(champion)

}

const refreshChampionList = () => {
    setInterval(async() => {
        if (!inBuyProgress) {
            try {
                stopBeeping()
                console.log("Refreshing the champion list")
                await fakeClickOnFirstCheckbox()
                setTimeout(async() => {
                    await fakeClickOnFirstCheckbox()
                    searchForChampion()
                }, 500)
            } catch (error) {
                console.log("Go back to you main view! Script is ready to refresh the champion list again!")
            }
        }
    }, UPDATE_IN_SECONDS * 1000)
}

const startScript = () => {
    console.log("------------------------------------");
    searchForChampion()
    refreshChampionList()
    return "🐴 Starting the script";
}

startScript()