// load all categories
fetch("https://openapi.programming-hero.com/api/peddy/categories")
  .then((res) => res.json())
  .then((data) => showCategories(data.categories))
  .catch((err) => console.log("Data is not found", err));

// show all category
const showCategories = (categoryNames) => {
  const categories = document.getElementById("categories");

  categoryNames.forEach((category) => {
    // console.log(category)

    categories.innerHTML += `
            <div id="${category.category}" onclick="categoryButton('${category.category}')" class="category-btn p-6 flex gap-3 items-center justify-center my-4 border rounded-xl cursor-pointer">
                <img src="${category.category_icon}" alt="">
                <h2 class="text-xl font-bold">${category.category}</h2>
            </div>
        `;
  });
};

// load all pets
fetch("https://openapi.programming-hero.com/api/peddy/pets")
  .then((res) => res.json())
  .then((data) => showPets(data.pets))
  .catch((err) => console.log("Data is not found", err));

// show all pets
const showPets = (pets) => {
  // console.log(pets)
  const petContainer = document.getElementById("pet-section");
  petContainer.innerHTML = "";

  if (pets.length === 0) {
    petContainer.classList.add("bg-[#D2DCFD]", "border", "rounded-md", "border-none")
    petContainer.innerHTML = `
            <div></div>
            <div class="py-24">
                <img class="mx-auto" src="./images/error.webp" />
                <h2 class="text-center text-2xl font-bold">No Information Available</h2>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
        `;

    return;
  }

  pets.forEach((pet) => {
    // console.log(pet);

    petContainer.innerHTML += `
            <div class="p-5 border rounded-lg border-gray-300">
                <img class="rounded object-cover w-full" src="${pet.image}" />
                <h2 class="font-bold text-xl mt-3">${pet.pet_name}</h2>

                <div class="flex gap-2 items-center">
                    <img class="w-4 h-4" src="https://img.icons8.com/?size=80&id=i83wF07inDck&format=png" />
                    <p class="text-gray-400">
                        Breed : ${pet.breed}
                    </p>
                </div>

                <div class="flex gap-2 items-center">
                    <img class="w-4 h-4" src="https://img.icons8.com/?size=80&id=BCKAW92AuElD&format=png" />
                    <p class="text-gray-400">
                        Birth : ${pet.date_of_birth}
                    </p>
                </div>

                <div class="flex gap-2 items-center">
                    <img class="w-4 h-4" src="https://ouch-prod-var-cdn.icons8.com/hm/illustrations/thumbs/Qj8QBJD5dvULD0CM.webp" />
                    <p class="text-gray-400">
                        Gender : ${pet.gender}
                    </p>
                </div>

                <div class="flex gap-2 items-center">
                    <img class="w-4 h-4" src="https://img.icons8.com/?size=50&id=7165&format=png" />
                    <p class="text-gray-400">
                        Price : ${pet.price}
                    </p>
                </div>

                <div class="flex justify-between items-center mt-6">

                    <button class="btn text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white font-bold"><img src="https://img.icons8.com/?size=24&id=82788&format=png" /></button>

                    <button class="btn text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white font-bold">Adopt</button>

                    <button class="btn text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white font-bold">Details</button>

                </div>

            </div>
        `;
  });
};

// load pets by category
const loadByCategory = (categoryName) => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";

  fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  )
    .then((res) => res.json())
    .then((data) => showPets(data.data))
    .catch((err) => console.log("Data is not found", err));
};

// click category button
const categoryButton = (categoryName) => {
  // console.log(categoryName)
  addBtnClass(categoryName)

  const petContainer = document.getElementById("pet-section");
  petContainer.innerHTML = "";

  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";

  setTimeout(() => {
    loadByCategory(categoryName);
  }, 2000);
};

// add and remove btn-style class
const addBtnClass = name =>{
  // console.log(name);
  
  const categoryBtn = document.getElementsByClassName('category-btn');
  for (const btn of categoryBtn) {
    btn.classList.remove('btn-style')
  }

  document.getElementById(name).classList.add("btn-style")
}