const row = document.getElementById("row") 

//array que guarda amostra dos pokemons
let arrayIMG = [{}]

setTimeout(buscarDados, 3000)
function buscarDados(){
    for(let i = 1 ; i < 20; i++){
        const buscandoIMG = axios.get("https://pokeapi.co/api/v2/pokemon-form/" + i)
        buscandoIMG.then(criandoJSON)
    }
}

//criando um JSON passando os dados
function criandoJSON(resposta){ 
    arrayIMG.push({
        id: resposta.data.id,
        nome: resposta.data.name,
        img: resposta.data.sprites.front_default
    })  
    if(arrayIMG.length === 20){
        renderizarPokenon()
    }
}


//renderizando na row, um carrosel de um numero X de pokemons 
function renderizarPokenon(){
    row.innerHTML= ""
    for(let i=1;i < arrayIMG.length; i++){
        row.innerHTML += `
                <div class="col-sm-6 " onclick="pokemonClicado(${arrayIMG[i].id})">
                    <div class="card bordas">
                        <div class="cardd">
                        <img class="card-image card-image${i}" src="${arrayIMG[i].img}" alt=""> 
                        <h2 class="title">${arrayIMG[i].nome}</h2>
                        </div>
                    </div>
                </div>
               `
    }
}

    //acionando funcao com enter
    document.addEventListener('keypress', function(e){
       if(e.which == 13){
            passarValor()      
        }
    }, false);

//buscando pokemon sequencial do numero atual  
let numberPokemon = 1
function mostrarPokemon(){
    const pokemon = axios.get("https://pokeapi.co/api/v2/pokemon/"+ numberPokemon)
    pokemon.then(renderPokemon)
}

//buscando o valor digitado no input e chamar a funcao de renderizar pokemon passando o que foi escrito
const numeroEscolhido  = document.getElementById("buscarPokemon")
function passarValor(){
    
    pokemonClicado(numeroEscolhido.value)
}


//buscando e renderizando o pokemon clicado das amostras 
function pokemonClicado(ID){
    const pokemon = axios.get("https://pokeapi.co/api/v2/pokemon/"+ ID)
    pokemon.then(renderPokemon)
    numberPokemon = ID
}


//buscar e renderizar pokenon procurado pelo input
// 
// 
// 



// PEGAR para TROCAR nome, imagem e id do pokemon 
const pokemonImage = document.getElementById("pokemon")
const nomePokemon = document.querySelector(".namePokemon")
const IdPokemon = document.querySelector(".idPokemon")


//passando pro (pokemon), o OBJ  (DATA)  que veio do (then), passando todas informações de um pokemon expecifico
function renderPokemon(pokemon) {
    pokemonImage.src =  pokemon.data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    nomePokemon.innerHTML = pokemon.data.name
    IdPokemon.innerHTML = pokemon.data.id
};


//ADICIONA +1 NO NUMERO GLOBAL DO POKEMON AMOSTRA NA TELA
function pokemonAnterior(){
    if(numberPokemon > 1){
        numberPokemon--
    }
    mostrarPokemon();
}

function proximoPokemon(){
    numberPokemon++
    mostrarPokemon();
};

