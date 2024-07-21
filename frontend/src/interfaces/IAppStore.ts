import { IObservableArray, IObservableValue } from "mobx";
import { IStore } from "./IStore";
import { CommandResponse } from "../types";

export interface IAppStore extends IStore {
    currentPage: IObservableValue<string>;
    currentFullUrl: IObservableValue<string>;
    commandsResponse: IObservableArray<CommandResponse>;
    setCurrentPage(page: string): void;
    updateCurrentFullUrl(): void;
}