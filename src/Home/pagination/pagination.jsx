import React from "react";
import Pagination from "@mui/material/Pagination";

function PaginationComponent({ page, pages ,changePage }) {

  // Handle page change
  const handleChange = (event, newPage) => {
    changePage(newPage)
  };

  return (
    <div>
      <Pagination count={pages} page={page} onChange={handleChange} shape="rounded" color="primary" />
    </div>
  );
}

export default PaginationComponent;
