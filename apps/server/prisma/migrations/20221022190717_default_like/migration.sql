-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "like" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("createdAt", "id", "like", "text", "userId") SELECT "createdAt", "id", "like", "text", "userId" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
