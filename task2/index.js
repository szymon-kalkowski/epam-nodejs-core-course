import { UNIX_COMMAND, WINDOWS_COMMAND } from "./constants.js";
import { execProcess } from "./utils.js";

const platform = process.platform;
const command = platform === "win32" ? WINDOWS_COMMAND : UNIX_COMMAND;

let time = 0;
setInterval(() => {
  execProcess(command, time++);
}, 1000);
