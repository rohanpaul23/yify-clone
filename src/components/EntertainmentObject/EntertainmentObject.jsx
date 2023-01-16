import {IMG_300,unavailable} from "../../constants/constants"
import "./EntertainmentObject.css";

const  EntertainmentObject = ({itemObject,type}) =>{

  const getType = ()=>{
    if(type === undefined){
      return itemObject.media_type === "tv" ? "TV Series" : "Movie"
    }
    else {
      return type
    }
  }

  const getTitle = () =>{
    if(type === "Movie"){
      return itemObject.title
    }
    else if(type === "TV Series"){
      return itemObject.name
    }
  }

  return (
      <div key={itemObject.id} className="media">
      <img
        className="poster"
        src={itemObject.poster_path ? `${IMG_300}${itemObject.poster_path}` : unavailable}
        alt={itemObject.title}
      />
      <b className="title">{getTitle()}</b>
      <span className="subTitle" >
        {getType()}
        <span className="subTitle">{itemObject.release_date}</span>
      </span>
      <span className="rating" >
      {itemObject.vote_average}
      </span>
      </div>
  );  
}


export default EntertainmentObject;

