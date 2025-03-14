const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json()).then(data => displaycategory(data.categories));
}
const displaycategory = (category) => {
    const categoryContainer = document.getElementById('categoryContainer');
    for (let cat of category) {

        let div = document.createElement('div');


        div.innerHTML = `
     <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn  bg-[rgba(37, 37, 37, 0.15)] text-[#252525] hover:bg-[#FF1F3D] hover:text-white ">${cat.category}</button>
    `

        categoryContainer.appendChild(div)
    }

}
const removeActiveClass = () => {
    const activebtns = document.getElementsByClassName('active');
    for (let activebtn of activebtns) {
        activebtn.classList.remove('active')
    }
}

const loadVideos = (searchText = '') => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos?title=' + searchText)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const allbtn = document.getElementById('btn-all');
            allbtn.classList.add('active')
            displayVideos(data.videos)
        });
}

// load videos by categories
const loadCategoryVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const clickedBtn = document.getElementById(`btn-${id}`);
            clickedBtn.classList.add('active');

            displayVideos(data.category)
        })
}


const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videosContainer');
    videosContainer.innerHTML = '';
    for (let video of videos) {

        let div = document.createElement('div');
        div.innerHTML = `
         <div class="card  shadow-sm">
            <figure class="relative">
                <img class="w-[375px] h-[200px] object-cover" src="${video.thumbnail}" alt="videos" />
                <span class="bg-black text-slate-50 px-2 rounded-lg text-sm absolute bottom-2 right-2 ">3hrs 56 min ago</span>
            </figure>
            <div class="mt-5 flex gap-3">

                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-[35px] h-[35px] rounded-full ring ring-offset-2">
                        <img class="object-cover" src="${video.authors[0].profile_picture}" />
                    </div>
                </div>
                <div class="">
                    <h3 class="font-semibold">${video.title}</h3>
                    <div class="flex gap-2">
                        <p class=" text-slate-500">${video.authors[0].profile_name}</p> 
                        ${video.authors[0].verified === true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="">` : ``} 
                    </div>
                   
                    <p class="text-slate-500">${video.others.views}</p>
                </div>
            </div>
        </div>
        
        
        `
        videosContainer.appendChild(div)
    }
}
document.getElementById("search").addEventListener('keyup', (e) => {
    let searchText = e.target.value;
    loadVideos(searchText);
})
loadVideos()
loadCategory();