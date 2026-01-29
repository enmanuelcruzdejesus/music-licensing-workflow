import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
type RealtimeMessage = {
    event: string;
    data: unknown;
};
export declare class RealtimeService implements OnModuleInit, OnModuleDestroy {
    private readonly channel;
    private publisher?;
    private subscriber?;
    private readonly listeners;
    onModuleInit(): void;
    onModuleDestroy(): void;
    publish(event: string, data: unknown): Promise<void>;
    subscribe(listener: (message: RealtimeMessage) => void): () => boolean;
}
export {};
