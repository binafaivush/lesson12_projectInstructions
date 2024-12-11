import { appendFile } from "fs/promises";

export function logToFile(req, res, next) {
  appendFile( "./log1.txt",    `\n${new Date().toLocaleDateString()}--->  ${req.method} ${req.url}`
  );
  next();
}
