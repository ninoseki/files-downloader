<template>
  <section class="section">
    <div class="container">
      <h3 class="is-size-3">Files downloader</h3>

      <div class="field">
        <label class="label">URLs</label>
        <div class="control">
          <textarea
            id="urls"
            rows="10"
            class="textarea"
            spellcheck="false"
            v-model="text"></textarea>
        </div>
      </div>

      <div class="field">
        <label class="label">Interval (mill seconds)</label>
        <div class="control">
          <input type="number" v-model="interval" />
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button class="button is-link" @click="download">Download</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
@import "bulma/css/bulma.css";

.container {
  width: 480px;
}
</style>

<script setup>
import isURL from "is-url"
import { ref } from "vue"

const text = ref("")
const interval = ref(1000)

function download() {
  const urls = text.value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => isURL(line))

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const message = { urls, interval: interval.value }
    chrome.tabs.sendMessage(tabs[0].id, message)
  })
}
</script>
