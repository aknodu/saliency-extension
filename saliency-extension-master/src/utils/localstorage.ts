/**
 *  Store data in chrome local storage
 * @param key The key of the data which is to be stored
 * @param value The data which is to be stored
 */
export const store = (key: string, value: object) => {
  chrome.storage.local.set({ [key]: value });
};
/**
 * read a key from the localstorage
 * @param key The key of the data to be fetched
 * @returns
 */
export const read = async (key: string) => {
  const data = await chrome.storage.local.get(key);
  console.log("Check this", data);
  return data;
};
/**
 * Clear the chrome storage
 */
export const clear = async () => {
  await chrome.storage.local.clear();
};
