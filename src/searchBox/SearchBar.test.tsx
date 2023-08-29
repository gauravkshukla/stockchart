import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBox from "./SearchBar";

describe("SearchBar Component", () => {
  it("renders without errors", () => {
    render(<SearchBox stock={() => {}} />);
    expect(screen.getByLabelText("add")).toBeInTheDocument();
    expect(screen.getByLabelText("Stocks")).toBeInTheDocument();
  });

  it("filters and selects data on input change", async () => {
    const mockStockFunction = jest.fn();

    const { container } = render(<SearchBox stock={mockStockFunction} />);

    const inputElement: any = await container.querySelector("input");

    fireEvent.change(inputElement, { target: { value: "AAPL" } });

    expect(mockStockFunction).toHaveBeenCalledWith([]);
  });

  it("adds selected data on add button click", async () => {
    const mockStockFunction = jest.fn();
    render(<SearchBox stock={mockStockFunction} />);

    const input = await screen.getByLabelText("Stocks");

    fireEvent.change(input, { target: { value: "AAPL" } });

    const originalFilteredData = ["BBC"];
    const setFilteredDataMock = jest.fn();

    jest
      .spyOn(React, "useState")
      .mockReturnValueOnce([originalFilteredData, setFilteredDataMock]);

    const addButton = screen.getByLabelText("add");
    fireEvent.click(addButton);

    const stock = await screen.getByLabelText("stock");

    expect(stock).toBeInTheDocument();
  });

  it("removes data on delete button click", async () => {
    const mockStockFunction = jest.fn();
    render(<SearchBox stock={mockStockFunction} />);

    const input = await screen.getByLabelText("Stocks");
    fireEvent.change(input, { target: { value: "AAPL" } });

    const addButton = await screen.getByLabelText("add");
    fireEvent.click(addButton);

    const deleteButton = await screen.getByLabelText("delete");
    fireEvent.click(deleteButton);

    expect(mockStockFunction).toHaveBeenCalledWith([]);
  });
});
