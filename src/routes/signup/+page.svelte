<script lang="ts">
	import { enhance } from '$app/forms';
	import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
	import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
	import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let password = $state('');
	const formDefault = { email: '', errors: { email: '', password: '' } };
	let { email, errors } = $derived(form ?? formDefault);

	let passwordTouched = $state(false);

	let emailError = $derived((errors?.email.length ?? 0) > 0);
	let passwordError = $derived((errors?.password.length ?? 0) > 0);

	const { translations } = zxcvbnEnPackage;
	const { adjacencyGraphs: graphs, dictionary: commonDictionary } = zxcvbnCommonPackage;
	const { dictionary: englishDictionary } = zxcvbnEnPackage;

	const options = {
		translations,
		graphs,
		dictionary: { ...commonDictionary, ...englishDictionary },
	};
	zxcvbnOptions.setOptions(options);

	let {
		score,
		feedback: { warning, suggestions },
	} = $derived(zxcvbn(password));

	let strengthDescription = $state('Low');
	$effect(() => {
		switch (score) {
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
	});
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
				onchange={() => {
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
				<meter id="password-strength" value={score} low="1.9" high="2.9" optimum="4" max="4"
				></meter>
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

	meter {
		width: 100%;
	}

	meter::-webkit-meter-even-less-good-value {
		background-color: var(--colour-warning);
	}

	meter::-webkit-meter-suboptimum-value {
		background-color: var(--colour-alert);
	}

	meter::-webkit-meter-optimum-value {
		background-color: var(--colour-info);
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
