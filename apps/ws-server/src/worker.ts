import { Worker } from "bullmq";
import { redisConnection } from "./redis-connection";

const worker = new Worker('chat-worker', async (job) => {
    const { roomId, message, userId } = job.data;
    console.log("data", roomId, message, userId);
    console.log("Worker processing job:", job.id, job.data);
}, {
    connection: redisConnection
});

worker.on("error", (err) => {
    console.error("Worker connection error:", err);
});

worker.on("active", (job) => {
    console.log("Processing job : ", job.id);
});

worker.on("completed", (job) => {
    console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
    console.error(`❌ Job ${job?.id} failed:`, err);
});