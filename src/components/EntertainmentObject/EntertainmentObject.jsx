import {IMG_300,unavailable} from "../../constants/constants"
import "./EntertainmentObject.css";

const  EntertainmentObject = ({itemObject,type}) =>{

  const getType = ()=>{
    if(type === undefined){
      if(itemObject.media_type === "tv"){
        return  "TV Series" 
      }  
      else if(itemObject.media_type === "movie"){
        return "Movie"
      }      
    }
    else {
      return type
    }
  }

  const getTitle = () =>{
    if(itemObject.media_type === "tv"){
      return itemObject.title
    }
    else if(itemObject.media_type === "movie" || itemObject.media_type === "person" ){
      return itemObject.name
    }
  }

  const getProfilePicture = () =>{
    if(itemObject.media_type === "person" && itemObject.profile_path !== null){
      return `${IMG_300}${itemObject.profile_path}`
    }
    else if(itemObject.poster_path !== null){
      return `${IMG_300}${itemObject.poster_path}`
    }
    else {
      return unavailable
    }
  }

  return (
      <div key={itemObject.id} className="media">
      <img
        className="poster"
        src={getProfilePicture()}
        alt={itemObject.title}
      />
      <b className="title">{getTitle()}</b>
      <span className="subTitle" >
        {getType()}
        <span className="subTitle">{itemObject.media_type === "tv" ? itemObject.first_air_date :itemObject.release_date}</span>
      </span>
      <span className="rating" >
      {itemObject.vote_average}
      </span>
      </div>
  );  
}


export default EntertainmentObject;

