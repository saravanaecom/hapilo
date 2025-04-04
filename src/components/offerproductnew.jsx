import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Skeleton, Typography } from '@mui/material';
import { API_FetchOfferFastMovingProduct } from '../services/productListServices';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import ProductCardNew from '../components/ProductCradNewdesign';

const OfferFastMovingProduct = (props) => {
  const theme = useTheme();
  const [productLists, setProductLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const GetOfferProductLists = async () => {
    try {
      const objLists = await API_FetchOfferFastMovingProduct();
      const sortedProducts = objLists.sort((a, b) => a.SaleRate - b.SaleRate);
      setProductLists(sortedProducts);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetOfferProductLists();
  }, []);

  // Return null if there are no products or not enough products to display
  if (!loading && (!productLists || productLists.length < 1)) {
    return null;
  }

  return (
    <Container maxWidth="xl" sx={{ pt: 4, mt:8, pb: 1, p: { xs: 0, sm: 0, lg: 3 } }}>
      <Box sx={{ margin: 'auto' }}>
        {loading ? (
          <Skeleton variant="text" height={40} width="30%" />
        ) : (
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontStyle: 'normal',
              fontWeight: 700,
              color: 'rgb(26, 32, 44)',
              fontSize: '44px',
              lineHeight: '24px',
              lineHeight: '48px',
              textAlign: 'center', // Center the heading
              marginBottom: '74px', // Add spacing below the heading
            }}
          >
           Our Best Sellers
          </Typography>
        )}

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {loading
            ? Array.from(new Array(8)).map((_, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Skeleton variant="rectangular" width="100%" height={250} />
                  <Skeleton variant="text" height={20} width="80%" sx={{ mt: 2 }} />
                  <Skeleton variant="text" height={20} width="60%" sx={{ mt: 1 }} />
                  <Skeleton variant="text" height={30} width="40%" sx={{ mt: 1 }} />
                  <Skeleton variant="rectangular" height={40} width="100%" sx={{ mt: 2 }} />
                </Grid>
              ))
            : productLists.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <ProductCardNew get_fav_lists={props.get_fav_lists} product={product} />
                </Grid>
              ))}
        </Grid>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    get_fav_lists: state.get_fav_lists, // Get favourite lists from Redux state (Wishlists)
  };
};

export default connect(mapStateToProps, null)(OfferFastMovingProduct);