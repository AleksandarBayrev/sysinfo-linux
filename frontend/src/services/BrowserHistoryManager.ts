import { BrowserHistory, Listener } from "history";
import { IBrowserHistoryManager } from "../interfaces";
import { enhanceClass } from "../base";
import { BrowserHistoryManagerListener } from "../types";

export class BrowserHistoryManager implements IBrowserHistoryManager {
    private readonly listeners: Map<string, BrowserHistoryManagerListener>;
    private readonly history: BrowserHistory;

    constructor(history: BrowserHistory) {
        this.listeners = new Map();
        this.history = history;
    }

    public push = (path: string) => {
        this.history.push(path);
        console.log(this.pathAndQuery);
    }

    public replace = (path: string) => {
        this.history.replace(path);
    }

    public back = () => {
        this.history.back();
    }

    public forward = () => {
        this.history.forward();
    }

    public listen = (listenerName: string, listener: Listener) => {
        if (this.listeners.has(listenerName)) {
            return;
        }
        const removeSubscription = this.history.listen(listener);
        this.listeners.set(listenerName, {
            listenerName,
            listener,
            removeSubscription
        });
    }

    public unlisten = (listenerName: string) => {
        const listener = this.listeners.get(listenerName);
        if (listener) {
            listener.removeSubscription();
            this.listeners.delete(listener.listenerName );
        }
    }

    public get location() {
        return {...this.history.location};
    }
    
    public get origin() {
        return window.location.origin;
    }

    public get pathOnly() {
        return this.location.pathname;
    }

    public get pathAndQuery() {
        return `${this.location.pathname}${this.location.search}`;
    }

    public get currentUrl() {
        return window.location.href;
    }
}

enhanceClass(BrowserHistoryManager, "BrowserHistoryManager");