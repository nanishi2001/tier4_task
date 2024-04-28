import { describe, test, expect } from "vitest";
import { makeFaultUser } from "./makeFaultUser";

describe("makeFaultUser", () => {
  test("Return object with identifier and password", () => {
    const user = makeFaultUser();
    expect(user).toBeTypeOf("object");
    expect(user).toHaveProperty("identifier");
    expect(user).toHaveProperty("password");
  });

  test("String type properties", () => {
    const user = makeFaultUser();
    expect(typeof user.identifier).toBe("string");
    expect(typeof user.password).toBe("string");
  });
});
