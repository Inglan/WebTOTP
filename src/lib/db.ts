import Dexie from "dexie";
import { type EntityTable } from "dexie";

interface Vault {
  id: string;
  name: string;
}

interface EncryptedMasterKey {
  id: string;
  vaultId: string;
  encryptedKey: Uint8Array;
  salt: Uint8Array;
  iv: Uint8Array;
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
  encryptedMasterKeys: EntityTable<EncryptedMasterKey, "id">;
};

db.version(1).stores({
  vaults: "id, name",
  vaultItems: "id, vaultId",
  encryptedMasterKeys: "id, vaultId",
});

export type { Vault, VaultItem };
export { db };
