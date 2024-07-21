import React from "react";
import { observer } from "mobx-react";
import { DependencyInjection } from "../base";
import { IAppStore } from "../interfaces";
import { NavLink } from "react-router-dom";
import "./Link.css";

type LinkProps = {
    location: string;
    text: string;
}

@observer
export class Link extends React.Component<LinkProps> {
    private readonly appStore: IAppStore;

    constructor(props: LinkProps) {
        super(props);
        this.appStore = DependencyInjection.getInstance().getService<IAppStore>("IAppStore");
    }

    render(): React.ReactNode {
        return (
            <div className="app-link-wrapper">
                <NavLink onClick={this.goToLocation} className={this.getStyles} to={this.props.location}>{this.props.text}</NavLink>
            </div>
        )
    }

    private goToLocation = () => {
        if (this.props.location === this.appStore.currentPage.get()) {
            return;
        }
        this.appStore.setCurrentPage(this.props.location);
    }

    private getStyles = () => {
        return this.appStore.currentPage.get() === this.props.location ? `app-link-anchor app-link-anchor-selected` : `app-link-anchor`;
    }
}