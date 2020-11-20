const apikey='1f6091b9694f5fd0faad141515ed0f90';
const url='https://api.themoviedb.org/3/search/movie?api_key=1f6091b9694f5fd0faad141515ed0f90';
const img_url='https://image.tmdb.org/t/p/w500';

const inputElement=document.getElementById("headsearch");
const buttonElement=document.getElementById("submit");

const movieSearchable=document.querySelector('.movie-searchable');
const imgElement=document.querySelector('#searchimage');




function generateUrl(path){
    const url= `https://api.themoviedb.org/3${path}?api_key=${apikey}` ;
    return url;
}

// function submit(){
buttonElement.onclick=function(event){
    event.preventDefault();
    const value=inputElement.value;
    const path='/search/movie';
    const newUrl=generateUrl(path) + '&query=' +value;
    // const newUrl= url + '&query=' + value;
    fetch(newUrl)
        .then((res) => res.json())
        
        .then(rendersearch)
        .catch((error)=>{
            console.log('Error :',error);
        })
        inputElement.value='';
    console.log(value);
}
// buttonElement.onclick=submit();
function rendersearch(data){
    movieSearchable.innerHTML='';
    var movies=data.results;
    
    
    const movieBlock=createMovieContainer(movies);       
    movieSearchable.appendChild(movieBlock);  
    console.log('Data:', data);
}
function createMovieContainer(movies){
    const movieElement=document.createElement('div');
    movieElement.setAttribute('class','movie');
    const movieTemplate=
    `
    <section class="section">
        ${movieSection(movies)}
        
    </section>
    <div class="content">
        <p id="content-close">X</p>
    </div>
    `;
    movieElement.innerHTML=movieTemplate;
    return movieElement;
}

function movieSection(movies){
    return movies.map((movie) => {
        if(movie.poster_path && movie.vote_average>=6.0){
            return `
            <img id="searchimage" src=${img_url + movie.poster_path} data-movie-id={movie.id}/>
             `;
        }
    })
}
document.onclick=function(event){
    const target=event.target;
    
    if(target.id === 'searchimage' ){
        console.log("image-description");
        
        const movieId='475557';
        console.log("MovieID : ",movieId);
        
        
        console.log("Event : ", event);
        const section=event.target.parentElement;
        const content=section.nextElementSibling;
        content.classList.add('content-display');     

        const path=`/movie/${movieId}/videos`;
        const url=generateUrl(path);

        fetch(url)
            .then((res)=>res.json())
            .then((data)=>createVideoContainer(data,content))
            .catch((error)=>{
                console.log('Errors : ',error);
            })
    }
    if(target.id === 'content-close'){
        const content=target.parentElement;
        content.classList.remove('content-display');
    }

}
function createIframe(video){
    const iframe=document.createElement('iframe');
    iframe.src=`https://www.youtube.com/embed/${video.key}`;
    iframe.width=360;
    iframe.height=315;
    iframe.allowFullscreen=true;
    return iframe;
}
function createVideoContainer(data,content){
    content.innerHTML='<p id="content-close">X</p>';
    console.log('Videos : ',data);
        const videos=data.results;
        const length=videos.length> 4 ? 4: videos.length;
        const iframeContainer=document.createElement('div');

        for(let i=0; i<length; i++){
            const video=videos[i];
            const iframe=createIframe(video);
            iframeContainer.appendChild(iframe);
            content.appendChild(iframeContainer);

        }
}
                //Toprated
const topratedElement=document.getElementById("topratedmovie");
const topratedcontent=document.querySelector('.toprated-content');

topratedElement.onclick=function(event){
    event.preventDefault();
    const path='/movie/top_rated';
    const url=generateUrl(path);
    fetch(url)
            .then((res)=>res.json())
            .then(rendertoprated)
            .catch((error)=>{
                console.log('Errors : ',error);
            })
}
function rendertoprated(data){
    var toprate=data.results;
    const toprateBlock=createTopRate(toprate);       
    topratedcontent.appendChild(toprateBlock);  
    console.log('Data:', data);
}
function createTopRate(toprate){
    const toprateElement=document.createElement('div');
    toprateElement.setAttribute('class','toprate');
    const toprateTemplate=
    `
    <section class="section">
        ${toprateSection(toprate)}
        
    </section>
    
    `;
    toprateElement.innerHTML=toprateTemplate;
    return toprateElement;
}

function toprateSection(toprate){
    return toprate.map((toprate) => {
        if(toprate.poster_path && toprate.vote_average>=6.0){
            return `
            <div id="topratedfetch">                
                <img id="toprate" src=${img_url + toprate.poster_path} data-movie-id={toprate.id}/><br/>
                <p id="topratedtitle">Title :${toprate.original_title}</p><br/>
                <p id="topratedrelease">Release Date : ${toprate.release_date}</p>
            </div>
             `;
        }
    })
}
                //Upcoming Movies

const upcomingElement=document.getElementById("upcomingmovies");
const upcomingcontent=document.querySelector('.upcomingmovies-content');
                
upcomingElement.onclick=function(event){
    event.preventDefault();
    const path='/movie/upcoming';
    const url=generateUrl(path);
    fetch(url)
            .then((res)=>res.json())
            .then(renderUpcome)
            .catch((error)=>{
                console.log('Errors : ',error);
            })
}
function renderUpcome(data){
    var upcome=data.results;
    const upcomeBlock=createUpcomeMovies(upcome);
    upcomingcontent.appendChild(upcomeBlock);
    console.log("Upcome Movies : ",data)

}
function createUpcomeMovies(upcome){
    const upcomeElement=document.createElement('div');
    upcomeElement.setAttribute('class','upcome');
    const upcomeTemplate=
    `
    <section class="section">
        ${upcomeSection(upcome)}
        
    </section>
    
    `;
    upcomeElement.innerHTML=upcomeTemplate;
    return upcomeElement;

}
function upcomeSection(upcome){
    return upcome.map((upcome) => {
        if(upcome.poster_path && upcome.vote_average>=6.0 ){
            return `
            <div id="upcomefetch">                
                <img id="upcomeimg" src=${img_url + upcome.poster_path} data-movie-id={upcome.id}/><br/>
                <p id="upcometitle">Title :${upcome.original_title}</p><br/>
                <p id="upcomerelease">Release Date : ${upcome.release_date}</p>
            </div>
             `;
        }
    })
}
            //Now Playing

const nowplayElement=document.getElementById("nowplay");
const nowplaycontent=document.querySelector('.nowplay-content');

nowplayElement.onclick=function(event){
    event.preventDefault();
    const path='/movie/now_playing';
    const url=generateUrl(path);
    fetch(url)
    .then((res)=>res.json())
    .then(rendernowplay)
    .catch((error)=>{
        console.log('Errors : ',error);
    })
}
function rendernowplay(data){
    var nowplay=data.results;
    const nowplayBlock=createNowplayVideos(nowplay);
    nowplaycontent.appendChild(nowplayBlock);
    console.log("Upcome Movies : ",data)
}
function createNowplayVideos(nowplay){
    const nowplayElement=document.createElement('div');
    nowplayElement.setAttribute('class','nowplayvideo');
    const nowplayTemplate=
    `
    <section class="section">
        ${nowplaySection(nowplay)}
        
    </section>
    
    `;
    nowplayElement.innerHTML=nowplayTemplate;
    return nowplayElement;
}
function nowplaySection(nowplay){
    return nowplay.map((nowplay) => {
        if(nowplay.poster_path && nowplay.vote_average>=6.5 ){
            return `
            <div id="nowplayfetch">                
                <img id="nowplayimg" src=${img_url + nowplay.poster_path} data-movie-id={nowplay.id}/><br/>
                <p id="nowplaytitle">Title :${nowplay.original_title}</p><br/>
                <p id="nowplayrelease">Release Date : ${nowplay.release_date}</p>
            </div>
             `;
        }
    })
}
            //PopularMovies
const popularElement=document.getElementById("popularmovie");
const popularcontent=document.querySelector('.popular-topic');

popularElement.onclick=function(event){
    event.preventDefault();
    const path='/movie/popular';
    const url=generateUrl(path);
    fetch(url)
    .then((res)=>res.json())
    .then(renderpopular)
    .catch((error)=>{
        console.log('Errors : ',error);
    })

}
function renderpopular(data){
    var popular=data.results;
    const popularBlock=createPopularvideo(popular);
    popularcontent.appendChild(popularBlock);
    console.log("Popular Movies data : ",data)
}
function createPopularvideo(popular){
    const popularElement=document.createElement('div');
    popularElement.setAttribute('class','popularvideo');
    const popularTemplate=
    `
    <section class="section">
        ${popularSection(popular)}
        
    </section>
    
    `;
    popularElement.innerHTML=popularTemplate;
    return popularElement;
}
function popularSection(popular){
    return popular.map((popular) => {
        if(popular.poster_path && popular.vote_average>=6.8){
            return `
            <div id="popularfetch">                
                <img id="popularimg" src=${img_url + popular.poster_path} data-movie-id={popular.id}/><br/>
                <p id="populartitle">Title :${popular.original_title}</p><br/>
                <p id="popularrelease">Release Date : ${popular.release_date}</p>
            </div>
             `;
        }
    })
}const apikey='1f6091b9694f5fd0faad141515ed0f90';
const url='https://api.themoviedb.org/3/search/movie?api_key=1f6091b9694f5fd0faad141515ed0f90';
const img_url='https://image.tmdb.org/t/p/w500';

const inputElement=document.getElementById("headsearch");
const buttonElement=document.getElementById("submit");

const movieSearchable=document.querySelector('.movie-searchable');
const imgElement=document.querySelector('#searchimage');




function generateUrl(path){
    const url= `https://api.themoviedb.org/3${path}?api_key=${apikey}` ;
    return url;
}

// function submit(){
buttonElement.onclick=function(event){
    event.preventDefault();
    const value=inputElement.value;
    const path='/search/movie';
    const newUrl=generateUrl(path) + '&query=' +value;
    // const newUrl= url + '&query=' + value;
    fetch(newUrl)
        .then((res) => res.json())
        
        .then(rendersearch)
        .catch((error)=>{
            console.log('Error :',error);
        })
        inputElement.value='';
    console.log(value);
}
// buttonElement.onclick=submit();
function rendersearch(data){
    movieSearchable.innerHTML='';
    var movies=data.results;
    
    
    const movieBlock=createMovieContainer(movies);       
    movieSearchable.appendChild(movieBlock);  
    console.log('Data:', data);
}
function createMovieContainer(movies){
    const movieElement=document.createElement('div');
    movieElement.setAttribute('class','movie');
    const movieTemplate=
    `
    <section class="section">
        ${movieSection(movies)}
        
    </section>
    <div class="content">
        <p id="content-close">X</p>
    </div>
    `;
    movieElement.innerHTML=movieTemplate;
    return movieElement;
}

function movieSection(movies){
    return movies.map((movie) => {
        if(movie.poster_path && movie.vote_average>=6.0){
            return `
            <img id="searchimage" src=${img_url + movie.poster_path} data-movie-id={movie.id}/>
             `;
        }
    })
}
document.onclick=function(event){
    const target=event.target;
    
    if(target.id === 'searchimage' ){
        console.log("image-description");
        
        const movieId='475557';
        console.log("MovieID : ",movieId);
        
        
        console.log("Event : ", event);
        const section=event.target.parentElement;
        const content=section.nextElementSibling;
        content.classList.add('content-display');     

        const path=`/movie/${movieId}/videos`;
        const url=generateUrl(path);

        fetch(url)
            .then((res)=>res.json())
            .then((data)=>createVideoContainer(data,content))
            .catch((error)=>{
                console.log('Errors : ',error);
            })
    }
    if(target.id === 'content-close'){
        const content=target.parentElement;
        content.classList.remove('content-display');
    }

}
function createIframe(video){
    const iframe=document.createElement('iframe');
    iframe.src=`https://www.youtube.com/embed/${video.key}`;
    iframe.width=360;
    iframe.height=315;
    iframe.allowFullscreen=true;
    return iframe;
}
function createVideoContainer(data,content){
    content.innerHTML='<p id="content-close">X</p>';
    console.log('Videos : ',data);
        const videos=data.results;
        const length=videos.length> 4 ? 4: videos.length;
        const iframeContainer=document.createElement('div');

        for(let i=0; i<length; i++){
            const video=videos[i];
            const iframe=createIframe(video);
            iframeContainer.appendChild(iframe);
            content.appendChild(iframeContainer);

        }
}
                //Toprated
const topratedElement=document.getElementById("topratedmovie");
const topratedcontent=document.querySelector('.toprated-content');

topratedElement.onclick=function(event){
    event.preventDefault();
    const path='/movie/top_rated';
    const url=generateUrl(path);
    fetch(url)
            .then((res)=>res.json())
            .then(rendertoprated)
            .catch((error)=>{
                console.log('Errors : ',error);
            })
}
function rendertoprated(data){
    var toprate=data.results;
    const toprateBlock=createTopRate(toprate);       
    topratedcontent.appendChild(toprateBlock);  
    console.log('Data:', data);
}
function createTopRate(toprate){
    const toprateElement=document.createElement('div');
    toprateElement.setAttribute('class','toprate');
    const toprateTemplate=
    `
    <section class="section">
        ${toprateSection(toprate)}
        
    </section>
    
    `;
    toprateElement.innerHTML=toprateTemplate;
    return toprateElement;
}

function toprateSection(toprate){
    return toprate.map((toprate) => {
        if(toprate.poster_path && toprate.vote_average>=6.0){
            return `
            <div id="topratedfetch">                
                <img id="toprate" src=${img_url + toprate.poster_path} data-movie-id={toprate.id}/><br/>
                <p id="topratedtitle">Title :${toprate.original_title}</p><br/>
                <p id="topratedrelease">Release Date : ${toprate.release_date}</p>
            </div>
             `;
        }
    })
}
                //Upcoming Movies

const upcomingElement=document.getElementById("upcomingmovies");
const upcomingcontent=document.querySelector('.upcomingmovies-content');
                
upcomingElement.onclick=function(event){
    event.preventDefault();
    const path='/movie/upcoming';
    const url=generateUrl(path);
    fetch(url)
            .then((res)=>res.json())
            .then(renderUpcome)
            .catch((error)=>{
                console.log('Errors : ',error);
            })
}
function renderUpcome(data){
    var upcome=data.results;
    const upcomeBlock=createUpcomeMovies(upcome);
    upcomingcontent.appendChild(upcomeBlock);
    console.log("Upcome Movies : ",data)

}
function createUpcomeMovies(upcome){
    const upcomeElement=document.createElement('div');
    upcomeElement.setAttribute('class','upcome');
    const upcomeTemplate=
    `
    <section class="section">
        ${upcomeSection(upcome)}
        
    </section>
    
    `;
    upcomeElement.innerHTML=upcomeTemplate;
    return upcomeElement;

}
function upcomeSection(upcome){
    return upcome.map((upcome) => {
        if(upcome.poster_path && upcome.vote_average>=6.0 ){
            return `
            <div id="upcomefetch">                
                <img id="upcomeimg" src=${img_url + upcome.poster_path} data-movie-id={upcome.id}/><br/>
                <p id="upcometitle">Title :${upcome.original_title}</p><br/>
                <p id="upcomerelease">Release Date : ${upcome.release_date}</p>
            </div>
             `;
        }
    })
}
            //Now Playing

const nowplayElement=document.getElementById("nowplay");
const nowplaycontent=document.querySelector('.nowplay-content');

nowplayElement.onclick=function(event){
    event.preventDefault();
    const path='/movie/now_playing';
    const url=generateUrl(path);
    fetch(url)
    .then((res)=>res.json())
    .then(rendernowplay)
    .catch((error)=>{
        console.log('Errors : ',error);
    })
}
function rendernowplay(data){
    var nowplay=data.results;
    const nowplayBlock=createNowplayVideos(nowplay);
    nowplaycontent.appendChild(nowplayBlock);
    console.log("Upcome Movies : ",data)
}
function createNowplayVideos(nowplay){
    const nowplayElement=document.createElement('div');
    nowplayElement.setAttribute('class','nowplayvideo');
    const nowplayTemplate=
    `
    <section class="section">
        ${nowplaySection(nowplay)}
        
    </section>
    
    `;
    nowplayElement.innerHTML=nowplayTemplate;
    return nowplayElement;
}
function nowplaySection(nowplay){
    return nowplay.map((nowplay) => {
        if(nowplay.poster_path && nowplay.vote_average>=6.5 ){
            return `
            <div id="nowplayfetch">                
                <img id="nowplayimg" src=${img_url + nowplay.poster_path} data-movie-id={nowplay.id}/><br/>
                <p id="nowplaytitle">Title :${nowplay.original_title}</p><br/>
                <p id="nowplayrelease">Release Date : ${nowplay.release_date}</p>
            </div>
             `;
        }
    })
}
            //PopularMovies
const popularElement=document.getElementById("popularmovie");
const popularcontent=document.querySelector('.popular-topic');

popularElement.onclick=function(event){
    event.preventDefault();
    const path='/movie/popular';
    const url=generateUrl(path);
    fetch(url)
    .then((res)=>res.json())
    .then(renderpopular)
    .catch((error)=>{
        console.log('Errors : ',error);
    })

}
function renderpopular(data){
    var popular=data.results;
    const popularBlock=createPopularvideo(popular);
    popularcontent.appendChild(popularBlock);
    console.log("Popular Movies data : ",data)
}
function createPopularvideo(popular){
    const popularElement=document.createElement('div');
    popularElement.setAttribute('class','popularvideo');
    const popularTemplate=
    `
    <section class="section">
        ${popularSection(popular)}
        
    </section>
    
    `;
    popularElement.innerHTML=popularTemplate;
    return popularElement;
}
function popularSection(popular){
    return popular.map((popular) => {
        if(popular.poster_path && popular.vote_average>=6.8){
            return `
            <div id="popularfetch">                
                <img id="popularimg" src=${img_url + popular.poster_path} data-movie-id={popular.id}/><br/>
                <p id="populartitle">Title :${popular.original_title}</p><br/>
                <p id="popularrelease">Release Date : ${popular.release_date}</p>
            </div>
             `;
        }
    })
}