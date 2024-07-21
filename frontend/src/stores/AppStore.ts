import { IObservableValue, observable, runInAction, IObservableArray } from "mobx";
import { IAppStore, IBrowserHistoryManager } from "../interfaces";
import { enhanceClass } from "../base";
import { CommandResponse } from "../types";

export class AppStore implements IAppStore {
    private readonly browserHistoryManager: IBrowserHistoryManager;
    //#region Public properties
    @observable
    currentPage: IObservableValue<string>;

    @observable
    currentFullUrl: IObservableValue<string>;

    @observable
    commandsResponse: IObservableArray<CommandResponse>;
    //#endregion

    //#region Private properties
    @observable
    private isReloading: IObservableValue<boolean>;

    private interval: NodeJS.Timeout | null;
    //#endregion

    constructor(browserHistoryManager: IBrowserHistoryManager) {
        this.browserHistoryManager = browserHistoryManager;
        const url = new URL(this.browserHistoryManager.currentUrl);
        this.currentPage = observable.box(this.browserHistoryManager.pathAndQuery);
        this.currentFullUrl = observable.box(url.toString());
        this.commandsResponse = observable.array();
        this.isReloading = observable.box(false);
        this.interval = null;
    }

    //#region Base methods
    async load(): Promise<void> {
        if (this.isReloading.get() && this.interval) {
            return;
        }
        this.interval = setInterval(async () => {
            const response = await fetch("http://localhost:5000/commands").then(x => x.json());
            this.commandsResponse.replace(response);
        }, 1000);
        runInAction(() => {
            this.isReloading.set(true);
        });
    }
    async unload(): Promise<void> {
        if (this.isReloading.get() && this.interval) {
            clearInterval(this.interval);
            runInAction(() => {
                this.isReloading.set(false);
            });
            this.interval = null;
        }
    }
    //#endregion

    //#region Actions
    setCurrentPage = (page: string) => {
        runInAction(() => {
            this.currentPage.set(page);
        });
    }
    updateCurrentFullUrl = (): void => {
        runInAction(() => {
            const url = new URL(this.browserHistoryManager.currentUrl);
            this.currentFullUrl.set(url.toString());
        });
    }
    //#endregion
}

enhanceClass(AppStore, "AppStore");