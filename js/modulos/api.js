import { api, hash } from "./api-key.js"

export default function buscador(){
    const d = document
    const $form = d.getElementById("form")
    const $result = d.getElementById("nombre")
    const $buscador = d.getElementById("buscador")
    const $oval = d.querySelector(".oval")
    const $tar = d.querySelector(".tar")

    $form.addEventListener("submit", async e=>{
        e.preventDefault()

        let nombre = $result.value
        let url = `http://gateway.marvel.com/v1/public/characters?ts=1&name=${nombre}&apikey=${api}&hash=${hash}`

        if(nombre){

            try {

                $oval.innerHTML = `<img src=../../assets/oval.svg></img>`

                let res = await fetch(url)
                let json = await res.json()
                let API = json.data.results

                //verficar si el personaje que se buscó existe
                if(API.length === 0){
                    alert("Este personaje no existe")
                    $oval.innerHTML = ""
                } else{

                    //verificar si existe elemento en el dom
                    const $bTarjeta = !!d.getElementById("tarjeta")

                    if($bTarjeta === true){
                        const $tarjeta = d.getElementById("tarjeta")
                        $tar.removeChild($tarjeta)
                        relleno(json,API,$buscador,$oval)

                    } else{
                        relleno(json,API,$buscador,$oval)
                    }
                }

                if(!res.ok) throw {status:res.status, statusText: res.statusText}
 
            } catch (error) {
                console.log(error)                
            }
            
        } else{
            alert("Ingrese un personaje")
        }     
    })
}

const relleno = (json,API,$buscador,$oval) => {
    const d = document
    const $template = d.getElementById("show-template").content
    const $fragment = d.createDocumentFragment()
    const $tar = d.querySelector(".tar")
    

    let nameP = json.data.results[0].name //nombre del personaje
    let descripcion = json.data.results[0].description //descripcion del personaje
    let path = API[0].thumbnail.path //url de la imagen
    let extension = API[0].thumbnail.extension //extension 'JPG,PNG...'
    let image = `${path}/portrait_fantastic.${extension}`
    let url = API[0].urls[1].url

    $template.querySelector("img").src = image
    $template.querySelector("h4").textContent = nameP
    $template.querySelector("p").textContent = descripcion || 'Sin descripción'
    $template.querySelector("a").href = url
    $template.querySelector("small").textContent = 'Data provided by Marvel. © 2014 Marvel'

    let clone = d.importNode($template,true)
    $fragment.appendChild(clone)
                    
    $tar.appendChild($fragment)

    $oval.innerHTML = ""
}
