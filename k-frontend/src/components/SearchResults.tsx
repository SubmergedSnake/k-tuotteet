import { Box } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { Product } from "../../../types/shared.types"
import SearchResult from "./SearchResult"

interface SearchResultProps {
  products: Product[],
  setSelectedProduct: Dispatch<SetStateAction<Product | null>>
}

const SearchResults = ({ products, setSelectedProduct }: SearchResultProps) => {

  return (
    <Box data-testid="searchResults">
      {products.length > 0 && products.map((product) =>
        <SearchResult
          key={`${product.category}-${product.ean}-${product.price}-${product.name}`}
          product={product}
          setSelectedProduct={setSelectedProduct}
        />)}
    </Box>
  )
}

export default SearchResults
