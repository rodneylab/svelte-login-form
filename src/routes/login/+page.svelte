<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
	import { enhance } from '$app/forms';

	let { email, error } = form ?? {};
	$: ({ email, error } = form ?? { email: '', error: '' });

	$: authenticationError = error === 'authentication';
</script>

<svelte:head>
	<title>Svelte Login Form: Log in</title>
	<meta
		title="description"
		content="Svelte login form example 📝 signup and login forms for your Svelte app with password strength meter 🔐 and strong password auto generation."
	/>
</svelte:head>

<div class="wrapper">
	<main>
		<h1>Login form</h1>
		<form action="?/login" method="POST" use:enhance>
			<p>Log in to your account</p>
			<label for="email">Email</label>
			<input
				id="text"
				aria-invalid={authenticationError}
				aria-describedby={authenticationError ? 'authentication-error' : undefined}
				type="email"
				required
				name="email"
				autocomplete="username"
				value={email}
			/>
			<label for="password">Password</label>
			<input
				id="password"
				aria-invalid={authenticationError}
				aria-describedby={authenticationError ? 'authentication-error' : undefined}
				type="password"
				required
				name="password"
			/>
			{#if authenticationError}
				<small id="authentication-error" class="error-text"
					>Check email and password are correct.</small
				>
			{/if}
			<button type="submit">Login</button>
		</form>
		<p class="signup">No account yet? <a href="/signup">Sign up</a>.</p>
	</main>
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: center;
		width: var(--max-width-full);
		min-height: 100vh;
		background-color: var(--colour-alt);
	}

	main {
		box-shadow: var(--colour-alt-shadow-elevation-medium);
		height: fit-content;
	}

	form p {
		font: var(--font-weight-medium) var(--font-size-3) var(--font-family);
	}

	input {
		border-color: var(--colour-alt);
	}

	button {
		margin-block: var(--spacing-6);
		background-color: var(--colour-alt);
		box-shadow: var(--colour-alt-alpha-shadow-elevation-low);
	}

	button:disabled {
		background-color: var(--colour-light);
		box-shadow: unset;
	}

	form small {
		font-size: var(--font-size-1);
		color: var(--colour-warning-shade-20);
		margin-block: calc(-1 * var(--spacing-3)) var(--spacing-4);
	}

	.signup {
		text-align: center;
	}
</style>
