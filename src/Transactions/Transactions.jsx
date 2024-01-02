import React, { useState, useEffect } from "react";
import { getTransactions } from "../Home/services";
import jwtDecode from "jwt-decode";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card ,
  CardContent 
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  const getData = async () => {
    const token = localStorage.getItem("token");
    const { id } = jwtDecode(token);
    const response = await getTransactions(id);
    setTransactions(response);
    console.log("response", response);
  };
  const getDate = (date) => {
    const originalDate = new Date(date);

    // Format options for date
    const options = { day: "numeric", month: "short", year: "numeric" };

    // Create a new formatted date string
    return originalDate.toLocaleDateString("en-US", options);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {transactions.length > 0 ? (
        <>
        <Typography
            variant="h4"
            component="h4"
            align="center"
            sx={{ color: "darkgreen", marginBottom:"30px" }}
          >
            The Transaction Details
          </Typography>
          {transactions.map((product, index) => (
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Transaction {index + 1}
                  </Typography>
                  <Typography
                    sx={{ idth: "10%", flexShrink: 0, color: "text.secondary" }}
                  >
                    Total Amoun is equal {product.totalAmount}JOD at{" "}
                    {`  ${getDate(product.timestamp)}`}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="h6">Products Details</Typography>
                  {product.products.map((product) => (
                    <Card key={product.id} sx={{
                      marginBottom: '8px',
                      backgroundColor: '#f9f9f9', // Adjust the background color as needed
                      borderRadius: '8px',
                      padding: '8px'
                    }}>
                      <CardContent>
                        <Typography variant="subtitle1">
                          {product.name}
                        </Typography>
                        <Typography variant="body1">
                          Price: ${product.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </>
      ) : (
        <Typography variant="h6">No Transactions Found</Typography>
      )}
    </>
  );
}

export default Transactions;
