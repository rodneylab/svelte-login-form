import { PrismaClient } from '@prisma/client';

let db: PrismaClient | undefined;

if (process.env.NODE_ENV === 'production') {
	db = new PrismaClient();
} else {
	if (!global.__db) {
		global.__db = new PrismaClient();
	}
	db = global.__db;
}

export { db };
