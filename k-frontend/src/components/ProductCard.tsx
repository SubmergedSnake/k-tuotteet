import { Box, Button, Card, CardContent, CardHeader, Icon, Typography } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { Product } from "../../../types/shared.types"
import { Delete } from '@mui/icons-material'

interface ProductCardProps {
  product: Product | null,
  toggleDeleteDialog: Dispatch<SetStateAction<any>>
}

const ProductCard = ({ product, toggleDeleteDialog }: ProductCardProps) => {

  const content = product ?
    <Box>
      <Typography data-testid="product-card-name" variant="overline">{product.name}</Typography>
      <Typography data-testid="product-card-brand">{product.brand}</Typography>
      <Typography data-testid="product-card-price">{product.price}</Typography>
      <Typography data-testid="product-card-category">{product.category}</Typography>
      <Typography data-testid="product-card-ean">{product.ean}</Typography>
    </Box>
    : null
  return (
    content && <Card sx={{ position: 'relative', bgcolor: 'secondary.light', height: '100%' }}>
      <CardHeader>
        {product?.name || ''}
      </CardHeader>
      <CardContent>
        {content}
        <Button
          size="small"
          sx={{ position: 'absolute', bottom: 0, right: 0, fontSize: '.5em', my: 1, mx: 1 }}
          variant="contained"
          color="error"
          data-testid="product-card-delete-button"
          onClick={toggleDeleteDialog}
        >
          <Delete />
        </Button>
      </CardContent>
    </Card >
  )

}

export default ProductCard
