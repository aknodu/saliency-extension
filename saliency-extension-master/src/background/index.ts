import axios from "axios";
import { store } from "../utils";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";
import { Messages } from "../constants";

/**
 * Add an event listener to check for events sent by background script and make appropriate actions
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request, sender, sendResponse);
  switch (request.message) {
    // Store the data in chrome local storage
    case Messages.STORE:
      store("Data", request.data);
      sendResponse("Okay I'll store it cool");
      return true;
      break;
    default:
      sendResponse("Wrong message man");
      return true;
  }
});

// console.log(
//   "Hey! This code is executed in the background, you will not see it in the browser console..."
// );

// example of using Axios in the background script. You need to use the custom adapter.
// axios
//   .request({
//     url: "https://google.com",
//     method: "GET",
//     adapter: fetchAdapter,
//   })
//   .then((data) => {
//     console.log("DATA:", data);
//   });
