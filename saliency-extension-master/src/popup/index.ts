import { read } from "../utils";
/**
 * This script is used to add a click event listener to the download button
 */
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("downloadButton");
  button?.addEventListener("click", () => {
    downloadData();
  });
});
/**
 * This implements functionality to take the data collected and download it as a csv
 */
const downloadData = async () => {
  // Read the data from storage
  const storedData = await read("Data");
  // Format the data in the required format
  const values = storedData.Data.values.map((row: any) => [
    row.id,
    row.keyStroke,
    row.timeStamp,
    row.element,
  ]);
  // Export the data to csv and download it
  exportToCsv("test.csv", [storedData.Data.columns, ...values]);
  window.alert("Download Complete");
};
/**
 *  create the csv file and download it
 * @param filename The filename of the csv file
 * @param rows the rows of the data
 */
function exportToCsv(filename: string, rows: string[][]) {
  const processRow = (row: string[]) => {
    let finalVal = "";
    for (let j = 0; j < row.length; j++) {
      const innerValue = row[j] === null ? "" : row[j].toString();

      let result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
      if (j > 0) finalVal += ",";
      finalVal += result;
    }
    return finalVal + "\n";
  };

  let csvFile = "";
  for (let i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i]);
  }

  const blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    // feature detection
    // Browsers that support HTML5 download attribute
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
