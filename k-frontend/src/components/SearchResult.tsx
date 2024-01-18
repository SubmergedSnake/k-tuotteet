import { Product } from '../../../types/shared.types'
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface SearchResultProps {
  product: Product,
  setSelectedProduct: Dispatch<SetStateAction<Product | null>>
}

const SearchResult = ({ product, setSelectedProduct }: SearchResultProps) => {

  const { name, brand } = product

  return (
    <Card
      onClick={() => setSelectedProduct(product)}
      sx={[
        {
          '&:hover': {
            backgroundColor: 'secondary.light',
          },
          'cursor': 'pointer',
          my: 1
        },
      ]
      }
    >
      <Typography paragraph>{name} {brand}</Typography>
    </Card >
  )
}

export default SearchResult
