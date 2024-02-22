<script>

import { BACKEND_URL } from '$lib/env';
/** @type {import('./$types').PageData} */
    let data;

    console.log('backend url:', BACKEND_URL);

    let dealer_id = 12;

    let carModel = '';
    let carPrice = 0;
    let isSold = false;

    function handleSubmit() {
        // Handle form submission here
        console.log('Car Model:', carModel);
        console.log('Car Price:', carPrice);
        console.log('Is Sold:', isSold);

        const response = fetch(`${BACKEND_URL}/api/cars/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dealer_id,
                carModel,
                carPrice,
                isSold
            })
        });
        
    }
</script>

<main>
    <h1>Dealer</h1>
    <p>Dealer page</p>

    <form on:submit|preventDefault={handleSubmit}>
        <label for="carModel">Car Model:</label>
        <input class="border border-gray-300" type="text" id="carModel" bind:value={carModel}>

        <label for="carPrice">Car Price:</label>
        <input class="border border-gray-300" type="number" id="carPrice" bind:value={carPrice}>

        <label for="isSold">Is Sold:</label>
        <input class="border border-gray-300" type="checkbox" id="isSold" bind:checked={isSold}>

        <button type="submit">Submit</button>
    </form>
</main>