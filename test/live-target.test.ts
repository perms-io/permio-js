import { describe, expect, it } from "vitest";
import { DEFAULT_BASE_URL } from "../src/index.js";
import { isAllowedLiveTarget } from "./live-target.js";

describe("live test target allowlist", () => {
  it.each([
    "https://staging.perms.io",
    "https://staging.perms.io/",
    "https://staging.perms.io:443",
    "https://STAGING.perms.io",
    "https://staging.perms.io.",
    "https://temp-api.perms.io",
    "https://api.staging.perms.io",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://[::1]:8080",
    "http://api.localhost",
    "https://permio.test",
    "https://gateway.permio.test:8443",
  ])("allows %s", (url) => {
    expect(isAllowedLiveTarget(url)).toBe(true);
  });

  it.each([
    DEFAULT_BASE_URL,
    "https://api.perms.io",
    "https://api.perms.io/",
    "https://api.perms.io:443",
    "https://API.PERMS.IO",
    "https://api.perms.io.",
    "http://api.perms.io",
    "https://perms.io",
    "https://staging.perms.io@api.perms.io",
    "https://x@api.perms.io",
    "https://staging.perms.io.evil.example",
    "https://foo.perms.io.evil.example",
    "https://evilperms.io",
    "https://localhost.example",
    "https://test",
    "https://example.com/staging.perms.io",
    "https://example.com/?host=staging.perms.io",
    "https://example.com/#staging.perms.io",
    "ftp://localhost",
    "",
    "staging.perms.io",
  ])("refuses %s", (url) => {
    expect(isAllowedLiveTarget(url)).toBe(false);
  });
});
