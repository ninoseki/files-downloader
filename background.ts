import sleep from "sleep-promise"

import type { Message } from "~types"

export {}

chrome.runtime.onMessage.addListener(async ({ urls, interval }: Message) => {
  if (urls === undefined || interval === undefined) {
    return
  }

  for (const url of urls) {
    const options = {
      url,
      saveAs: false
    }
    await chrome.downloads.download(options)
    await sleep(interval)
  }
})
