/**
 * Go-live switches. The site is a PREVIEW until the client approves launch
 * (issue 100: do not point billionply.com at it until marketing confirms).
 *
 * At go-live: set `indexable` to true AND set the Worker var ROBOTS_NOINDEX
 * to "false" in wrangler.jsonc, in the same commit.
 */
export const launch = {
  indexable: false,
} as const;
