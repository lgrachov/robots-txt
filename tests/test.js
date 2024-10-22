const fs = require("fs");
const { RobotsParser } = require("../index.js");

fs.readFile("robots.txt", "utf8", (err, data) => {
  // Get data
  if (err) throw err;
  console.log(data, "\n===");

  // Parse data
  const parser = new RobotsParser(data);
  const testRequests = [
    {
      ua: "Googlebot",
      path: "/some/path",
    },
    {
      ua: "Googlebot",
      path: "/nogoogle/something",
    },
    {
      ua: "NotARealUA",
      path: "/bin/installer",
    },
    {
      ua: "Googlebot",
      path: "/bin/installer",
    },
    {
      ua: "Googlebot",
      path: "/tmp/12345",
    },
  ];
  testRequests.forEach((req) => {
    console.log(
      "Can %s access %s:",
      req.ua,
      req.path,
      parser.canAccess(req.ua, req.path)
    );
  });
});
