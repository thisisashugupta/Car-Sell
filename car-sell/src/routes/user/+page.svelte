<script>
	import { getContext } from 'svelte';

	// Retrieve user store from context
	const user = getContext('user');

    const loggedIn = true;
</script>





{#if loggedIn}
<p>You are logged in!</p>
<p>Welcome {$user?.name}</p>
{:else}
<p>You are not logged in. Please log in to access the content.</p> 
{/if}

