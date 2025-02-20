import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, IconButton, AppBar, Toolbar, Typography, ListItemIcon } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { styled } from "@mui/material/styles";

// Import Swiper for Image Animation
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";

// Import images for animation
import img1 from "../assets/Image4.jpg";
import img3 from "../assets/img.webp";
import img4 from "../assets/img2.jpg";
import img5 from "../assets/img4.jpg";
import img6 from "../assets/Salesforce.jpg";

const images = [img1, img6, img3, img4, img5];

const PdfViewer = () => {
  // List of PDF files
  const pdfFiles = [
    { name: "Design", file: "design.pdf" },
    { name: "SalesForce", file: "saleforce.pdf" }
  ];

  // State for selected PDF and sidebar visibility
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = (open) => {
    setSidebarOpen(open);
  };

  // Styled List Item for Hover Effect
  const StyledListItem = styled(ListItem)({
    transition: "background-color 0.3s ease, transform 0.2s",
    "&:hover": {
      backgroundColor: "rgba(8, 171, 237, 0.2)",
      color: "rgb(8, 171, 237)",
      transform: "scale(1.05)",
    },
  });

  return (
    <div className="pdf-container" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header with MUI AppBar */}
      <AppBar position="static" sx={{ background: "linear-gradient(135deg, rgb(8, 171, 237), rgb(255, 255, 255))" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => toggleSidebar(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PDF Viewer
          </Typography>
        </Toolbar>
      </AppBar>

      {/* MUI Drawer for Sidebar (Opens below the Header with Full Height) */}
      <Drawer
        anchor="top"
        open={sidebarOpen}
        onClose={() => toggleSidebar(false)}
        PaperProps={{
          style: {
            top: "64px", // Start below the header
            height: "calc(100vh - 64px)", // Takes full height below header
            width: "250px",
            left: 0,
            position: "absolute",
            overflowY: "auto",
            backgroundColor: "#e9edf5"
          }
        }}
      >
        <List>
          {pdfFiles.map((pdf, index) => (
            <StyledListItem
              button
              key={index}
              onClick={() => { setSelectedPdf(pdf.file); toggleSidebar(false); }}
              style={{ cursor: "pointer" }} // Hand cursor on hover
            >
              <ListItemIcon>
                <PictureAsPdfIcon style={{ color: "rgb(8, 171, 237)" }} />
              </ListItemIcon>
              <ListItemText primary={pdf.name} />
            </StyledListItem>
          ))}
        </List>
      </Drawer>


      {/* PDF Viewer or Smooth Image Animation */}
      <div style={{
        flex: 1,
        padding: 0,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
      }}>
        {selectedPdf ? (
          <iframe
            src={`${window.location.origin}/docs/${selectedPdf}`}
            width="100%"
            height="100%"
            title="PDF Document Viewer"
            style={{ border: "none" }}
          ></iframe>
        ) : (
          // Smooth Image Slider with Ken Burns Effect
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            speed={2500} // Even slower transition for smoothness
            loop={true}
            style={{ width: "100%", height: "100%" }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div style={{
                  width: "100%",
                  height: "100%",
                  background: `url(${image}) center/cover no-repeat`,
                  animation: "smooth-zoom 8s ease-in-out infinite"
                }} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <style>
        {`
@keyframes smooth-zoom {
    0% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.05); opacity: 0.9; }
    100% { transform: scale(1.1); opacity: 1; }
}
`}
      </style>

    </div>
  );
};

export default PdfViewer;