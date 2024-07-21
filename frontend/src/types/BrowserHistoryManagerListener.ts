import { Listener } from "history";

export type BrowserHistoryManagerListener = {
    listenerName: string;
    listener: Listener;
    removeSubscription(): void;
}