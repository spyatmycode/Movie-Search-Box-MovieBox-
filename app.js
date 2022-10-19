const input = document.querySelector('input')
const form = document.querySelector('form')
const movieContainer = document.querySelector('main')

let movies = {

    ipayek: `c3382d8497f01a44aedc5fa5f9798796`,
    fetchMovie: function (input) {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.ipayek}&query=${input}`)
            .then(res => res.json())
            .then(function (data) {

                let results = []
                results = data.results
                movies.renderMovie(results)
            })
    },
    
    renderMovie: function (array) {

        movieContainer.innerHTML = array.map((movie) => {
            return `
            <div class="movie">
                <div class="top">
                        <div class="poster">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" style="color:white;" alt="Image not found" width="150px" height="200px" alt="">
                        </div>
                        <div class="information">
                                <h3>${movie.title}</h3>
                                <p>Date: ${movie.release_date} </p>
                                <p>Rating: ${movie.vote_average}</p>
                                <p>Vote Count:${movie.vote_count} </p>
                                <p>Language:${movie.original_language} </p>
                        </div>
                </div>
                
            <p class="details">${movie.overview}</p>
            
        </div>`
        })
        const movies = document.querySelectorAll('.movie')

        movies.forEach((movie)=>{
            movie.addEventListener('click',(o)=>{
                o.currentTarget.classList.toggle('show')
            })
        })

    }


}

form.addEventListener('submit', function (e) {
    e.preventDefault()
    movies.fetchMovie(input.value)
})

movies.fetchMovie("spiderman")

const hardmovies = document.querySelectorAll('.movie-title')


let count = 0;




let popularMovies = {
    apiKey: movies.ipayek,

    getMovies: async function () {
        let get = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`)

        let resolve = await get.json()
        let movieItems = []

        movieItems = resolve.results
        popularMovies.renderMovies(movieItems)
        const hardmovies = document.querySelectorAll('.movie-title')
    
    for (let i = 0; i < hardmovies.length; i++) {
    hardmovies[i].style.left = `${i * 100}%`
    }
    
       setInterval(popularMovies.movieCarousel, 6000);
    },

    renderMovies: function (movies) {
        const popular_movies_container = document.querySelector('.p-container')

        popular_movies_container.innerHTML = movies.map((movie) => {
            return `<div class="movie-title">
                <div class="image">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="">
                </div>

                <div class="about">
                    


                    <h2>
                    ${movie.title}
                    </h2>
                    <p>
                    ${movie.overview}
                    </p>
                    <br>
                    <p>
                        Ratings: ${movie.vote_average}/10
                    </p>
                    
                    <p>
                        Year: ${movie.release_date}
                    </p>
                </div>`
        }).join('')
    },

    movieCarousel: function() {
        const hardmovies = document.querySelectorAll('.movie-title')
                
           
            if (count > hardmovies.length - 1) {
                count = 0

                for (let i = 0; i < hardmovies.length; i++) {
                    hardmovies[i].style.left = `-${i * 100}%`
                    }

                    popularMovies.movieCarousel()
               
            
            }

            
    
            hardmovies[count].style.transform =`translateX(-${count * 100}%) `
    
            
            
            count++
    
           
    
    
       
    },






}

window.addEventListener('load',function (){
    popularMovies.getMovies()
})