import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import productStore from "@/Store/productStore";
// import { DeleteIcon, EditIcon, AddShoppingCartIcon } from "@mui/icons-material";

function CardView({ products, updateProducts, copyFullProducts, onAddCart }) {
  const handleUpdate = (productId) => {
    // Implement update logic
  };

  const handleDelete = (productId) => {
    // Implement delete logic
  };

  const handleAddToCart = (productId) => {
    // Implement add to cart logic
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {products.length ? (
        <>
          {products.map((product) => (
            <Card key={product.id} sx={{ maxWidth: 300, margin: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Stock Quantity: {product.stockQuantity}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "16px",
                  }}
                >
                  <Button
                    sx={{
                      color: "green",
                      textTransform: "capitalize",
                      borderColor: "#222656",
                    }}
                    variant="outlined"
                  >
                    <AddShoppingCartIcon /> Add to Cart
                  </Button>
                  <div>
                    <IconButton
                      sx={{ color: "#222656" }}
                      onClick={() => handleUpdate(product.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#f0564e" }}
                      onClick={() => handleDelete(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        <Typography variant="h6">No Results Found</Typography>
      )}
    </div>
  );
}

export default CardView;
