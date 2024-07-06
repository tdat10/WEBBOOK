import { Box, Container, Grid, Stack } from '@mui/material';
import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Banner2 = () => {

   const banners = [
        "https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-6/449707730_1970576150046017_798158277834370667_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=1Gg-oxpjU_sQ7kNvgG0kE8h&_nc_ht=scontent.fsgn16-1.fna&gid=ABTO69bBijHChwPhkQCHS3v&oh=00_AYAI8qj6P6UjzGPebRo8cFhps9xzQLLxGFSqP1AUi-S3tA&oe=668C33BF", 
        "https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-6/449786427_1970764620027170_357012355749517187_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=5Q2ThAsdosMQ7kNvgGPyb4k&_nc_ht=scontent.fsgn16-1.fna&oh=00_AYDJUUaO5ZC-GmM7LTkoQWkqZYbaYA2JP79bEtLCOX-bmg&oe=668C8487",
    ]

    
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
    
      const images = [
        "https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2024/SieeuSale_Week2_T524_Banner_SmallBanner_310x210.jpg",
        "https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2024/NgoaiVan_SmallBannerT5_310x210_4_1.jpg",
        "https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2024/VPPSiT424_Small_310x210PNG.jpg",
        "https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2024/TanVietT524_BannerSmallBanner_310x210.jpg",
      ]

  return (
    <Container maxWidth="lg">
        <Grid container mt={10} height={320}>
            <Grid item md={8}>
                <Carousel
                    showDots={true}
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {banners.map((banner) => (
                        <Box key={banner} height="100%" width="100%" overflow="hidden" style={{ borderRadius: '8px', padding: ' 10px 10px 10px 0px', margin: '5px 5px 5px 0px' }}>
                            <img src={banner} alt="Banner" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
                        </Box>
                    ))}
                </Carousel>
            </Grid>
            <Grid item md={4}>
                <Box display="flex" flexDirection="column">
                    <Box  overflow="hidden" style={{ borderRadius: '8px', padding: '5px', margin: '5px 0 0 5px' }}>
                        <img src="https://scontent-hkg1-2.xx.fbcdn.net/v/t39.30808-6/449790746_1970769740026658_4250279890036080843_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=eZIVZRcW9oYQ7kNvgEUTdQL&_nc_ht=scontent-hkg1-2.xx&oh=00_AYDW9Y1BWQOTeOspMXOJG0hIFWtyPFeOlaGybeu4BfzjwQ&oe=668C9003" alt="Image 1" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                    </Box>
                    <Box  overflow="hidden" style={{ borderRadius: '8px', padding: '5px', marginLeft: '5px' }}>
                        <img src="https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-6/449846599_1970795353357430_6750572404923223340_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=bZpayCC2_OoQ7kNvgGhExw0&_nc_ht=scontent.fsgn16-1.fna&oh=00_AYDY9IYsOFPExqqKL2wWpR2KQnSFdeXrUNrIjVi0L3mViA&oe=668C9F73" alt="Image 2" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </Container>
  );
}

export default Banner2;
