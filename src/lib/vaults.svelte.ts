import { db } from "./db";
import { liveQuery } from "dexie";

export let vaults = liveQuery(() => db.vaults.toArray());

export function create(name: string) {
  db.vaults.add({ name, id: crypto.randomUUID() });
}
