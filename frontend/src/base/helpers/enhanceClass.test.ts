import { enhanceClass } from "./enhanceClass"

describe("enhanceClass", () => {
    it("enhances class correctly", () => {
        class MyClass {}
        enhanceClass(MyClass, "MyClass");
        expect((MyClass as any)["className"]).toBe("MyClass")
    })
})