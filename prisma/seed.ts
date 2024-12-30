import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function seed() {
	await db.user.create({
		data: {
			username: 'dion@example.com',
			// this is a hashed version of "RP9<e#0%w|<<I;}"xRp=QKt-lz(@Q1V\"
			passwordHash:
				'$argon2id$v=19$m=65536,t=3,p=4$fD7QaYh91aOcvGZEaJmKrQ$DJh8FDRgHxpaj/XEE5XUHx2496D6/11X2BQO/dRJqqQ',
		},
	});
}

seed();
