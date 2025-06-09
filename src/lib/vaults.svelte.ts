import { db } from "./db";
import { liveQuery } from "dexie";

export let vaults = liveQuery(() => db.vaults.toArray());
