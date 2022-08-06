const pokemonImage = document.querySelector(".pokemon__image");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let searchPokemonId = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
};

const renderPokemon = async (pokemon) => {
    pokemonNumber.innerHTML = "";
    pokemonName.innerHTML = "Loading ...";

    const data = await fetchPokemon(pokemon);

    if (!data) {
        pokemonImage.style.display = "none";
        pokemonName.innerHTML = "Not Found :C";
    }

    searchPokemonId = data.id;

    pokemonImage.style.display = "block";
    pokemonImage.src =
        data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
            "front_default"
        ];

    pokemonNumber.innerHTML = `${data.id} -`;
    pokemonName.innerHTML = data.name;
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    input.value = "";
});

btnPrev.addEventListener("click", () => {
    if (searchPokemonId > 1) {
        searchPokemonId--;
        renderPokemon(searchPokemonId);
    }
});

btnNext.addEventListener("click", () => {
    searchPokemonId++;
    renderPokemon(searchPokemonId);
});

renderPokemon(searchPokemonId);
