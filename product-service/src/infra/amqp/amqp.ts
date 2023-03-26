import MessageBroker from "../../@shared/amqp/message-broker-interface";
import { Channel, connect, Connection } from 'amqplib'
export default class Amqp implements MessageBroker {
    private connection: Connection
    private channel: Channel
    constructor(
        private connection_string: string,
        private exchange_name: string,
        private routing_key: string,
        private queue_name: string

    ) {
    }

    async setup() {
        this.connection = await connect(this.connection_string);
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue(this.queue_name)
        await this.channel.assertExchange(this.exchange_name, "direct")
        await this.channel.bindQueue(this.queue_name, this.exchange_name, this.routing_key);
    }

    async produce(message: string): Promise<boolean> {
        return this.channel.publish(this.exchange_name, this.routing_key, Buffer.from(message))
    }
}