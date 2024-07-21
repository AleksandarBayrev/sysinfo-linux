import React from "react";
import { DependencyInjection } from "./base";

export type AppContext = {
    dependencyInjection: DependencyInjection;
};

export const AppContext = React.createContext<AppContext>(undefined as any as AppContext);