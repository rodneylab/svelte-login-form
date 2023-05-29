import { createSession, setSessionUser } from '$lib/utilities/session';
import { emailRegex } from '$lib/utilities/user';
import { fail, redirect } from '@sveltejs/kit';
import argon2 from 'argon2';
import type { Actions, PageServerLoad } from './$types';

export const actions: Actions = {
	signup: async ({ cookies, locals, request }) => {
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');
		const passwordConfirm = form.get('password-confirm');

		const session = cookies.get('session');
		const { sessionID } = JSON.parse(session!);
		if (!session || !sessionID) {
			throw redirect(303, '/signup');
		}

		const errors = { email: '', password: '' };

		if (typeof email !== 'string') {
			return fail(400, {
				email: '',
				errors: { ...errors, email: 'Please enter an email address.' }
			});
		}

		if (!emailRegex.test(email.trim())) {
			return fail(400, {
				email,
				errors: { ...errors, email: 'Check your entered email address is right.' }
			});
		}

		if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
			return fail(400, {
				email,
				errors: {
					...errors,
					password: 'Please enter a password between 8 and 128 characters long.'
				}
			});
		}

		if (password !== passwordConfirm) {
			return fail(400, {
				email,
				errors: {
					...errors,
					password:
						'Passwords did not match. Please enter password, then confirm entering the same value.'
				}
			});
		}

		if (await locals.db.user.findUnique({ where: { username: email } })) {
			return fail(400, {
				email,
				errors: {
					...errors,
					email: 'You might already have an account, did you mean to log in instead?'
				}
			});
		}

		await locals.db.user.create({
			data: {
				username: email,
				passwordHash: await argon2.hash(password)
			}
		});

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
