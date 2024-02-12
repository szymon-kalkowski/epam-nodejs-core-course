import { EventEmitter } from "./eventEmmiter.js";

export class WithTime extends EventEmitter {
  async execute(asyncFunc, ...args) {
    this.emit("begin");
    const startTime = Date.now();
    const data = await asyncFunc(...args);
    const endTime = Date.now();
    const time = endTime - startTime;
    this.emit("end", time);
    this.emit("data", data);
  }
}
