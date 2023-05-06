/**
 * This is activity monitor to log the information
 */
export default class ActivityMonitor {
  pattern: string[];
  active;
  element: string | undefined;
  // Milliseconds
  startTime: string;
  constructor() {
    console.log("initialising new monitor");
    this.pattern = [];
    this.active = true;
    this.element = document.activeElement?.outerHTML;
    this.startTime = new Date().toJSON();
  }

  deactivate() {
    this.active = false;
  }
  getCurrentPattern() {
    console.log("The Pattern loll", this.pattern);
  }
  push(key: string) {
    // console.log("Pushing yoloo11o", document.activeElement);
    this.pattern.push(key);
  }
  validatePattern(pattern: string[]) {
    const patternLength = pattern.length;
    return pattern.toString() === this.pattern.slice(-patternLength).toString();
  }
}
