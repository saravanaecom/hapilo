import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { API_FetchBannerOfferPost } from '../../services/bannerOfferPostServices';
import { ImagePathRoutes } from '../../routes/ImagePathRoutes';
import { styled } from '@mui/material/styles';

// Styled component for the slider wrapper
const SliderWrapper = styled(Box)({
  '& .slick-dots': {
    bottom: 15,
    '& li button:before': {
      color: 'white',
      fontSize: 10,
    },
    '& li.slick-active button:before': {
      color: 'white',
    }
  }
});

// Styled component for the slide container
const SlideContainer = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
});

export default function BannerSlider() {
  const [bannerSliderLists, setBannerSliderLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const GetBannerSliderLists = async () => {
      try {
        const bannerList = await API_FetchBannerOfferPost();
        setBannerSliderLists(bannerList.filter((item) => item.istopoffer === 0));
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setIsLoading(false);
      }
    };
    GetBannerSliderLists();
  }, []);

  const settings = {
    dots: true,
    infinite: bannerSliderLists.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: bannerSliderLists.length > 1,
    autoplaySpeed: 1500,
    arrows: false,
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}> {/* Full-width container */}
      <SliderWrapper>
        <Slider {...settings}>
          {isLoading ? (
            [...Array(3)].map((_, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    height: { xs: 200, sm: 320, md: 800 },
                    width: "100%",
                    margin: '0 auto',
                    borderRadius: '16px',
                  }}
                />
              </Box>
            ))
          ) : (
            bannerSliderLists.map((item) => (
              <SlideContainer key={item.id}>
                <Box
                  component="img"
                  sx={{
                    height: { xs: 200, sm: 320, md: 640 },
                    width: "100%",
                    objectFit: 'cover',
                    
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.03)',
                    },
                  }}
                  src={ImagePathRoutes.BannerOfferPostImagePath + item.Imagepath}
                  alt={item.Imagepath}
                />
              </SlideContainer>
            ))
          )}
        </Slider>
      </SliderWrapper>
    </Box>
  );
}