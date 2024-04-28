import { describe, test, expect, vi } from "vitest";
import { readJSON } from "./readJSON";
import { readFileSync } from "fs";

// モックを設定
vi.mock("fs", () => ({
  readFileSync: vi.fn()
}));

describe("readJSON", () => {
  test("Return JSON object", () => {
    const mockJSON = { name: "test", value: 123 };
    readFileSync.mockImplementation(() => JSON.stringify(mockJSON));

    const result = readJSON("path/to/valid.json");
    expect(result).toEqual(mockJSON);
  });

  test("Throw error the file does not exist", () => {
    const testFunction = () => readJSON("path/to/nonexistent.json");
    expect(testFunction).toThrow("Cannot read properties of undefined");
  });

  test("Throw error the JSON is invalid", () => {
    readFileSync.mockImplementation(() => "{ name: 'test', value: }");

    const testFunction = () => readJSON("path/to/invalid.json");
    expect(testFunction).toThrow(SyntaxError);
  });
});
