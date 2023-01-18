import { useState, useEffect } from "react";
import axios from "axios";
import EntertainmentObject from "../EntertainmentObject/EntertainmentObject"
import MuiPagination from "../Pagination/MuiPagination"
import "./LatestTrending.css";
import {ClipLoader} from "react-spinners"
import Select from 'react-select'
import ReactDOM from "react-dom";



function Trending() {
    const [loading,setLoading] = useState(false)
    const [allData, setAllData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [typeFilter,setTypeFilter] =  useState({ value: 'all', label: 'Movies And TV-Series' })
    const [timeFilter,setTimeFilter] =  useState({ value: 'day', label: 'Day' })


    useEffect(()=>{
        console.log(currentPage)
        const fetchTrendingData = async()=>{
          setLoading(true)
          let url = `https://api.themoviedb.org/3/trending/${typeFilter.value}/${timeFilter.value}?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
          let result  = await axios.get(url)
          setAllData(result.data.results)
          setTotalPages(result.data.total_pages)
          setLoading(false)
        }
        fetchTrendingData()
    },[currentPage,typeFilter,timeFilter])

    


    const colourStyles = {
      control: styles => ({ ...styles, backgroundColor: '#004346', width : '300px' }),
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

    const typeFilterOptions = [
      { value: 'all', label: 'Movies And TV-Series' },
      { value: 'movie', label: 'Movies' },
      { value: 'tv', label: 'TV-Series' },
      { value: 'person', label: 'People' }
    ]

    const timeFilterOptions = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
    ]

    const handleTypeFilter = (value)=>{
      console.log(value)
      ReactDOM.unstable_batchedUpdates(()=>{
        setCurrentPage(1)
        setTypeFilter(value)
      })
    }

    const handleTimeFilter = (value)=>{
      console.log(value)
      setCurrentPage(1)
      setTimeFilter(value)      
    }


  return (
      <>
      <div style={{
            "display": "flex",
            "flex-direction": "row",
            "justifyContent" : "center",
            "gap" : "30px",
          }}>
          <div style={{
            "display": "flex",
            "flex-direction": "row",
            "justifyContent" : "center",
             "alignItems" : "center",
             "gap" : "20px",
          }}>
          <label 
          style={{
            "fontWeight": "300",
            "fontSize": "25px"}}
          >Filter By:</label>
          <Select
            options={typeFilterOptions}
            styles={colourStyles}  
            value={typeFilter}
            onChange={handleTypeFilter}
          />
          </div>
         {typeFilter.value !== "person" &&
          <div style={{
            "display": "flex",
            "flex-direction": "row",
            "justifyContent" : "center",
             "alignItems" : "center",
             "gap" : "20px",
          }}>
          <label 
          style={{
            "fontWeight": "300",
            "fontSize": "25px"}}
          >Time Range:</label>
          <Select
            options={timeFilterOptions}
            styles={colourStyles}  
            value={timeFilter}
            onChange={handleTimeFilter}
          />
          </div>}
      </div>
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
        <MuiPagination setPage={setCurrentPage} numOfPages={totalPages} currentPage={currentPage} />
      )}
      </>
  );
}


export default Trending;

