const loadMeal = (search) => {
    const url = `https://themealdb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeal(data.meals))
}
const displayMeal = (meals) => {
    // console.log(meals);
    const mealContainer = document.getElementById('meal-container');
    //Clear the previous search result
    mealContainer.innerHTML = '';
    meals.forEach(meal => {
        const mealSingle = document.createElement('div');
        mealSingle.innerHTML = `
        <div onclick="loadMealDetails(${meal.idMeal})" class="card w-full shadow-xl rounded-lg">
            <img src="${meal.strMealThumb}" class="rounded-t-lg" />
            <div class="p-3">
            <h2 class="text-3xl">${meal.strMeal}</h2>
            <p>Food Region: <span class="text-violet-500 font-semibold">${meal.strArea}</span></p>
            <p>Food Category: <span class="text-violet-500 font-semibold">${meal.strCategory}</span></p>
            <p>${meal.strInstructions.slice(0,150)}</p>
            <div class="card-actions justify-end mt-3 mb-5">
                <button class="bg-violet-500 hover:bg-violet-600 text-white font-semibold py-1 px-3 rounded-md"><i class="fa-solid fa-cart-shopping"></i> Buy Now</button>
                <button class="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md"><a href="${meal.strYoutube}"><i class="fa-brands fa-youtube"></i> Recipe</a></button>
            </div>
            </div>
        </div>
        `
    mealContainer.appendChild(mealSingle);
    })

}
//Search for the meal
const searchMeal = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadMeal(searchText);
    searchField.value = '';
}
loadMeal('');

//Mealdetails
const loadMealDetails = (mealId) =>{
    // console.log('meal details', mealId);
    const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))
}

//Display meal details
const displayMealDetails = (mealDetails) =>{
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = '';

    const details = document.createElement('div');
    details.classList.add('rounded-lg', 'border-2', 'border-violet-500')
    details.innerHTML = `
        <div class="flex">
            <div class="w-2/4">
            <img src="${mealDetails.strMealThumb}" class="rounded-l-lg h-full">
            </div>
            <div class="details-body w-2/4 text-left ml-2">
                <h3 class="text-2xl font-bold">${mealDetails.strMeal}</h3>
                <p>Food Region: <span class="text-violet-500 font-semibold">${mealDetails.strArea}</span></p>
                <p>Food Category: <span class="text-violet-500 font-semibold">${mealDetails.strCategory}</span></p>
                <p>${mealDetails.strInstructions.slice(0,150)}</p>
                <div class="card-actions justify-end mt-3 mb-5">
                    <button class="bg-violet-500 hover:bg-violet-600 text-white font-semibold py-1 px-3 rounded-md"><i class="fa-solid fa-cart-shopping"></i> Buy Now</button>
                    <button class="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md"><a href="${mealDetails.strYoutube}"><i class="fa-brands fa-youtube"></i> Recipe</a></button>
                </div>
            </div>
        </div>
    `
    detailsContainer.appendChild(details);
}
