import logo from './logo.svg';
import './css/App.css';
import Row from './components/Row';
import {requests } from './requests'
import Banner from './components/Banner';

function App() {
  return (
    <div className="App">
      <Banner/>
      <Row isLargeRow title='NETFLIX ORIGINALS' fetchUrl={requests.fetchTrending}/>
      <Row title='Trending Now' fetchUrl={requests.fetchTrending}/>
      <Row title='Top Rated' fetchUrl={requests.fetchTopRated}/>
      <Row title='Popular' fetchUrl={requests.fetchPopular}/>
      <Row title='Action Movies' fetchUrl={requests.fetchActionMovies}/>





      
    </div>
  );
}

export default App;
