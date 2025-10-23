"use server";

import { prisma } from "@repo/db";
import { getUserSession } from "../api/auth/session";

export async function createRoom(room: string) {
    const session = await getUserSession();
    try {
        if (!session || "error" in session) {
            console.error("Unauthorized");
            return { "success": false, "message": "Unauthorized" };
        }
        const userId = session.session.userId;

        const is_room = await prisma.room.findFirst({
            where: {
                slug: room
            }
        });

        if (is_room) {
            return {
                "success": false,
                "message": "Room already exists!!"
            };
        };

        const new_room = await prisma.room.create({
            data: {
                adminId: userId,
                slug: room
            }
        });

        if (!new_room) {
            return {
                "success": false,
                "message": "Fail to create new room. Please try again!!"
            }
        }

        return {
            "message": "Room created successfully!!",
            "success": true,
            "room": new_room
        }

    } catch (e) {
        console.error(e);
        return {
            "success": false,
            "message": "Error in creating room!!"
        };
    }
};

export async function getRoomIdBySlug(room: string) {
    const session = await getUserSession();
    try {
        if (room === undefined) {
            return { "success": false, "message": "Please provide room name" };
        }
        if (!session) {
            console.error("Unauthorized");
            return { "success": false, "message": "Unauthorized" };
        }

        const room_details = await prisma.room.findFirst({
            where: {
                slug: room
            }
        });

        if (room_details) {
            return {
                "success": true,
                "message": "room found!!",
                room_details
            }
        } else {
            return {
                "success": false,
                "message": "room not found!!"
            };
        }

    } catch (e) {
        console.error(e);
        return {
            "success": false,
            "message": "Error in getting ID!!"
        }
    }
}