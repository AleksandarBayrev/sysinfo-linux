export interface IUrlParser {
    parseUrl(url: URL): string;
    getUrlParameter(url: URL, parameter: string): string;
}