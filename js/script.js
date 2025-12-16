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
    petContainer.classList.add(
      "bg-[#D2DCFD]",
      "border",
      "rounded-md",
      "border-none"
    );
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
                        Breed : ${pet?.breed ? pet.breed : "Not found"}
                    </p>
                </div>

                <div class="flex gap-2 items-center">
                    <img class="w-4 h-4" src="https://img.icons8.com/?size=80&id=BCKAW92AuElD&format=png" />
                    <p class="text-gray-400">
                        Birth : ${
                          pet?.date_of_birth ? pet.date_of_birth : "Not found"
                        }
                    </p>
                </div>

                <div class="flex gap-2 items-center">
                    <img class="w-4 h-4" src="https://ouch-prod-var-cdn.icons8.com/hm/illustrations/thumbs/Qj8QBJD5dvULD0CM.webp" />
                    <p class="text-gray-400">
                        Gender : ${pet?.gender ? pet.gender : "Not Found"}
                    </p>
                </div>

                <div class="flex gap-2 items-center">
                    <img class="w-4 h-4" src="https://img.icons8.com/?size=50&id=7165&format=png" />
                    <p class="text-gray-400">
                        Price : ${pet?.price ? pet.price : "Not found"}
                    </p>
                </div>

                <div class="flex justify-between items-center mt-6">

                    <button onclick="likeBtn('${pet.image}')" class="btn like-btn text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white font-bold"><img src="https://img.icons8.com/?size=24&id=82788&format=png" /></button>

                    <button class="btn text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white font-bold">Adopt</button>

                    <button onclick="loadDetails('${
                      pet.petId
                    }')" class="btn text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white font-bold">Details</button>

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
  addBtnClass(categoryName);

  const petContainer = document.getElementById("pet-section");
  petContainer.innerHTML = "";

  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";

  setTimeout(() => {
    loadByCategory(categoryName);
  }, 2000);
};

// add and remove btn-style class
const addBtnClass = (name) => {
  // console.log(name);

  const categoryBtn = document.getElementsByClassName("category-btn");
  for (const btn of categoryBtn) {
    btn.classList.remove("btn-style");
  }

  document.getElementById(name).classList.add("btn-style");
};

// load details by petid
const loadDetails = async (petId) => {
  // console.log(petId);

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
    );
    const data = await res.json();
    showPetDetails(data.petData);

    my_modal_1.showModal();
  } catch (err) {
    console.log("data not found", err);
  }
};

// show pet details
const showPetDetails = (petData) => {
  const modalContainer = document.getElementById("modal-container");

  modalContainer.innerHTML = `
      <dialog id="my_modal_1" class="modal">
        <div class="modal-box p-8">

          <img class="w-full object-cover rounded-md" src="${petData.image}" />
          <h2 class="text-2xl font-bold my-5">${petData.pet_name}</h2>
          <div class="grid grid-cols-2 gap-2 pb-4 border-b border-b-gray-300">

                <div class="flex gap-2 items-center">
                    <img class="w-4 h-4" src="https://img.icons8.com/?size=80&id=i83wF07inDck&format=png" />
                    <p class="text-gray-400">
                        Breed : ${petData?.breed ? petData.breed : "Not found"}
                    </p>
                </div>

                <div class="flex gap-2 items-center">
                    <img class="w-4 h-4" src="https://img.icons8.com/?size=80&id=BCKAW92AuElD&format=png" />
                    <p class="text-gray-400">
                        Birth : ${
                          petData?.date_of_birth
                            ? petData.date_of_birth
                            : "Not found"
                        }
                    </p>
                </div>

                <div class="flex gap-2 items-center">
                    <img class="w-4 h-4" src="https://ouch-prod-var-cdn.icons8.com/hm/illustrations/thumbs/Qj8QBJD5dvULD0CM.webp" />
                    <p class="text-gray-400">
                        Gender : ${
                          petData?.gender ? petData.gender : "Not found"
                        }
                    </p>
                </div>

                <div class="flex gap-2 items-center">
                    <img class="w-4 h-4" src="https://img.icons8.com/?size=50&id=7165&format=png" />
                    <p class="text-gray-400">
                        Price : ${petData?.price ? petData.price : "not found"}
                    </p>
                </div>

                <div class="flex gap-2 items-center">
                    <img class="w-4 h-4" src="https://ouch-prod-var-cdn.icons8.com/hm/illustrations/thumbs/Qj8QBJD5dvULD0CM.webp" />
                    <p class="text-gray-400">
                        Vaccinated status : ${
                          petData?.vaccinated_status
                            ? petData.vaccinated_status
                            : "Not found"
                        }
                    </p>
                </div>

          </div>

          <h2 class="text-lg font-bold my-3">Details Information</h2>
          <p class="text-xs text-gray-400">${
            petData?.pet_details ? petData.pet_details : "Not found"
          }</p>

          <div class="modal-action w-full">
            <form class="w-full" method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn w-full bg-light-blue text-[#0E7A81]">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    `;
};

// like button function
const likeBtn = (image) => {
  // console.log(image);

  const likeContainer = document.getElementById('like-container');

  likeContainer.innerHTML += `
    <div class="h-[124px] w-[124px] p-3 border border-gray-300">
      <img class="h-full rounded-md object-cover" src="${image}" />
    </div>
  `;
};


// sort by price function
const loadSortByPrice = () => {
  // console.log('ht')

  fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => showSortByPrice(data.pets))
}

const showSortByPrice = pets => {
  console.log(pets);
  
  pets.sort((a, b) => b.price - a.price);

  showPets(pets)
}