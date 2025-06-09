import Dexie from "dexie";
import { type EntityTable } from "dexie";

interface Vault {
  id: string; // UUID or short id
  name: string;
  createdAt: number;
}

interface VaultKey {
  vaultId: string; // foreign key to Vault

  // Encrypted using password-derived key
  encryptedByPassword: {
    ciphertext: Uint8Array;
    iv: Uint8Array;
    salt: Uint8Array;
    iterations: number;
  };

  // Encrypted using passkey-derived key
  encryptedByPasskey: {
    ciphertext: Uint8Array;
    iv: Uint8Array;
    prfContext: Uint8Array;
  };

  // Optional key checksum
  checksum?: Uint8Array;
}

interface VaultItem {
  id: string; // unique within vault
  vaultId: string; // foreign key to Vault
  encryptedData: Uint8Array;
  iv: Uint8Array;
  createdAt: number;
}

const db = new Dexie("VaultAppDatabase") as Dexie & {
  vaults: EntityTable<Vault, "id">;
  vaultKeys: EntityTable<VaultKey, "vaultId">;
  vaultItems: EntityTable<VaultItem, "id">;
};

db.version(1).stores({
  vaults: "id, name, createdAt",
  vaultKeys: "vaultId",
  vaultItems: "id, vaultId, createdAt",
});

export type { Vault, VaultKey, VaultItem };
export { db };
