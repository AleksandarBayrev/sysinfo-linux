import { IObservableValue, observable, runInAction, IObservableArray } from "mobx";
import { IAppStore, IBrowserHistoryManager } from "../interfaces";
import { enhanceClass } from "../base";
import { CommandResponse, LoadingState } from "../types";

export class AppStore implements IAppStore {
    private readonly browserHistoryManager: IBrowserHistoryManager;
    //#region Public properties
    @observable
    currentPage: IObservableValue<string>;

    @observable
    currentFullUrl: IObservableValue<string>;

    @observable
    commandsResponse: IObservableArray<CommandResponse>;

    @observable
    loadingState: IObservableValue<LoadingState>;
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
        this.loadingState = observable.box(LoadingState.NotLoaded);
        this.interval = null;
    }

    //#region Base methods
    async load(): Promise<void> {
        if (this.isReloading.get() && this.interval) {
            return;
        }
        runInAction(() => {
            this.loadingState.set(LoadingState.Loading);
        });
        this.interval = setInterval(async () => {
            try {
                const response = await fetch(`${window.location.origin}/commands`).then(x => x.json() as Promise<CommandResponse[]>);
                runInAction(() => {
                    this.commandsResponse.replace(response);
                    this.loadingState.set(LoadingState.Loaded);
                });
            } catch (_) {
                runInAction(() => {
                    this.commandsResponse.replace([]);
                    this.loadingState.set(LoadingState.Error);
                });
            }
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