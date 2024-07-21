import { enhanceClass } from "../base";
import { IMessageBus, Message, MessageBusCallback } from "../interfaces";

export class MessageBus implements IMessageBus {
    private readonly subscriptions: Map<string, MessageBusCallback<any>[]>;

    constructor() {
        this.subscriptions = new Map();
    }

    async subscribe<T>(topic: string, callback: MessageBusCallback<T>): Promise<void> {
        const callbacks = this.subscriptions.get(topic);
        if (!callbacks) {
            this.subscriptions.set(topic, [callback]);
            return;
        }
        callbacks.push(callback);
    }

    numberOfSubscribers(): number {
        return this.subscriptions.size;
    }

    async publishMessage<T>(message: Message<T>): Promise<void> {
        const callbacks = this.subscriptions.get(message.topic);
        if (!callbacks) {
            throw new Error(`Topic: ${message.topic} has no subscriptions!`);
        }
        await Promise.all(callbacks.map(callback => callback(message)));
    }

    async unsubscribeOne(topic: string, callbackId: number): Promise<void> {
        const callbacks = this.subscriptions.get(topic);
        if (!callbacks) {
            throw new Error(`Topic: ${topic} has no subscriptions!`);
        }
        if (callbackId < 0 || callbackId >= callbacks.length) {
            throw new Error(`Callback ID is negative or greater than/equal of the array size of ${callbacks.length}`);
        }
        callbacks.splice(callbackId, 1);
    }

    async unsubscribeAll(topic: string): Promise<void> {
        const callbacks = this.subscriptions.get(topic);
        if (!callbacks) {
            throw new Error(`Topic: ${topic} has no subscriptions!`);
        }
        while (callbacks.length !== 0) {
            callbacks.pop();
        }
    }
}

enhanceClass(MessageBus, "MessageBus");