import React, { useState, useEffect } from "react";
import { Card, Box, Typography, Skeleton } from "@mui/material";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { ImagePathRoutes } from "../../routes/ImagePathRoutes";
import { API_FetchCategory } from "../../services/categoryServices"; // Replace with your actual API service

const ExploreCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const categoryList = await API_FetchCategory(); // Replace with your actual API call
      setCategories(categoryList);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setIsLoading(false);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle category click
  const handleCategoryClick = (id, name) => {
    navigate(`/product-list?pcid=${btoa(id)}&pcname=${btoa(name)}`);
  };

  // Slider settings
  const sliderSettings = {
    dots: false, // Remove navigation dots
    infinite: true, // Infinite scrolling
    speed: 500, // Transition speed
    slidesToShow: 6, // Number of cards to show at once
    slidesToScroll: 1, // Number of cards to scroll at a time
    autoplay: false, // Enable auto-play
    autoplaySpeed: 2000, // Auto-play speed in milliseconds
    responsive: [
      {
        breakpoint: 1024, // For tablets and smaller screens
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // For mobile screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // For very small screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ width: "100%", py: 4, textAlign: "center" }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Inter, sans-serif",
          fontStyle: "normal",
          fontWeight: 700,
          color: "rgb(26, 32, 44)",
          fontSize: "44px",
          lineHeight: "48px",
          mb: 6, // Add more space below the heading
          textTransform: "uppercase", // Make the text uppercase
          letterSpacing: "2px",
          
            mb: 10, // Add margin bottom for spacing
        }}
      >
        Explore Our Categories
      </Typography>
      <Box sx={{ width: "100%", height: "auto" }}>
        <Slider {...sliderSettings}>
          {isLoading
            ? [...Array(5)].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    px: 2, // Add padding between slides
                  }}
                >
                  <Skeleton variant="rectangular" width="100%" height={250} />
                  <Skeleton variant="text" width="100%" height={40} sx={{ mt: 1 }} />
                </Box>
              ))
            : categories.map((category) => (
                <Box
                  key={category.Id}
                  sx={{
                    px: 2, // Add padding between slides
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCategoryClick(category.Id, category.Category)}
                >
                  {/* Full Image */}
                  <Card
                    sx={{
                      width: "100%",
                      height: 250, // Increased height for the card
                      overflow: "hidden",
                      boxShadow: "none", // Remove card shadow
                      backgroundColor: "transparent", // Transparent background for PNG images
                    }}
                  >
                    <img
                      src={ImagePathRoutes.CategoryImagePath + category.ImagePath} // Use placeholder if no image
                      alt={category.Category}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        backgroundColor: "white", // Add a white background for PNG transparency
                      }}
                    />
                  </Card>
                  {/* Category Name */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "#00523b",
                      mt: 0, // Remove margin to eliminate space
                      py: 1,
                      borderBottomLeftRadius: "10px", // Add border radius to the bottom-left corner
                      borderBottomRightRadius: "10px", // Add border radius to the bottom-right corner
                    }}
                  >
                    {category.Category}
                  </Typography>
                </Box>
              ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default ExploreCategories;