<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
    
	let data = {name: "shobhit"};

	// Create a store and update it when necessary...
	const user = writable(); //useState

    // setState()
    $: user.set(data);

	// ...and add it to the context for child components to access
	setContext('user', user);
</script>

<!-- 
    import { onMount } from 'svelte';
    let fetchedUser = '';
    onMount( async () => {
        // const response = await fetch('http://localhost:3000/profile', {credentials: 'include'});
        // const userdata = await response.json();
        fetchedUser =  { name: "shobhit" };
        console.log(fetchedUser, "fetchedUser");
    });
 -->

<div class="web">
<nav class="p-8 mx-20 border-b border-gray-300">
<div class="flex items-center justify-between">
    <div class="flex items-center">
    <img src="/carlogo.png" alt="Logo" class="h-12 w-12 mr-4 rounded-full" />
    <a href="/"><span class="text-purple-700 text-3xl font-bold">Car-Sell</span></a> 
    </div>
    <div class="logins">
    <a href="/userlogin"><button class="bg-purple-700 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded">
    User Login
    </button></a>
    <a href="/dealerlogin"><button class="bg-purple-700 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded">
    Dealer Login
    </button></a>
    </div>
</div>
</nav>
<slot>

</slot>
<footer class="bg-gray-800 mt-auto text-white py-4 text-center">
<div class="mx-auto">
    <p>&copy; 2024 Your Website. All rights reserved.</p>
</div>
</footer>
</div>


<style>
@import '../app.css';
</style>