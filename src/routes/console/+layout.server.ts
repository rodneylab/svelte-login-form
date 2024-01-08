import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async function load({ cookies }) {
	const session = cookies.get('session');

	if (!session) {
		redirect(303, '/login');
	}

	const { email } = JSON.parse(session);
	if (!email) {
		redirect(303, '/login');
	}

	return {};
};
