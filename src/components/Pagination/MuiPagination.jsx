import React from 'react'
import Pagination from "@material-ui/lab/Pagination";
import { useEffect } from "react";


const MuiPagination = ({ setPage, numOfPages = 10,currentPage }) => {


  useEffect(() => {
    console.log(typeof currentPage)
  }, [currentPage])

     // Scroll to top when page changes
  const handlePageChange = (page) => {
    console.log(typeof page)
    setPage(Number(page));
    window.scroll(0, 0);
  };
    return (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          
            <Pagination
              onChange={(e) => handlePageChange(e.target.textContent)}
              count={numOfPages}
              color="primary"
              size="large"
              page={Number(currentPage)}
            />
        </div>
      );
}

export default MuiPagination
