<script lang="ts">
	let { children } = $props();
</script>

<header>
	<a href="/console/logout">Log out</a>
</header>
<div class="wrapper">
	{@render children?.()}
</div>

<style>
	header {
		display: flex;
	}

	header,
	.wrapper {
		background-color: var(--colour-theme);
	}

	header a {
		margin-block: var(--spacing-2);
		margin-inline-start: auto;
		margin-inline-end: var(--spacing-6);
		padding-block: var(--spacing-2);
		padding-inline: var(--spacing-4);
		background-color: var(--colour-light);
		color: var(--colour-dark);
		font-weight: var(--font-weight-medium);
		border-radius: var(--spacing-1);
	}

	.wrapper {
		display: flex;
		justify-content: center;
		width: var(--max-width-full);
		min-height: 100vh;
	}
</style>
