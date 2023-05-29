import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function load({ cookies }) {
	const session = cookies.get('session');

	if (!session) {
		throw redirect(303, '/login');
	}

	const { email } = JSON.parse(session);
	if (!email) {
		throw redirect(303, '/login');
	}

	return {};
};
