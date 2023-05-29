import { createSession, setSessionUser } from '$lib/utilities/session';
import { fail, redirect } from '@sveltejs/kit';
import argon2 from 'argon2';
import type { Actions, PageServerLoad } from './$types';

export const actions: Actions = {
	login: async ({ cookies, locals, request }) => {
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');

		const session = cookies.get('session');
		const { sessionID } = JSON.parse(session!);
		if (!session || !sessionID) {
			throw redirect(303, '/signup');
		}

		if (typeof email !== 'string') {
			return fail(400, {
				email: '',
				error: 'authentication'
			});
		}

		const user = await locals.db.user.findUnique({
			where: { username: email },
			include: { authnDevices: true }
		});

		if (typeof password !== 'string' || !user) {
			return fail(400, {
				email,
				error: 'authentication'
			});
		}

		const { passwordHash } = user;
		const validPassword = await argon2.verify(passwordHash, password);
		if (!validPassword) {
			return fail(400, {
				email,
				error: 'authentication'
			});
		}

		// set user email on session cookie
		setSessionUser({ cookies, email, sessionID });

		throw redirect(303, '/console');
	}
};

export const load: PageServerLoad = async function load({ cookies }) {
	const session = cookies.get('session');

	if (!session) {
		createSession(cookies);
	}

	return {};
};
