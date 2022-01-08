import Reac,{useState,useEffect} from 'react'
import axios from '../axios'
import { requests } from '../requests'
import '../css/Banner.css'

function truncateString(str, num) {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }
function Banner() {
    const [movie, setMovie] = useState()

    useEffect(()=>{
        async function fetchData(){
            const res=await axios.get(requests.fetchActionMovies)
            setMovie(
                res.data.results[
                    Math.floor(Math.random()*(res.data.results.length-1))
                ]
            );
            console.log(res.data.results[
                Math.floor(Math.random()*(res.data.results.length-1))
            ])
            return res;
        }
        fetchData();

    },[])
        // console.log(movie)
    
    return (
        <div className='banner'
        style={{backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`}}
        >
           <div className='banner__contents'>
            
            <h1>
            {movie?.title}
            </h1>
            <div className="banner__buttons">
                <button className="banner__button">Play</button>
                <button className="banner__button">My List</button>
            </div>
            
            <div className='description'>
                {truncateString(movie?.overview,150)}
            </div>
           </div>
            <div className="banner__buttom"></div>
        </div>
    )
}

export default Banner
