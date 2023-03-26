export default interface MessageBroker {
    produce(message: string): Promise<boolean>
}