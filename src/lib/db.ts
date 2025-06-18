import Dexie from "dexie";
import { type EntityTable } from "dexie";

interface Vault {
  id: string;
  name: string;
}

interface VaultItem {
  id: string;
  vaultId: string;
  encryptedData: Uint8Array;
  iv: Uint8Array;
}

const db = new Dexie("WebTOTPDatabase") as Dexie & {
  vaults: EntityTable<Vault, "id">;
  vaultItems: EntityTable<VaultItem, "id">;
};

db.version(1).stores({
  vaults: "id, name",
  vaultItems: "id, vaultId",
});

export type { Vault, VaultItem };
export { db };
