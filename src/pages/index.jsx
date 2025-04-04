import { Container, IconButton } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Banner from "../components/banner/banner";
import BannerSlider from "../components/slider/BannerSlider";
import ImageCategorySlider from "../components/slider/ImageCategorySlider";
import OfferFastMovingProduct from "../components/slider/offerFastMovingProduct";
import ProductByIndexPage from '../components/slider/productByIndexPage';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CategoryCard from '../components/category/categoryhome';
import ProductBycategory from '../components/slider/ProductByCategory';
import TopOfferShow from '../components/TopOfferShow'
import ExploreCategories from '../components/category/ExploreCategories';
import Newofferproduct from '../components/offerproductnew';

const ScrollSection = ({ children }) => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <motion.div
            ref={sectionRef}
            style={{
                opacity,
                width: "100%",
            }}
        >
            {children}
        </motion.div>
    );
};

export default function HomePage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.pageYOffset > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <div>
                <Container
                   maxWidth="xl"
                
                >

                     
 
                <BannerSlider />
                 
                    <ScrollSection>
                        <ExploreCategories />
                    </ScrollSection>

                      
                    <ScrollSection>
                    
                    </ScrollSection>

                    <CategoryCard />
                    <ProductByIndexPage />
         
                    <ImageCategorySlider />
                  

                    {isVisible && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: "fixed",
                                bottom: "20px",
                                right: "20px",
                                zIndex: 1000,
                            }}
                        >
                            <IconButton
                                onClick={scrollToTop}
                                sx={{
                                    backgroundColor: "primary.main",
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor: "primary.dark",
                                    },
                                    width: 50,
                                    height: 50,
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <KeyboardArrowUpIcon />
                            </IconButton>
                        </motion.div>
                    )}

                
                </Container>
            </div>
        </>
    );
}
