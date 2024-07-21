import { DependencyInjection } from "../DependencyInjection";
import { isValidContext } from "./isValidContext"

describe("isValidContext", () => {
    it("returns false for invalid object", () => {
        expect(isValidContext({data: 1})).toBe(false);
    });
    it("returns true for valid object", () => {
        DependencyInjection.setupInstance((message) => {}, false);
        expect(isValidContext({dependencyInjection: DependencyInjection.getInstance()})).toBe(true);
    });
})