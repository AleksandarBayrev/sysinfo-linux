import { Lambda } from "mobx";

export interface IObserverStorage {
    trySet(observerName: string, lambda: Lambda): boolean;
    deleteOne(observerName: string): void;
    deleteAll(): void;
}