import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

let MyUsername = process.env.userName;
let password = process.env.password;

console.log(`value`, password);
console.log(`value`, MyUsername);

console.log("start the backend system");
