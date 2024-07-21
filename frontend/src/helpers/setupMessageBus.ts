import { DependencyInjection } from "../base";
import { MessageBusTopics } from "../constants";
import { IMessageBus } from "../interfaces";
import { PageLoadedMessage } from "../types";

export const setupMessageBus = async () => {
    const messageBus = DependencyInjection.getInstance().getService<IMessageBus>("IMessageBus");
    messageBus.subscribe<PageLoadedMessage>(MessageBusTopics.PAGE_LOADED, (message) => {
        console.log(`page loaded, route: ${message.data.route}`);
    });
}