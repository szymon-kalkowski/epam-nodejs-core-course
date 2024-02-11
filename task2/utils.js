import childProcess from "child_process";
import fs from "fs";

export const execProcess = (command, time) => {
  childProcess.exec(command, (error, stdout, stderr) => {
    process.stdout.write(`\r${time + "s " + stdout.replace("\n", "")}`);
    time % 60 === 0 &&
      appendToFile(
        "activityMonitor.log",
        `${Math.floor(Date.now() / 1000) + "s : " + stdout}`
      );

    stderr && console.log(stderr);
    error && console.log(error);
  });
};

const appendToFile = (fileName, data) => {
  fs.appendFile(fileName, data, (error) => {
    error && console.log(error);
  });
};
