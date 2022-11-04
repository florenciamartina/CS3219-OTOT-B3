import { Container, ImageListItem, ImageList, Typography } from "@mui/material";

function HomePage() {
  const itemData = [
    {
      img: "https://drive.google.com/uc?export=view&id=1EWjgvsgZrD3Dc69yz7HByyoRUhHuF4cw",
      title: "Phyllidia picta nudibranch",
    },
    {
      img: "https://drive.google.com/uc?export=view&id=1FOua_aKiHTijAtw2isiRz2C765ea-QZa",
      title: "Hermit crab",
    },
    {
      img: "https://drive.google.com/uc?export=view&id=1EFH3bfI2IrakQJv527UVfEkhcJSVYIu5",
      title: "Thysanozoon nigropapillosum",
    },
    {
      img: "https://drive.google.com/uc?export=view&id=1EfJFJEluoWgDDIrhtSy57BQDERF4vfUd",
      title: "Scorpionfish",
    },
    {
      img: "https://drive.google.com/uc?export=view&id=1Dib-oM4fdjAQMX54DxEco6xwMibyIWSp",
      title: "White-eyed Moray Eel",
    },
    {
      img: "https://drive.google.com/uc?export=view&id=1E0QzRI0xbPMK0JF4BsLdnAPBt3A6xjJO",
      title: "Shaun the Sheep nudibranch / Costasiella kuroshimae",
    },
  ];
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <Typography>Welcome to Florencia's CS3219 Task B</Typography>
      <ImageList
        sx={{ height: "80vh", width: "90vw", overflow: "hidden" }}
        cols={3}
        rowHeight={250}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}`}
              srcSet={`${item.img}`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}

export default HomePage;
