import React from "react";
import { IAppStore } from "../../interfaces";
import { BasePage, isValidContext } from "../../base";
import { observer } from "mobx-react";
import { AppContext } from "../../AppContext";
import { LoadingState } from "../../types";

@observer
export class HomePage extends BasePage {
    private get appContext(): AppContext {
        if (!isValidContext(this.context)) {
            throw new Error("AppContext not provided!");
        }
        return this.context;
    }

    private get appStore(): IAppStore {
        return this.appContext.dependencyInjection.getService<IAppStore>("IAppStore");
    }

    async componentDidMount(): Promise<void> {
    }

    async componentWillUnmount(): Promise<void> {
    }

    render(): React.ReactNode {
        return (
            <div className="app-page app-page-home">
                <div key="message-not-loaded">{this.appStore.loadingState.get() === LoadingState.NotLoaded ? "Preparing to load sensors" : ""}</div>
                <div key="message-state-data">{this.appStore.loadingState.get() === LoadingState.Loading ? "Loading sensors, please wait..." : this.appStore.loadingState.get() === LoadingState.Loaded ? this.appStore.commandsResponse.filter(x => x.commandExists).map(x => {
                    return <div key={`${x.command}-wrapper`}>
                        <div key={`${x.command}-wrapper-field-command`}>Command: {x.command}</div>
                        <div key={`${x.command}-wrapper-field-response`}>Response: {x.response.split("\n").map((x, i) => <div key={`row-${i}`}>{x}</div>)}</div>
                    </div>
                }) : "Failed loading data, please contact an administrator."}</div>
            </div>
        )
    }
}