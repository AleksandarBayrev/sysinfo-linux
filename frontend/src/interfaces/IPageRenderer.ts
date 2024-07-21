import React from "react";

export interface IPageRenderer {
    addPage(route: string, element: React.ReactElement): void;
    renderPage(route: string): React.ReactElement;
}