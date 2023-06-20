import { db } from '$lib/utilities/db';

export const handle = async ({ event, resolve }) => {
	event.locals.db = db;

	return resolve(event);
};
