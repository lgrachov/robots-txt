function matchPattern(pattern, url) {
  // Split the pattern and the URL into path and query parts
  const [patternPath, patternQuery] = pattern.split("?");
  const [urlPath, urlQuery] = url.split("?");

  // Match path segments
  const patternSegments = patternPath.split("/");
  const urlSegments = urlPath.split("/");

  if (patternSegments.length !== urlSegments.length) {
    return false;
  }

  for (let i = 0; i < patternSegments.length; i++) {
    const p = patternSegments[i];
    const u = urlSegments[i];

    if (p !== "*" && p !== u) {
      return false;
    }
  }

  // If there's a query pattern, match the query strings
  if (patternQuery) {
    const patternQuerySegments = patternQuery
      .split("&")
      .map((param) => param.replace("*", ""));
    const urlQuerySegments = urlQuery ? urlQuery.split("&") : [];

    // Check if required query parameters are present
    for (const param of patternQuerySegments) {
      if (param && !urlQuerySegments.some((q) => q.startsWith(param))) {
        return false;
      }
    }
  }

  return true;
}

module.exports = { matchPattern };
