let ufSelect = document.querySelector('select[name=state]')
let country = document.querySelector('select[name=country]')
let div = document.querySelector('div.res')

function populateUFs(){
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")    
        .then( res => res.json())
        .then( states =>{
            for( uf of states){
                ufSelect.innerHTML +=`<option value="${uf.sigla}">${uf.nome}</option>`
            }
        })

}

populateUFs()

function populateCountry(){
    fetch("countries.json")
       .then(res => res.json())
       .then(pais => {
           for(p of pais){
           country.innerHTML+=`<option>${p.country}</option>`
           }
       })
}

populateCountry()

function covidState(e){
    let state = document.querySelector('input[name=state]')
    
    state = e.target.value

    div.innerHTML=""
    
    fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${state}`)
        .then( res => res.json())
        .then( dados => { 
            div.innerHTML += `<p>🏥${dados.state}</p>`
            div.innerHTML += `<p>Casos confirmados:😷 ${dados.cases}</p>`
            div.innerHTML += `<p>Casos descartados: 😃 ${dados.refuses}</p>`
            div.innerHTML += `<p>Mortes: ☠️${dados.deaths}</p>`
            
        })
        .catch( error => div.innerHTML = `<p>${error}! Não foi possível buscar os dados.</p>`)
        
}

function covidCountry(e){
    let p = document.querySelector('input[name=country]')
    let div = document.getElementById('2')

    p = e.target.value
       
    div.innerHTML=""
 
   fetch(`https://covid19-brazil-api.now.sh/api/report/v1/${p}`)
        .then( res=>res.json())
        .then( dados => {
            
            div.innerHTML += `<p>🏥${dados.data.country}</p>`
            div.innerHTML += `<p>Casos confirmados: 😷 ${dados.data.confirmed}</p>`
            div.innerHTML += `<p>Casos recuperados:🤕 ${dados.data.recovered}</p>`
            div.innerHTML += `<p>Mortes:☠️ ${dados.data.deaths}</p>`
            
        })
        .catch( error => div.innerHTML = `<p>${error}! Não foi possível buscar os dados.</p>`)
}

ufSelect.addEventListener('change', covidState)
country.addEventListener('change', covidCountry)

