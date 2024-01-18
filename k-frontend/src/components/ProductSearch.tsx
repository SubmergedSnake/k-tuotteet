import { Grid, Container, Box, Chip, AlertColor } from "@mui/material";
import { useEffect, useState } from "react";
import Form from "./Form";
import SearchResults from "./SearchResults";
import { Product, QueryFilters } from "../../../types/shared.types";
import ProductCard from "./ProductCard";
import { deleteProductByEan, searchDBForProducts } from "../api";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import EphemeralToast from "./EphemeralToast";


const ProductSearch = () => {

  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [deleteDialogIsOpen, toggleDeleteConfirmationDialog] = useState(false)
  const [toastMessage, setToastMessage] = useState<string>('')
  const [toastDuration, setToastDuration] = useState<number>(3000)
  const [toastOpen, setToastOpen] = useState<boolean>(false)

  const [toastColor, setToastColor] = useState<AlertColor>('success')

  const displayToast = (message: string) => {
    setToastMessage(message)
    setToastOpen(true)
  }

  const hideToast = () => {
    setToastOpen(false)
  }

  const deleteProduct = async (productToDelete: Product | null) => {
    if (!productToDelete) return false
    try {
      toggleDeleteConfirmationDialog(!deleteDialogIsOpen)
      await deleteProductByEan(productToDelete.ean)
      setProducts([...products].filter(product => product.ean !== productToDelete.ean))
      setSelectedProduct(null)
      setToastColor('success')
      displayToast(`Tuote ${productToDelete.name} (${productToDelete.ean}) poistettiin onnistuneesti.`)
    } catch (e) {
      setToastColor('error')
      displayToast(`Tuotteen ${productToDelete.name} (${productToDelete.ean}) poistaminen epäonnistui.`)
    }
  }

  const searchProducts = async (query: QueryFilters) => {
    const products = await searchDBForProducts(query)
    setProducts(products)
  }

  const toggleDeleteDialog = () => {
    toggleDeleteConfirmationDialog(!deleteDialogIsOpen)
  }


  return (
    <Container sx={{ py: 5, my: 2, boxShadow: 1, bgcolor: 'background.paper' }}>
      <EphemeralToast toastColor={toastColor} open={toastOpen} closeToast={hideToast} message={toastMessage} duration={toastDuration} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Form searchProducts={searchProducts} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductCard
            product={selectedProduct}
            toggleDeleteDialog={toggleDeleteDialog}
          />
        </Grid>
      </Grid>

      {products.length > 0 &&
        <>
          <Chip label={products.length} sx={{ mt: 2, bgcolor: 'secondary.main' }} title="Hakukriteereitä vastaavien tuotteiden lukumäärä" />
          <Box sx={{ mt: 2, border: 1, borderColor: 'secondary.light', borderRadius: 1, p: 2, height: '40vh', overflowY: 'scroll', position: 'relative' }}>
            <SearchResults products={products} setSelectedProduct={setSelectedProduct} />
          </Box>
        </>
      }

      <DeleteConfirmationDialog deleteProduct={deleteProduct} selectedProduct={selectedProduct} deleteDialogIsOpen={deleteDialogIsOpen} toggleDeleteDialog={toggleDeleteDialog} />
    </Container>

  )
}

export default ProductSearch
