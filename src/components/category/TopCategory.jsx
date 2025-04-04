import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Slider from "react-slick";
import { Box, Typography, Skeleton, MenuItem, Select, IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { API_FetchCategory, API_FetchCategorySubCategory } from "../../services/categoryServices";
import { useTheme } from "@mui/material/styles";

const TopCategory = (props) => {
  const [categoryLists, setCategoryLists] = useState([]);
  const [subcategories, setSubcategories] = useState([]); // State for subcategories
  const [selectedCategory, setSelectedCategory] = useState(null); // State for the selected category
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  // Fetch categories from API
  const FetchTopCategoryLists = async () => {
    try {
      const categoryList = await API_FetchCategory();
      setCategoryLists(categoryList);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setIsLoading(false);
    }
  };

  // Fetch subcategories for a specific category
  const FetchSubcategories = async (categoryId) => {
    try {
      const subcategoryList = await API_FetchCategorySubCategory(categoryId);
      setSubcategories(subcategoryList); // Update subcategories state
      setSelectedCategory(categoryId); // Set the selected category
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    FetchTopCategoryLists();
  }, []);

  // Handle category click (navigates to category page)
  const handleCategoryClick = (id, name) => {
    navigate(`/product-list?pcid=${btoa(id)}&pcname=${btoa(name)}`);
  };

  // Handle dropdown icon click (fetches subcategories)
  // const handleDropdownClick = (event, categoryId) => {
  //   event.stopPropagation(); 
  //   if (selectedCategory === categoryId) {
  //     setSelectedCategory(null);
  //   } else {
  //     FetchSubcategories(categoryId);
  //   }
  // };


  const handleDropdownHover = (categoryId) => {
    if (selectedCategory !== categoryId) {
      setSelectedCategory(categoryId); // Set the selected category
      FetchSubcategories(categoryId); // Fetch subcategories for the selected category
    }
  };

  const handleDropdownClick = (event, categoryId) => {
    event.stopPropagation(); // Prevent navigation when clicking the dropdown icon
    console.log("Dropdown clicked for category:", categoryId); // Debug log
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
      FetchSubcategories(categoryId); // Fetch subcategories for the selected category
    }
  };
  
  // Slider settings
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow:6,
    slidesToScroll: 1,
    autoplay: false,
    draggable: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Box sx={{ width: "100%", textAlign: "center", height: "0px"}}>
      <Slider {...sliderSettings}>
        {isLoading
          ? [...Array(5)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  px: 2,
                  textAlign: "center",
                }}
              >
                <Skeleton variant="circular" width={55} height={55} />
                <Skeleton variant="text" width={70} height={20} sx={{ mt: 0.5 }} />
              </Box>
            ))
          : categoryLists.map((category) => (
              <Box
                key={category.Id}
                sx={{
                 
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleCategoryClick(category.Id, category.Category)} 
              >
                <Box
                  sx={{
                    
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                    
                      backgroundColor: "transparent",
                      border:"none"
                    }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: "'Work Sans', sans-serif",
                      textTransform: "capitalize",
                      fontWeight: 800,
                      fontSize: "13px",
                      color: theme.palette.colorCode.main,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                   
                    }}
                  >
                    {category.Category}
                  </Typography>

                 
                  <IconButton
                   onMouseEnter={() => handleDropdownHover(category.Id)} // Show subcategories on hover
                   // Hide subcategories when hover ends
                  sx={{
                     color: "rgb(7, 98, 7)",
                      position: "relative",
                     bottom: "10px",
                     }}
>
  <ArrowDropDownIcon />
</IconButton>
                  </Box>
               
                  {selectedCategory === category.Id && (
  <Box
 
    sx={{
  
      backgroundColor: "#fff",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      zIndex: 10,
      position: "relative",
      padding: "8px 16px",
      minWidth: "190px",
    }}
    onMouseLeave={() => setSelectedCategory(null)}
  >
    {subcategories.map((subcategory) => (
      
      <MenuItem
        key={subcategory.Id}
        value={subcategory.Id}
        onClick={() =>
          navigate(
            `/product-list?pcid=${btoa(category.Id)}&pcname=${btoa(
              category.Category
            )}&pscid=${btoa(subcategory.Id)}&pscname=${btoa(
              subcategory.SubCategory
            )}`
          )
        }
      >
        {subcategory.SubCategory}
      </MenuItem>
    ))}
  </Box>
)}
                </Box>
              </Box>
            ))}
      </Slider>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    get_catgory_lists: state.get_catgory_lists,
  };
};
export default connect(mapStateToProps, null)(TopCategory);