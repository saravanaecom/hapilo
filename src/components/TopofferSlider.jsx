import React from "react";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

// Keyframes for infinite scrolling
const marqueeAnimation = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-40%); } /* Move only half to create seamless loop */
`;

const TopOfferSlider = () => {
  const offers = [
    "Big Discounts on Pens!",
    "Exclusive Deals on Notebooks!",
    "Free Shipping on Orders Over $50!",
    "New Arrivals: Premium Stationery!",
    "Limited Time Offer: Buy 2 Get 1 Free!",
    "bsdfhsbdfbsdhiufhsdfhsdsuisdiussf"
  ];

  return (
    <Box className="w-full h-14 overflow-hidden bg-[#00523b] py-2 relative">
      <Box
        className="flex whitespace-nowrap"
        sx={{
          display: "flex",
          animation: `${marqueeAnimation} 20s linear infinite`,
          width: "max-content", 
        }}
      >
       
        {[...offers, ...offers].map((offer, index) => (
          <Typography
          key={index}
          className="text-white px-4"
          sx={{ 
            minWidth: "250px", 
            fontSize: "16px", 
            fontWeight: "500", 
            textAlign: "center" 
          }}
        >
          {offer}
        </Typography>
        
        ))}
      </Box>
    </Box>
  );
};

export default TopOfferSlider;
