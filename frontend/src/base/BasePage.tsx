import React from "react";
import { AppContext } from "../AppContext";

export abstract class BasePage extends React.Component {
    abstract render(): React.ReactNode;
}

BasePage.contextType = AppContext;