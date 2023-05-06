import { Messages } from "../constants";
/**
 * Send a message to the background script to store the data in chrome storage
 * @param data The data which is to be sent as payload
 */
export const sendStoreMessage = (data: {
  columns: string[];
  values: {
    id: string;
    keyStroke: string;
    timeStamp: string;
    element: string;
  }[];
}) => {
  chrome.runtime.sendMessage({
    message: Messages.STORE,
    data,
  });
};
