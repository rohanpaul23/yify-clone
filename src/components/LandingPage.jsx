import styled from "styled-components";
import TvIcon from "@material-ui/icons/Tv";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { useState } from "react";
import Trending from "./LatestTrending/LatestTrending";

function LandingPage() {

  const [currentSelected, setCurrentSelected] = useState("Trending")

  const handleSearch = (e)=>{
    console.log(e)
  }

  const getCurrentList = ()=>{
    if(currentSelected === "Trending"){
      return <Trending/>
    }
  }

  return (
      <Container>
        <h1 className="header">Container Box</h1>
        <div className="content">
          <input 
          className="searchBox"
          type="search"
          placeholder="Type to search"
          onChange={(e)=>handleSearch(e)}
          />
          <div className="listContainer">
            <div className="movieList">
              {getCurrentList()}
            </div>
          </div>
        </div>
        <div className="outerDiv">
        <ul className="navBar">
          <li className="listItem"><WhatshotIcon />Trending</li>
          <li className="listItem"><MovieIcon />Movies</li>
          <li className="listItem"><TvIcon />Tv Series</li>
          <li className="listItem"><SearchIcon />Search</li>
        </ul> 
        </div>
      </Container>
  );
}

const Container = styled.div`
      background : #004346;
      height : 100vh;
      width : 100vw;
      display : flex;
      flex-direction : column;
      justify-content : center;
      align-items: center;
      .header{
        color : #f1e8dc;
        
      }
      .content{
        background : black;
        width : 75%;
        height : 80%;
        display : flex;
        flex-direction : column;
        border: 3px solid;
        border-color: #f1e8dc;
        .searchBox {
          background : #b3dfb3;
          height : 30px;
          border-color: blanchedalmond;
          color : #004346;
          font-weight : 600;
          font-size : 15px;
        }
      }
      .listContainer{
        background : white;
        display : flex;
        flex-direction : column;
        flex: 1;
        .movieList{
          flex : 1;
        }
      }
      .outerDiv {
        width : 100%;
        height : 5%;
        background: #f1e8dc;     
        display: flex;
        justify-content: center;
      }
      .navBar{
          height : 100%;
          align-items : center;
          list-style-type: none;
          margin: 0;
          padding: 0;
          overflow: hidden;
          width : 50%;
          display : flex;
          flex-direction : row;
          background: #f1e8dc;
          justify-content: inherit;
          gap: 25px;
         color: #004346;
         .listItem{
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width : 100px;
          height : 30px;
         }
         .listItem:hover{
          background : #004346;
          color : #f1e8dc;
         }
      }
      
`;

export default LandingPage;

