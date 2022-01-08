import React,{useState,useEffect} from 'react'
import axios from '../axios'
import '../css/Row.css';

const baseUrl='https://image.tmdb.org/t/p/original/'

function Row({title,fetchUrl,isLargeRow}) {
    const [movies, setMovies] = useState([])

    useEffect(() => {
       async function fetchData(){
           const res=await axios.get(fetchUrl)
           setMovies(res.data.results)
        // console.log(res.data.results)
       }
       fetchData();


    }, [fetchUrl])


    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row_posters'>
                {movies.map((movie,id)=>(
                   <img className='row_poster' src= {`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path }`} alt={movie.name} key={id}/>
                ))}
            </div>
        </div>
    )
}

export default Row
