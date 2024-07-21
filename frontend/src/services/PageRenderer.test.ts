import { PageRenderer } from "./PageRenderer"

describe("PageRenderer", () => {
    it("instantiating PageRenderer without a `/404` route throws", () => {
        expect(() => {
            new PageRenderer({"asd": "asd"})
        }).toThrow();
    });
    it("addPage saves a page for rendering", () => {
        const pageRenderer = new PageRenderer({"asd": "asd", "/404": "/404"});
        pageRenderer.addPage("/asd", {} as React.ReactElement);
        expect(() => {pageRenderer.renderPage("asd")}).not.toThrow();
    });
    it("renderPage returns 404 page if page is not registered", () => {
        const pageRenderer = new PageRenderer({"asd": "asd", "/404": "/404"});
        const spy = jest.spyOn(console, "warn");
        pageRenderer.addPage("/404", {} as React.ReactElement);
        expect(pageRenderer.renderPage("asd")).not.toBeUndefined();
        expect(spy).toHaveBeenCalled();
    });
    it("renderPage returns page if it is registered", () => {
        const pageRenderer = new PageRenderer({"asd": "asd", "/404": "/404"});
        const spy = jest.spyOn(console, "warn");
        pageRenderer.addPage("asd", {} as React.ReactElement);
        expect(pageRenderer.renderPage("asd")).not.toBeUndefined();
        expect(spy).toHaveBeenCalled();
    });
})