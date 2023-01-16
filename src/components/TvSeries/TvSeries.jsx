import { useState, useEffect } from "react";
import axios from "axios";
import EntertainmentObject from "../EntertainmentObject/EntertainmentObject"
import "../LatestTrending/LatestTrending.css";
import MuiPagination from "../Pagination/MuiPagination"
import {ClipLoader} from "react-spinners"

function TvSeries({type,filterByGenre,filterByName}) {
    const [allData, setAllData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [loading,setLoading] = useState(false)
   
      useEffect(() => {
        const fetchSeries = async () => {
          setLoading(true)
          let url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}`
          if(filterByGenre !== ""){
            url =  url+`&with_genres=${filterByGenre}`
          }
          else if(filterByName !== ""){
            url = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language&language=en-US&query=${filterByName}&page=${currentPage}&include_adult=false`
          }
          const { data } = await axios.get(url);
          setAllData(data.results);
          setTotalPages(data.total_pages)
          setLoading(false)
        };
        fetchSeries();
      }, [filterByGenre,filterByName,currentPage]);


  return (
      <div
       className="latestTrending"
      >      
        {loading && 
          <div style={{
            "position": "absolute",
            "bottom": "300px",
            "zIndex" :"1"
          }}>
          <ClipLoader
              color="#36d7b7"
              size={200}           
            />
          </div>
        }  
          {allData !== undefined &&  allData.length !==0 && allData.map((item)=>{
              return <EntertainmentObject
                itemObject={item}
                type={type}
              />
          })}
          {totalPages > 1 && (
        <MuiPagination setPage={setCurrentPage} numOfPages={totalPages} />
      )}
      </div>
  );
}


export default TvSeries;

