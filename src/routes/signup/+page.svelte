<script lang="ts">
	import { enhance } from '$app/forms';
	import { zxcvbn, zxcvbnOptions, type Score } from '@zxcvbn-ts/core';
	import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
	import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let password = '';
	const formDefault = { email: '', errors: { email: '', password: '' } };
	let { email, errors } = form ?? formDefault;
	$: ({ email, errors } = form ?? formDefault);

	let passwordTouched = false;

	let emailError = (errors?.email.length ?? 0) > 0;
	let passwordError = (errors?.password.length ?? 0) > 0;

	const { translations } = zxcvbnEnPackage;
	const { adjacencyGraphs: graphs, dictionary: commonDictionary } = zxcvbnCommonPackage;
	const { dictionary: englishDictionary } = zxcvbnEnPackage;

	const options = {
		translations,
		graphs,
		dictionary: { ...commonDictionary, ...englishDictionary }
	};
	zxcvbnOptions.setOptions(options);

	$: ({
		score,
		feedback: { warning, suggestions }
	} = zxcvbn(password));

	let strengthDescription = 'Low';
	$: switch (score) {
		case 3:
			strengthDescription = 'OK';
			break;
		case 4:
			strengthDescription = 'Good';
			break;
		case 0:
		case 1:
		case 2:
		default:
			strengthDescription = 'Low';
	}
</script>

<svelte:head>
	<title>Svelte Login Form: Sign Up</title>
	<meta
		title="description"
		content="Svelte login form example 📝 signup and login forms for your Svelte app with password strength meter 🔐 and strong password auto generation."
	/>
</svelte:head>

<div class="wrapper">
	<main>
		<h1>Signup form</h1>
		<form action="?/signup" method="POST" use:enhance>
			<p>Create an account</p>
			<label for="email">Email</label>
			<input
				id="email"
				aria-invalid={emailError}
				aria-describedby={emailError ? 'email-error' : undefined}
				type="email"
				required
				name="email"
				autocomplete="username"
				value={email}
				placeholder="tillie@example.com"
			/>
			{#if errors?.email}
				<small id="email-error" class="error-text">{errors.email}</small>
			{/if}
			<label for="password">Password</label>
			<input
				bind:value={password}
				on:keydown={() => {
					passwordTouched = true;
				}}
				id="password"
				aria-invalid={passwordError}
				aria-describedby={passwordError ? 'password-error' : undefined}
				type="password"
				required
				name="password"
				autocomplete="new-password"
				placeholder="P@s$w0rd"
			/>
			{#if errors?.password}
				<small id="password-error" class="error-text">{errors.password}</small>
			{/if}
			<label for="password-confirm">Confirm your password</label>
			<input
				id="password-confirm"
				aria-invalid={passwordError}
				aria-describedby={passwordError ? 'password-error' : undefined}
				type="password"
				required
				name="password-confirm"
				autocomplete="new-password"
				placeholder="P@s$w0rd"
			/>

			{#if passwordTouched}
				<label for="password-strength">Password strength: {strengthDescription}</label>
				<progress id="password-strength" value={score} max="4" />
				{#if warning}
					<span class="warning"> {warning}</span>
					<ul>
						{#each suggestions as suggestion}
							<li class="alert">{suggestion}</li>
						{/each}
					</ul>{/if}{/if}
			<button type="submit" disabled={score < 3}>Signup</button>
		</form>
		<p class="login">Already have an account? <a href="/login">Log in</a>.</p>
	</main>
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: center;
		width: var(--max-width-full);
		min-height: 100vh;
		background-color: var(--colour-brand);
	}

	main {
		box-shadow: var(--colour-brand-shadow-elevation-medium);
		height: fit-content;
	}

	form p {
		font: var(--font-weight-medium) var(--font-size-3) var(--font-family);
	}

	.warning {
		color: var(--colour-warning-shade-20);
		font-size: var(--font-size-1);
		margin-bottom: var(--spacing-3);
	}

	.alert {
		font-size: var(--font-size-1);
	}

	label[for='password-strength'] {
		font-weight: var(--font-weight-medium);
	}

	progress[value] {
		margin-bottom: var(--spacing-3);
		width: 100%;
	}

	progress[value='1'] {
		accent-color: var(--colour-warning);
	}

	progress[value='2'] {
		accent-color: var(--colour-alert);
	}
	progress[value='3'],
	progress[value='4'] {
		accent-color: var(--colour-info);
	}

	input {
		border-color: var(--colour-brand);
	}

	form small {
		font-size: var(--font-size-1);
		color: var(--colour-warning-shade-20);
		margin-block: calc(-1 * var(--spacing-3)) var(--spacing-4);
	}

	button {
		margin-block: var(--spacing-6);
		background-color: var(--colour-brand);
		box-shadow: var(--colour-brand-alpha-shadow-elevation-low);
	}

	button:disabled {
		background-color: var(--colour-light);
		box-shadow: unset;
	}

	.login {
		text-align: center;
	}
</style>
