import { Lambda } from "mobx";
import { IObserverStorage } from "../interfaces";

export abstract class ObserverStorage implements IObserverStorage {
    private readonly observers: Map<string, Lambda> = new Map();

    trySet(observerName: string, lambda: Lambda): boolean {
        const hasObserver = this.observers.has(observerName);
        if (!hasObserver) {
            this.observers.set(observerName, lambda);
        }
        return !hasObserver;
    }

    deleteOne(observerName: string): void {
        const observer = this.observers.get(observerName);
        if (observer) {
            observer();
            this.observers.delete(observerName);
        }
    }

    deleteAll(): void {
        this.observers.forEach(observer => {
            observer()
        });
        this.observers.clear();
    }
}