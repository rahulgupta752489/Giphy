
let APIKEY = '2hUKsbsQdyACT0ak9HGWqasW2GY8KTXO';

//ARRAY FUNCTION

const main = async () => {
    try {
    let response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=25&rating=g`);

    let data = await response.json();
    // console.log('data:', data.data);
    append(data.data);
    }
    catch(error) {
        console.log('error:', error);
    }
};

main();

const append = async (data) => {
    data.forEach((e) => {
        let gif = document.getElementById('gif');
        let img = document.createElement('img');
        img.src = e.images.downsized.url;
        // console.log(e.id);
        img.addEventListener('click', () =>{
            detail_gif(e.id);
        })
        gif.append(img)
    })
}

const detail_gif = (id) => {
localStorage.setItem('details', JSON.stringify(id));
window.location.href = '/gif_details.html';
}

// Random gif

const random = async () => {
    let gif = document.getElementById('gif');
    gif.innerHTML = null;

    try {
    let response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${APIKEY}&tag=&rating=g`);
    let data = await response.json();
    console.log(data);

    let img = document.createElement('img');
    img.src = data.data.images.downsized.url;
    img.addEventListener('click', () => {
        detail_gif(data.data.id);
    });
    gif.append(img);


    }
    catch(error) {
        console.log(error);
    }
}

// categories function.
// api.giphy.com/v1/gifs/categories

const categories = async () => {
    let gif = document.getElementById('gif');
    gif.innerHTML = null;

    let sorting = document.getElementById('sorting')
    sorting.innerHTML = null;

    try {
        let res = await fetch(`https://api.giphy.com/v1/gifs/categories?api_key=${APIKEY}`);
        let result = await res.json();

        localStorage.setItem('categories', JSON.stringify(result.data))

        // when i clicked on categories 2 sort buttons should be appear.
        let sorting_Z_A = document.createElement('button');
        sorting_Z_A.innerText = 'SORT Z-A';
        sorting_Z_A.style.height = "45px";
        sorting.append(sorting_Z_A);

        let sorting_A_Z = document.createElement('button');
        sorting_A_Z.innerText = 'SORT A-Z';
        sorting_A_Z.style.height = "45px";
        sorting.append(sorting_A_Z);

        let dum;
        sorting_A_Z.onclick = () => {
            sorting_cat(dum = false);
        }
        sorting_Z_A.onclick = () => {
            sorting_cat(dum = true);
        }

        console.log(result);

        result.data.forEach((e) => {
            let name = document.createElement('p');
            name.innerHTML = e.name;
            // console.log(name);
            let image = document.createElement('img');
            image.src = e.gif.images.downsized.url;
            image.addEventListener('click', () => {
                detail_gif(e.gif.id);
            });
        gif.append(name, image);
        });
    }
    catch(error){
        console.log(error);
    }
}

//writting functions for sorting...
const sorting_cat = (dum) => {
    let data = JSON.parse(localStorage.getItem('categories'));

    // it will only work when dum is true.
    if(dum == true) {
        data = data.reverse();
    }
    // the below code will run every time when we click on sorting_cat.
    let gif = document.getElementById('gif');
    gif.innerHTML = null;

    data.forEach((e => {
        let name = document.createElement('p');
        name.innerHTML = e.name;
        // console.log(name);
        let image = document.createElement('img');
        image.src = e.gif.images.downsized.url;
        image.addEventListener('click', () => {
            detail_gif(e.gif.id);
        });
    gif.append(name, image);
}))
}



const gif = async () => {
    try {
        let gif = document.getElementById('gif');
        gif.innerHTML = null;

        let query = document.getElementById('search').value;
        if(query == '') {
            alert('Please type something');
            window.location.reload();
        }
        let res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${query}&limit=25&offset=0&rating=g&lang=en`);
        let data = await res.json();
        console.log('data:', data.data);
        data.data.forEach((e) => {
            let name = document.createElement('p');
            name.innerHTML = e.title;
            // console.log(name);
            let image = document.createElement('img');
            image.src = e.images.downsized.url;

            image.addEventListener('click', () => {
                detail_gif(e.id);
            });
            gif.append(name, image);
        });
    } catch (e) {
        console.log(e);
    }
};

const translates = async () => {
    try {
        let gif = document.getElementById('gif');
        gif.innerHTML = null;

        let query = document.getElementById('search').value;
        if(query == '') {
            alert('Please provide your input');
            window.location.reload();
        }

        let res = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${APIKEY}&s=${query}&limit=25&offset=0&rating=g&lang=en`);
    
    let data = await res.json();
    console.log(data);
   
        let name = document.createElement('p')
        name.innerHTML = data.data.title;
        // console.log(name);
        let image = document.createElement('img')
        image.src = data.data.images.downsized.url;

        image.addEventListener('click', () => {
            detail_gif(data.data.id);
        });
        gif.append(name, image);
    
}
catch(e) {
    console.log(e);
}
};

let logo = document.getElementById('pic');
logo.addEventListener('click', function() {
    window.location.href = "index.html";
})
