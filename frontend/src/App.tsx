import React from "react";
import "./App.css";
import { observer } from "mobx-react";
import { IAppStore, IBrowserHistoryManager, IMessageBus, IPageRenderer } from "./interfaces";
import { Routes as RoutesConstants } from "./constants";
import { Menu } from "./navigation";
import { AppLogo } from "./ui";
import { AppContext } from "./AppContext";
import { isValidContext } from "./base";
import { Routes, Route, BrowserRouter } from "react-router-dom";

@observer
export class App extends React.Component {
    private readonly routes = [
        {
            path: RoutesConstants["/"],
            element: this.pageRenderer.renderPage(RoutesConstants["/"])
        },
        {
            path: RoutesConstants["/404"],
            element: this.pageRenderer.renderPage(RoutesConstants["/404"])
        },
    ];

    private get appContext(): AppContext {
        if (!isValidContext(this.context)) {
            throw new Error("AppContext not provided!");
        }
        return this.context;
    }

    private get store(): IAppStore {
        return this.appContext.dependencyInjection.getService<IAppStore>("IAppStore");
    }

    private get pageRenderer(): IPageRenderer {
        return this.appContext.dependencyInjection.getService<IPageRenderer>("IPageRenderer");
    }

    private get messageBus(): IMessageBus {
        return this.appContext.dependencyInjection.getService<IMessageBus>("IMessageBus");
    };

    private get browserHistoryManager(): IBrowserHistoryManager {
        return this.appContext.dependencyInjection.getService<IBrowserHistoryManager>("IBrowserHistoryManager");
    };

    async componentDidMount() {
        await this.store.load();
        this.browserHistoryManager.listen("onPageChange", (update) => {
            this.store.setCurrentPage(this.browserHistoryManager.pathOnly);
        });
    }

    async componentWillUnmount() {
        await this.store.unload();
        this.browserHistoryManager.unlisten("onPageChange");
    }

    private renderRoutes = () => {
        return <Routes>
            {this.routes.map(x => <Route key={x.path} path={x.path} element={x.element} />)}
            <Route key="404-page" path="*" element={this.pageRenderer.renderPage(RoutesConstants["/404"])} />
        </Routes>
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app-container">
                    <div className="app-logo-container">
                        <AppLogo />
                    </div>
                    <div className="app-menu-container">
                        <Menu />
                    </div>
                    <div className="app-page-wrapper">
                        {this.renderRoutes()}
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

App.contextType = AppContext;