import { Listener, Location } from "history";

export interface IBrowserHistoryManager {
    push(path: string): void;
    replace(path: string): void;
    back(): void;
    forward(): void;
    listen(listenerName: string, listener: Listener): void;
    unlisten(listenerName: string): void;
    get location(): Location;
    get origin(): string;
    get pathOnly(): string;
    get pathAndQuery(): string;
    get currentUrl(): string;
}