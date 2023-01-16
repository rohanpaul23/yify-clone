import styled from "styled-components";
import HomeIcon from '@material-ui/icons/Home';
import TvIcon from "@material-ui/icons/Tv";
import MovieIcon from "@material-ui/icons/Movie";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import LatestTrending from "./components/LatestTrending/LatestTrending";
import Movies from "./components/Movies/Movies";
import { useState } from "react";
import TvSeries from "./components/TvSeries/TvSeries";
import Select from 'react-select'
import { useEffect } from "react"
import axios from "axios";
import Home from "./components/Home/Home"

function App() {
  const [currentSelected, setCurrentSelected] = useState("Home")
  const [filterByGenre, setFilterByGenre] = useState("")
  const [filterByName, setFilterByName] = useState("")
  const [filterType, setFilterType] = useState("")
  const [filter,setFilter] = useState({
    "value": "Filter By Name", "label": "Filter By Name"
  })
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  

  useEffect(()=>{
    if(selectedGenres.length !==0){
      const genreIds = selectedGenres.map((g) => g.id);
      genreIds.reduce((acc, curr) => acc + "," + curr);
      setFilterByGenre(genreIds)  
      return  
    }
    else {
      setFilterByGenre("")
    }
    setFilterByName(debouncedSearchTerm)  
  },[selectedGenres,debouncedSearchTerm])
 

  useEffect(() => {
    const fetchGenres = async () => {
      let allGenres = []
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${filterType}/list?api_key=8b723e57de9b5e273ed45ad0cf28ad3f&language=en-US`
      );
      data.genres.forEach((item)=>{
        let keyValue = {
          label : "",
          value : "",
          id : ""
        }
        keyValue.label = item.name
        keyValue.value = item.name
        keyValue.id = item.id
        allGenres.push(keyValue)
      })
      setAllGenres(allGenres)
    };
    fetchGenres()
  }, [filterType]);
    
  const filterOptions = [
    { value: 'Filter By Genre', label: 'Filter By Genre' },
    { value: 'Filter By Name', label: 'Filter By Name' }
  ]
  

  const getCurrentList = ()=>{
    if(currentSelected === "Trending"){
      return <LatestTrending/>
    }
    else if(currentSelected === "Movies"){
      return <Movies type={"Movie"} filterByGenre={filterByGenre} filterByName={filterByName}/>
    }
    else if(currentSelected === "Tv Series"){
      return <TvSeries type={"TV Series"}  filterByGenre={filterByGenre}  filterByName={filterByName}/>
    }
    else{
      return <Home/>
    }
  }
  
  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: '#004346' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor:  '#004346',
        color: '#f1e8dc',
        
      }
    },
    singleValue: (styles) => ({
      ...styles,
      color: '#f1e8dc',
    })

  };

  const handleSelect = (event) =>{
    setSelectedGenres(event)
  }

  const handleSelectFilter = (event) =>{
    if(event.value === "Filter By Genre"){
      setFilterByName("")
      setSearchTerm("")
    }
    else if(event.value === "Filter By Name"){
      setFilterByGenre("")
    } 
    setFilter(event)
  }

  const handleTabChange = (tabType)=>{
    setCurrentSelected(tabType)
    if(tabType === "Movies"){
      setFilterType("movie")
    }
    else if(tabType === "Tv Series"){
      setFilterType("tv")
    }
    setSelectedGenres([])
    setFilterByGenre("")
    setSearchTerm("")
  }
 

  return (
    <>
      <Container>
        <span className="header">
          Yify 
        </span>
        <ul className="ulItem">
        <li className={`listItem ${currentSelected === "Home" && "active"}`}  onClick={()=>handleTabChange("Home")}><HomeIcon />Home</li>
          <li className={`listItem ${currentSelected === "Trending" && "active"}`} onClick={()=>handleTabChange("Trending")} ><WhatshotIcon />Trending</li>
          <li className={`listItem ${currentSelected === "Movies" && "active"}`} onClick={()=>handleTabChange("Movies")}><MovieIcon />Movies</li>
          <li className={`listItem ${currentSelected === "Tv Series" && "active"}`} onClick={()=>handleTabChange("Tv Series")}><TvIcon />Tv Series</li>
        </ul>      
      </Container>
      <MainApp>
       { (currentSelected === "Movies" || currentSelected === "Tv Series") &&  
       <div className="searchcontainer">
          <div className="selectBox">      
          <Select  
            options={filterOptions}
            styles={colourStyles}  
            value={filter}
            onChange={handleSelectFilter}
            />   
          </div> 
          <div className="selectGenres">
            {
              filter !== undefined && filter.value === "Filter By Genre" ?  <Select  
                isMulti={true}
                options={allGenres}
                styles={colourStyles}  
                value={selectedGenres}
                onChange={handleSelect}
                placeholder={"Filter By Genre"}
                />
                : 
                <input
                  className="inputBox"
                  placeholder={filter.value === "Filter By Name" ? "Search by Name" : "Filter By Genre"}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
            } 
          </div>
        </div> }
        {getCurrentList()}
      </MainApp>
    </>
  );
}

// Hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

const Container = styled.div`
  width: 100%;
  cursor: pointer;
  position: fixed;
  display: flex;
  flex-direction : row;
  justify-content: space-between;
  text-transform: uppercase;
  background-color: #004346;
  z-index: 100;
  z-index: 100;
  box-shadow: 0px 1px 5px black;
.header {  
  font-family: "IBM Plex serif";
  font-size: 3vw;
  font-weight : bold;
  padding-bottom: 15px;  
  color: #f1e8dc;
  padding-left : 2rem;
}
.ulItem{
  align-items : center;
  list-style-type: none;
  margin: 0;
  padding-right: 2rem;
  overflow: hidden;
  display : flex;
  flex-direction : row;
  background: #004346;
  justify-content: center;
  gap: 15px;
 color: #f1e8dc;
 .listItem{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 35px;
  border-radius: 4px;
  width: 110px;
 }
 .listItem.active {
  background: #f1e8dc;
  color : #004346;
 }
 .listItem:hover{
  background : #f1e8dc;
  color : #004346 ;
 }
}

@media (max-width: 1000px) {
  .header {
    padding-top: 15px;
    font-size: 6.4vw;
  }
}
`;

const MainApp = styled.div`
  min-height: 100vh;
  background-color: #0b6d71;
  color: #fad6a7;
  padding-top: 130px;
  padding-bottom: 70px;
  overflow : hidden;
  .currentPagetitle{
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 50px;
    color : #f1e8dc;
  }
.searchcontainer{
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 70%;
  padding-left: 23rem;
  gap : 10px;
  .selectBox {
    flex : 0.25;
  }
  .selectGenres{
    flex: 0.5;
    .inputBox {
      width: 100%;
      height: 32px;
      borderRadius: 6px;
      background: #004346;
      color: #f1e8dc;
      border: 1px solid #f1e8dc;,   
    }
  }
  .searchBox {
    flex: 2;
    background: #004346;
    border: 2px solid;
    border-color: #f1e8dc;
    border-radius: 8px;
    color: #f1e8dc;
    font-size: larger;
  }
}

@media (max-width: 700px) {
    padding-top: 70px;
}
`;


export default App;

