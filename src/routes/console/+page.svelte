<svelte:head>
	<title>Svelte Login Form: Console</title>
</svelte:head>

<div class="wrapper">
	<main>
		<h1>Console</h1>
		<p>Welcome to your console!</p>
	</main>
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: center;
		width: var(--max-width-full);
		min-height: 100vh;
		background-color: var(--colour-theme);
	}

	main {
		box-shadow: var(--colour-theme-shadow-elevation-medium);
		height: min-content;
	}
</style>
