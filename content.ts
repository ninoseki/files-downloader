import type { PlasmoContentScript } from "plasmo"

import type { Message } from "~types"

export const config: PlasmoContentScript = {
  matches: ["<all_urls>"]
}

chrome.runtime.onMessage.addListener(async ({ urls, interval }: Message) => {
  await chrome.runtime.sendMessage({ urls, interval })
})
