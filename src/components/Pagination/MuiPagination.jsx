import React from 'react'
import Pagination from "@material-ui/lab/Pagination";


const MuiPagination = ({ setPage, numOfPages = 10,currentPage }) => {

  const handlePageChange = (page) => {
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
