import React, { useEffect, useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Grid, IconButton, Paper } from "@mui/material";
import { fetchStocks } from "../service/ApiConfig";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

interface Props {
  stock: (arg1: []) => void; // Define the type of your function prop
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  height: 30,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SearchBox: React.FC<Props> = ({ stock }) => {
  const [stocks, setStocks] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [selectdData, setSelectdData] = useState<[]>([]);
  const [data, setData] = useState<{}>({});

  useEffect(() => {
    fetchStocks()
      .then((res) => {
        setStocks(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const searchFilter = (searchValue: string) => {
    const filtered = stocks.filter((item: any) =>
      item?.symbol.toLowerCase().startsWith(searchValue.toLowerCase())
    );
    filtered
      .filter((item: any) => item.displaySymbol == searchValue)
      .forEach((element: any) => {
        setData(element);
      });
    setSelectdData(filtered);
  };

  const handleSubmit = () => {
    let array = [];
    array.push(data);
    if (filteredData.length < 3) {
      setFilteredData([...filteredData, ...array]);
    }
  };

  const removeStock = (stock: any) => {
    setFilteredData((prevTodos: any) =>
      prevTodos.filter((f: any) => stock.displaySymbol != f.displaySymbol)
    );
  };

  useEffect(() => {
    stock(filteredData);
  }, [filteredData]);

  return (
    <Box>
      <Grid columns={{ xs: 1, sm: 1, md: 1 }} sx={{ display: "flex" }}>
        <Grid columns={{ xs: 1, sm: 1, md: 1 }}>
          <Stack spacing={2} sx={{ width: 200, ml: 10 }}>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Autocomplete
                  id="free-solo-demo"
                  onChange={(event, newValue) => searchFilter(newValue || "")}
                  freeSolo
                  options={selectdData.map((option: any) => option.symbol)}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="Stocks"
                      sx={{ width: 150 }}
                      onChange={(e) => searchFilter(e.target.value)}
                    />
                  )}
                />
                {`${
                  filteredData.length >= 3
                    ? "You can select maximum 3 stocks"
                    : ""
                }`}
              </Box>
              <Box>
                <IconButton
                  onClick={handleSubmit}
                  aria-label="add"
                  sx={{ mt: 1 }}
                >
                  <AddCircleOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
          </Stack>
        </Grid>
        <Grid sx={{ display: "flex" }}>
          {filteredData.map((d: any, i: Number) => {
            return (
              <Grid
                item
                xs={2}
                sx={{ display: "flex", ml: 0.5, mt: 1 }}
                sm={4}
                md={4}
                key={`test-${i}`}
              >
                <Item aria-label="stock">
                  {d.displaySymbol}
                  <IconButton
                    onClick={() => removeStock(d)}
                    disabled={filteredData >= 3 ? true : false}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBox;
