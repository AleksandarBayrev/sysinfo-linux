import React from "react";
import { Link } from "./Link";
import { LinkConfiguration } from "../types";

export class Menu extends React.Component {
    private readonly links: LinkConfiguration[] = [
        {
            text: "Home",
            location: "/"
        },
    ];

    render() {
        return (
            <div className="app-menu-wrapper">
                {this.links.map((link, index) => <Link key={`${link.text}-${link.location}-${index}`} text={link.text} location={link.location} />)}
            </div>
        )
    }
}