
const homesection = document.querySelector("#Home");
const navbar = document.querySelector(".navbar");

const observer = new IntersectionObserver(
    (entries)=>{
        const ent = entries[0];
        ent.isIntersecting === false
        ? navbar.classList.add("sticky")
        : navbar.classList.remove("sticky");
    },{
    root:null,
    rootMargin:"-250px",
    threshold:"",   
});
observer.observe(homesection);



let typed = new Typed(".auto-type",{
    strings:["I'm Developer","I'm Designer","I'm Software Engineer"],
    typeSpeed:30,
    delaySpeed : 50,
    backSpeed:30,
    loop:true 
})  


let hamb = document.querySelector(".hamburger-menu");
let navv = document.querySelector(".navbar");
function doStuff(){
    landscape = window.orientation? window.orientation=='landscape' : true;

    if(landscape && window.innerWidth<900 && window.innerWidth > 0){
        hamb.classList.remove("block")
        navv.classList.add("block")
    }
    else{
        hamb.classList.add("block")
        navv.classList.remove("block")
    }
}
window.onload=window.onresize=doStuff;
if(window.onorientationchange){
    window.onorientationchange=doStuff;
}




// let progessbar = document.querySelectorAll(".progress-value")
// let progessPr = document.querySelectorAll(".pr").value;

// console.log(progessPr)


// document.querySelector('#contact-form').addEventListener('submit', (e) => {
//   e.preventDefault();
//   e.target.elements.name.value = '';
//   e.target.elements.email.value = '';
//   e.target.elements.message.value = '';
// });
