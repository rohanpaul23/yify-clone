import { useState, useEffect } from "react";
import axios from "axios";
import EntertainmentObject from "../EntertainmentObject/EntertainmentObject"
import MuiPagination from "../Pagination/MuiPagination"
import "./LatestTrending.css";
import {ClipLoader} from "react-spinners"



function Trending() {
    const [loading,setLoading] = useState(false)
    const [allData, setAllData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    useEffect(()=>{
        const fetchTrendingData = async()=>{
          setLoading(true)
          let url = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
          let result  = await axios.get(url)
          setAllData(result.data.results)
          setTotalPages(result.data.total_pages)
          setLoading(false)
        }
        fetchTrendingData()
    },[currentPage])


  return (
      <>
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
              />
          })}
      </div>
      {totalPages > 1 && (
        <MuiPagination setPage={setCurrentPage} numOfPages={totalPages} />
      )}
      </>
  );
}


export default Trending;

