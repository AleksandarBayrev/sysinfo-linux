import React from "react";
import { DependencyInjection } from "../base";
import { IPageRenderer } from "../interfaces";
import { HomePage, PageNotFound } from "../pages";
import { Routes } from "../constants";

export const setupPageRenderer = () => {
    const pageRenderer = DependencyInjection.getInstance().getService<IPageRenderer>("IPageRenderer");
    pageRenderer.addPage(Routes["/"], <HomePage />);
    pageRenderer.addPage(Routes["/404"], <PageNotFound />);
}