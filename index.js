const { matchPattern } = require("./src/wildcardParser.js");

class RobotsParser {
  constructor(robotsTxt) {
    this.robotsTxt = robotsTxt;
    this.rules = this.parse(robotsTxt);
  }

  parse(robotsTxt = this.robotsTxt) {
    const lines = robotsTxt.split("\n");
    const rules = {};
    let currentUserAgent = "*";

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("User-agent:")) {
        currentUserAgent = trimmedLine.split(":")[1].trim();
        rules[currentUserAgent] = rules[currentUserAgent] || {
          disallow: [],
          allow: [],
        };
      } else if (trimmedLine.startsWith("Disallow:")) {
        const path = trimmedLine.split(":")[1].trim();
        rules[currentUserAgent].disallow.push(path);
      } else if (trimmedLine.startsWith("Allow:")) {
        const path = trimmedLine.split(":")[1].trim();
        rules[currentUserAgent].allow.push(path);
      }
    }
    return rules;
  }

  canAccess(userAgent, path) {
    const userAgentRules = this.rules[userAgent] ||
      this.rules["*"] || { disallow: [], allow: [] };

    // Check if the path is allowed for the user agent
    const isAllowed = userAgentRules.allow.some((allowedPath) => {
      return matchPattern(allowedPath, path);
    });

    // Check if the path is disallowed for the user agent
    const isDisallowed = userAgentRules.disallow.some((disallowedPath) => {
      return matchPattern(disallowedPath, path);
    });

    // If the path is allowed, grant access; if disallowed and no allow rules match, deny access
    return isAllowed || !isDisallowed;
  }
}

module.exports = { RobotsParser };
