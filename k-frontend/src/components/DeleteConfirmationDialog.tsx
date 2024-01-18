import { Delete } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Product } from "../../../types/shared.types";

export interface DeleteConfirmationDialogProps {
  deleteDialogIsOpen: boolean;
  toggleDeleteDialog: () => void,
  selectedProduct: Product | null,
  deleteProduct: (product: Product | null) => void
}

const DeleteConfirmationDialog = (props: DeleteConfirmationDialogProps) => {

  const { deleteDialogIsOpen, toggleDeleteDialog, selectedProduct, deleteProduct } = props;

  return (
    <Dialog open={deleteDialogIsOpen} onClose={toggleDeleteDialog}>
      <DialogTitle>Haluatko varmasti poistaa tuotteen {selectedProduct?.name}?</DialogTitle>
      <DialogContent>
        <Button
          size="small"
          sx={{ my: 2, fontSize: '.5em' }}
          variant="contained"
          color="error"
          data-testid="product-card-delete-button"
          title="Poista"
          onClick={() => deleteProduct(selectedProduct)}
        >
          <strong>Poista</strong>
        </Button>
      </DialogContent>
    </Dialog>
  )

}

export default DeleteConfirmationDialog
