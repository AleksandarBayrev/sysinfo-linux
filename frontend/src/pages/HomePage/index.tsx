import React from "react";
import { IAppStore } from "../../interfaces";
import { BasePage, isValidContext } from "../../base";
import { observer } from "mobx-react";
import { AppContext } from "../../AppContext";

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
                {this.appStore.commandsResponse.filter(x => x.commandExists).map(x => {
                    return <div>
                        <div>Command: {x.command}</div>
                        <div>Response: {x.response}</div>
                    </div>
                })}
            </div>
        )
    }
}