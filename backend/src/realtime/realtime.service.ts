import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import Redis from "ioredis";

type RealtimeMessage = {
  event: string;
  data: unknown;
};

@Injectable()
export class RealtimeService implements OnModuleInit, OnModuleDestroy {
  private readonly channel = "licensing.status.updated";
  private publisher?: Redis;
  private subscriber?: Redis;
  private readonly listeners = new Set<(message: RealtimeMessage) => void>();

  onModuleInit() {
    const redisUrl = process.env.REDIS_URL;

    if (!redisUrl) {
      return;
    }

    this.publisher = new Redis(redisUrl);
    this.subscriber = new Redis(redisUrl);

    this.subscriber.on("message", (_, payload) => {
      try {
        const message = JSON.parse(payload) as RealtimeMessage;
        this.listeners.forEach((listener) => listener(message));
      } catch {
        // Ignore malformed messages.
      }
    });

    this.subscriber.subscribe(this.channel);
  }

  onModuleDestroy() {
    this.publisher?.quit();
    this.subscriber?.quit();
  }

  async publish(event: string, data: unknown) {
    if (!this.publisher) {
      return;
    }

    const payload: RealtimeMessage = { event, data };
    await this.publisher.publish(this.channel, JSON.stringify(payload));
  }

  subscribe(listener: (message: RealtimeMessage) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
