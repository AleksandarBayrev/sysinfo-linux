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

    private renderNotLoadedMessage() {
        return this.appStore.loadingState.get() === LoadingState.NotLoaded ? "Preparing to load sensors" : "";
    }

    private renderLoadingMessage() {
        return "Loading sensors, please wait..." ;
    }

    private renderCommandOutputs() {
        return this.appStore.commandsResponse.filter(x => x.commandExists).map(x => {
            return <div key={`${x.command}-wrapper`}>
                <div key={`${x.command}-wrapper-field-command`}>Command: {x.command}</div>
                <div key={`${x.command}-wrapper-field-response`}>Response: {x.response.split("\n").map((x, i) => <div key={`row-${i}`}>{x}</div>)}</div>
            </div>
        });
    }

    private renderError() {
        return "Failed loading data, please contact an administrator.";
    }

    private renderStateData() {
        switch (this.appStore.loadingState.get()) {
            case LoadingState.Loading:
                return this.renderLoadingMessage();
            case LoadingState.Loaded:
                return this.renderCommandOutputs();
            case LoadingState.Error:
                return this.renderError();
            default:
                return this.renderNotLoadedMessage();
        }
    }
    render(): React.ReactNode {
        return (
            <div className="app-page app-page-home">
                <div key="message-app-data">{this.renderStateData()}</div>
            </div>
        )
    }
}