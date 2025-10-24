import { Worker } from "bullmq";
import { redisConnection } from "./redis-connection";
import { prisma } from "@repo/db";

const worker = new Worker('shapes-worker', async (job) => {
    const { roomId, shapes, userId } = job.data;

    console.log("Worker processing job:", job.id);
    await prisma.shapes.create({
        data: {
            roomId,
            userId,
            message: shapes
        }
    });
    console.log("-------------> :)");

}, {
    connection: redisConnection
});

console.log("running the worker ...");

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
