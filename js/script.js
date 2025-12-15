// load all categories
fetch('https://openapi.programming-hero.com/api/peddy/categories')
  .then((res) => res.json())
  .then((data) => showCategories(data.categories))
  .catch((err) => console.log("Data is not found", err));


// show all category
const showCategories = (categoryNames) => {
  const categories = document.getElementById("categories");

  categoryNames.forEach((category) => {
    // console.log(category)

    categories.innerHTML += `
            <div class="p-6 flex gap-3 items-center justify-center my-4 border rounded-xl">
                <img src="${category.category_icon}" alt="">
                <h2 class="text-xl font-bold">${category.category}</h2>
            </div>
        `;
  });
};


// load all pets
fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => showPets(data.pets))
    .catch(err => console.log('Data is not found', err))


// show all pets
const showPets = pets =>{
    // console.log(pets)
    const petContainer = document.getElementById('pet-section');

    pets.forEach(pet => {
        console.log(pet);
        
        petContainer.innerHTML += `
            <div class="p-5 border rounded-lg">
                <img class="rounded object-cover w-full" src="${pet.image}" />
                <h2 class="font-bold text-xl mt-3">${pet.pet_name}</h2>

                <div class="flex gap-2 items-center">
                    <img class="w-4 h-4" src="https://img.icons8.com/?size=80&id=i83wF07inDck&format=png" />
                    <p>Breed : ${pet.breed}</p>
                </div>
            </div>
        `;
    });
}