export default function scroll(){
    const d = document
    const $check = d.getElementById("check")
    const $menu = d.querySelector(".icon-menu")
    const $ul = d.querySelector(".ul")

    console.log($check)
    console.log($menu)

    d.addEventListener("click",e=>{
        if(e.target === $check || e.target === $menu){
            $ul.classList.toggle("mover")
        }

        if(e.target.matches(".header__link") || e.target.matches(".logo")){
            $ul.classList.remove("mover")
        }

    })
}