import { Action, BrowserHistory } from "history";
import { IBrowserHistoryManager } from "../interfaces";
import { BrowserHistoryManager } from "./BrowserHistoryManager";

describe("BrowserHistoryManager", () => {
    const getInstance = (historyOverride: BrowserHistory | undefined): { history: Readonly<BrowserHistory>, instance: IBrowserHistoryManager } => {
        const history: BrowserHistory = {
            push: jest.fn(),
            back: jest.fn(),
            forward: jest.fn(),
            action: Action.Replace,
            location: {
                search: "",
                state: undefined,
                key: "",
                pathname: "",
                hash: ""
            },
            createHref: jest.fn(),
            block: jest.fn(),
            replace: jest.fn(),
            go: jest.fn(),
            listen: jest.fn(() => () => { })
        }
        return {
            history,
            instance: new BrowserHistoryManager(historyOverride || history)
        };
    }
    it("push works as expected", () => {
        const spy = jest.spyOn(console, "log");
        const { instance, history } = getInstance(undefined);
        instance.push("asd");
        expect(history.push).toHaveBeenCalledWith("asd");
        expect(spy).toHaveBeenCalledWith(instance.pathAndQuery);
    });
    it("replace works as expected", () => {
        const { instance, history } = getInstance(undefined);
        instance.replace("asd");
        expect(history.replace).toHaveBeenCalledWith("asd");
    });
    it("back works as expected", () => {
        const { instance, history } = getInstance(undefined);
        instance.back();
        expect(history.back).toHaveBeenCalled();
    });
    it("forward works as expected", () => {
        const { instance, history } = getInstance(undefined);
        instance.forward();
        expect(history.forward).toHaveBeenCalled();
    });
    it("listen works as expected", () => {
        const { instance, history } = getInstance(undefined);
        instance.listen("asd", () => { });
        expect(history.listen).toHaveBeenCalled();
        expect((instance as BrowserHistoryManager)["listeners"].size).toBe(1);
        instance.listen("asd", () => { });
        expect((instance as BrowserHistoryManager)["listeners"].size).toBe(1);
    });
    it("unlisten works as expected", () => {
        const { instance } = getInstance(undefined);
        expect((instance as BrowserHistoryManager)["listeners"].size).toBe(0);
        instance.unlisten("asd");
        expect((instance as BrowserHistoryManager)["listeners"].size).toBe(0);
        instance.listen("asd", () => { });
        expect((instance as BrowserHistoryManager)["listeners"].size).toBe(1);
        instance.unlisten("asd");
        expect((instance as BrowserHistoryManager)["listeners"].size).toBe(0);
    });
    it("location returns as expected", () => {
        const { instance, history } = getInstance(undefined);
        expect(instance.location).toEqual(history.location);
    });
    it("origin returns as expected", () => {
        const { instance } = getInstance(undefined);
        const originalGlobalWindow = { ...global.window };
        global.window = {
            location: {
                origin: "asd"
            } as Location
        } as globalThis.Window & typeof globalThis;
        expect(instance.origin).toEqual(window.location.origin);
        global.window = { ...originalGlobalWindow }
    });
    it("pathOnly returns as expected", () => {
        const { instance, history } = getInstance(undefined);
        expect(instance.pathOnly).toEqual(history.location.pathname);
    });
    it("pathAndQuery returns as expected", () => {
        const { instance, history } = getInstance(undefined);
        expect(instance.pathAndQuery).toEqual(`${history.location.pathname}${history.location.search}`);
    });
    it("currentUrl returns as expected", () => {
        const { instance } = getInstance(undefined);
        const originalGlobalWindow = { ...global.window };
        global.window = {
            location: {
                href: "asd"
            } as Location
        } as globalThis.Window & typeof globalThis;
        expect(instance.currentUrl).toEqual(window.location.href);
        global.window = { ...originalGlobalWindow }
    });
});