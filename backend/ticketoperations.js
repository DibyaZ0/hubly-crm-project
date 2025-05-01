import { getDB } from './mongo-context.js';

const collectionName = "tickets";

export async function getAllTickets() {
    try {
        const tickets = await getDB().collection(collectionName).find({}).toArray();
        return tickets;
    } catch (err) {
        console.error("Reading all tickets failed with error: ", err);
    }
}