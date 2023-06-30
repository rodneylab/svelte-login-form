import { db } from '$lib/utilities/db';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.db = db;

	return resolve(event);
};
