import { BasePage } from "./BasePage";

describe("BasePage", () => {
    it("is a class", () => {
        expect(typeof BasePage === "function").toBe(true);
    })
});