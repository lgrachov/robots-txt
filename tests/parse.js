const { RobotsParser } = require("../index.js");
const robots = {
  data: `# this is a comment
    User-agent: Googlebot
    Disallow: /nogoogle/*
    Allow: /nobing/*
    
    User-agent: Bingbot
    Disallow: /nobing/*
    
    User-agent: *
    Disallow: /tmp/*`,
};

robots.parser = new RobotsParser(robots.data);
console.log(robots.parser.parse());
