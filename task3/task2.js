import { WithTime } from "./withTime.js";
import axios from "axios";

const fetchFromUrl = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("data", (data) => console.log(data));
withTime.on("end", (time) => console.log(`Done with execute (${time}ms)`));

withTime.execute(fetchFromUrl, "https://jsonplaceholder.typicode.com/posts/1");

console.log(withTime.rawListeners("end"));
