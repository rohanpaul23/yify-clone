import React from 'react'
import "./Home.css";
import { RiInstagramFill,RiTwitterFill,RiFacebookBoxFill,RiYoutubeFill} from "react-icons/ri";

const Home = () => {
    return (
        <div
        style={{
            color : "#f1e8dc",
            display:"flex",
            flexDirection : "column",
            justifyContent : "center",
            alignItems : "center",
            minHeight : "70vh",
            gap : "40px",
        }}
        >
        <div style={{
            fontWeight: "400",
            fontStyle: "normal",
            textDecoration: "none",
            fontSize: "70px",
        }}
        >YIFY is where you find all the content</div>
        <div style={{
            paddingLeft : "38px",
            fontWeight : "300"
        }}> 
          <p style={{
            paddingLeft : "38px",
        }}>We have a collection of latest,movies and tv-shows</p>
            <p>We have over 1000+ movies and tv-shows across all languages</p>  
          <p>YIFY provides support for filtering of content by name,genre etc</p></div>
          <div 
          style={{
            position:"fixed",
            bottom:0,
            width:"100%",
            height:"60px",   
            display:"flex",
            flexDirection :"row",
            justifyContent : "center",
            gap : "30px",
            background: "#004346",
            paddingTop : "25px",
          }}
          >
          <div>
            <a style={{
                color: "#f1e8dc"
            }}href="https://www.instagram.com/yify" target="_blank" rel="noopener noreferrer"> <RiInstagramFill size={40}/></a>
          </div>
          <div>
            <a style={{
                color: "#f1e8dc"
            }} href="https://www.twitter.com/yify" target="_blank" rel="noopener noreferrer"> <RiTwitterFill size={40}/></a>
          </div>
          <div>
            <a style={{
                color: "#f1e8dc"
            }} href="https://www.facebook.com/yify" target="_blank" rel="noopener noreferrer"> <RiFacebookBoxFill size={40}/></a>
          </div>
          <div>
            <a style={{
                color: "#f1e8dc"
            }} href="https://www.youtube.com/yify" target="_blank" rel="noopener noreferrer"> <RiYoutubeFill size={40}/></a>
          </div>
        </div>
    </div>
    )
}

export default Home
