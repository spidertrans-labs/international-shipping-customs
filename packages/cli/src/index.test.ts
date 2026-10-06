import { describe, expect, it } from "vitest";
import { execute } from "./index";

function capture() {
  const stdout: string[] = [];
  const stderr: string[] = [];
  return {
    io: {
      out: (message: string) => stdout.push(message),
      err: (message: string) => stderr.push(message)
    },
    stdout,
    stderr
  };
}

describe("customs CLI", () => {
  it("lists four countries", () => {
    const output = capture();
    expect(execute(["countries"], output.io)).toBe(0);
    expect(output.stdout.join("\n")).toContain("AU");
    expect(output.stdout.join("\n")).toContain("UK");
  });

  it("returns pure JSON for a country check", () => {
    const output = capture();
    expect(
      execute(
        ["check", "--country", "AU", "--item", "battery", "--json"],
        output.io
      )
    ).toBe(0);
    const parsed = JSON.parse(output.stdout.join(""));
    expect(parsed[0].country).toBe("AU");
    expect(parsed[0].category).toBe("batteries");
  });

  it("rejects unsupported countries", () => {
    const output = capture();
    expect(
      execute(["check", "--country", "FR", "--item", "battery"], output.io)
    ).toBe(1);
    expect(output.stderr.join("\n")).toContain("Country must be one of");
  });
});
