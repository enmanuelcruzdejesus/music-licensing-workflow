"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RealtimeService = class RealtimeService {
    constructor() {
        this.channel = "licensing.status.updated";
        this.listeners = new Set();
    }
    onModuleInit() {
        const redisUrl = process.env.REDIS_URL;
        if (!redisUrl) {
            return;
        }
        this.publisher = new ioredis_1.default(redisUrl);
        this.subscriber = new ioredis_1.default(redisUrl);
        this.subscriber.on("message", (_, payload) => {
            try {
                const message = JSON.parse(payload);
                this.listeners.forEach((listener) => listener(message));
            }
            catch {
            }
        });
        this.subscriber.subscribe(this.channel);
    }
    onModuleDestroy() {
        this.publisher?.quit();
        this.subscriber?.quit();
    }
    async publish(event, data) {
        if (!this.publisher) {
            return;
        }
        const payload = { event, data };
        await this.publisher.publish(this.channel, JSON.stringify(payload));
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
};
exports.RealtimeService = RealtimeService;
exports.RealtimeService = RealtimeService = __decorate([
    (0, common_1.Injectable)()
], RealtimeService);
//# sourceMappingURL=realtime.service.js.map