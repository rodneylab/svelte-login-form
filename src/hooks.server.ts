import { PrismaClient } from '@prisma/client';

export const handle = async ({ event, resolve }) => {
	event.locals.db = new PrismaClient();

	return resolve(event);
};
