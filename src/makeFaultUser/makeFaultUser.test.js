import { describe, it, expect } from "vitest";
import { makeFaultUser } from "./makeFaultUser";

describe("makeFaultUser", () => {
  it("Return object with identifier and password", () => {
    const user = makeFaultUser();
    expect(user).toBeTypeOf("object");
    expect(user).toHaveProperty("identifier");
    expect(user).toHaveProperty("password");
  });

  it("String type properties", () => {
    const user = makeFaultUser();
    expect(typeof user.identifier).toBe("string");
    expect(typeof user.password).toBe("string");
  });
});
