import React from "react";
import { Search } from "@mui/icons-material";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

const DataGridCustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <FlexBetween>
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>

        <TextField
          label="Search.."
          sx={{ mb: "0.5rem", width: "15rem" }}
          // onChange={(e)=>setSearchInput(e.target.value)}
          //value={searchInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => {}}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;