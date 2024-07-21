import { enhanceClass } from "../base";
import { IUrlParser } from "../interfaces";

export class UrlParser implements IUrlParser {
    parseUrl(url: URL): string {
        const path = url.pathname;
        const searchParams = url.search;
        return `${path}${searchParams}`;
    }

    getUrlParameter(url: URL, parameter: string): string {
        return url.searchParams.get(parameter) || "";
    }
}

enhanceClass(UrlParser, "UrlParser");