
export const fetchStocks = async () => {
  const response = await fetch(
    "https://finnhub.io/api/v1/stock/symbol?exchange=US&mic=XNYS&token=cjgukc9r01qh977esd6gcjgukc9r01qh977esd70"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch stocks");
  }
  return response.json();
};

export const fetchPriceList = async (stock: any) => {
  console.log("APIstocks : ", stock);

  const resultPromises = stock.map(async (endpoint: any) => {
    console.log("endpoint : ", endpoint.displaySymbol);

    const response = await fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${endpoint.displaySymbol}&resolution=1&from=1679476980&to=1679649780&token=cjk2ll9r01qorp967ot0cjk2ll9r01qorp967otg`
    );
    if (!response.ok) {
      // throw new Error(`Failed to fetch price data for ${stock.displaySymbol}`);
      console.log("error in fetching API");
      
    }
    const data = await response.json();
    data.name = `${endpoint?.displaySymbol}`;
    return data;
  });

  const results = await Promise.all(resultPromises);
  return results;
};
