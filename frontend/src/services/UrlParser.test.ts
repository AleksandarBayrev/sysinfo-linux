import { IUrlParser } from "../interfaces";
import { UrlParser } from "./UrlParser";

describe("UrlParser", () => {
    const urlParser: IUrlParser = new UrlParser();
    it("parseUrl works correctly", () => {
        expect(urlParser.parseUrl(new URL("http://localhost/test?myParameter=1"))).toEqual("/test?myParameter=1");
        expect(urlParser.parseUrl(new URL("http://localhost/test"))).toEqual("/test");
    });
    it("getUrlParameter works correctly", () => {
        expect(urlParser.getUrlParameter(new URL("http://localhost/test?myParameter=1"), "myParameter")).toEqual("1");
        expect(urlParser.getUrlParameter(new URL("http://localhost/test"), "test")).toEqual("");
    });
});