export interface IStore {
    load(): Promise<void>;
    unload(): Promise<void>;
}