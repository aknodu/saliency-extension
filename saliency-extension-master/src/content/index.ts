import { sendStoreMessage } from "../utils";
import ActivityMonitor from "./ActivityMonitor";

const events: ActivityMonitor[] = [];
document.onkeydown = function (e) {
  const keyName = e.key;

  // If there are no ActivityMonitors or the last ActivityMonitor is not active then start a new ActivityMonitor
  if (events.length === 0) {
    events.push(new ActivityMonitor());
  }
  const currentEvent = events[events.length - 1];
  // The event has changed on the webpage
  if (document.activeElement?.outerHTML !== currentEvent.element) {
    console.log("check thiis now change");
    currentEvent.deactivate();
    events.push(new ActivityMonitor());
  }

  if (keyName === "Escape") {
    window.alert("okay deactivating");
    currentEvent.deactivate();
  } else {
    // console.log("The urrent html is", currentEvent.element);
    currentEvent.push(keyName);
  }
  if (currentEvent.validatePattern(["Shift", "P"])) {
    window.alert("Validate complete");
    currentEvent.deactivate();
  }
  if (keyName === "0") {
    sendStoreMessage({
      columns: ["id", "keyStroke", "timeStamp", "element"],
      values: events.map((event) => ({
        id: "something",
        keyStroke: event.pattern.reduce(
          (pattern, currentStroke, index) =>
            index === 0
              ? (pattern += currentStroke)
              : (pattern += "-" + currentStroke),
          ""
        ),
        timeStamp: event.startTime,
        element: event.element as string,
      })),
    });
    console.log("These are all the current eventsss", events);
  }
  // currentEvent.getCurrentPattern();
};
