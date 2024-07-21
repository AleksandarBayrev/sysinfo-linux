export type Message<T> = {
    topic: string;
    data: T;
}
export type MessageBusCallback<T> = ((message: Message<T>) => void) | ((message: Message<T>) => Promise<void>);
export interface IMessageBus {
    subscribe<T>(topic: string, callback: MessageBusCallback<T>): Promise<void>;
    numberOfSubscribers(): number;
    publishMessage<T>(message: Message<T>): Promise<void>;
    unsubscribeOne(topic: string, callbackId: number): Promise<void>;
    unsubscribeAll(topic: string): Promise<void>;
}