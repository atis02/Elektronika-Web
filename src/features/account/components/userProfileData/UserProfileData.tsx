import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BASE_URL_IMG } from "../../../../api/instance";
import { decode } from "blurhash";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const UserProfileData: React.FC = () => {
  const loggedUser = localStorage.getItem("ElectronicaUser");
  const isLogged = loggedUser ? JSON.parse(loggedUser) : "";
  console.log(isLogged);
  const [surname, setSurname] = useState<string>(isLogged?.surname);
  const [name, setName] = useState<string>(isLogged?.name);
  const [phoneNumber, setPhoneNumber] = useState<string>(isLogged?.phoneNumber);
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<string>(isLogged?.image);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form Data:", surname);
  };
  const style = {
    height: 45,
    "& .MuiOutlinedInput-root": {
      borderRadius: "26px", // change this value to your desired radius
    },
  };
  const getPlaceholder = (blurhash: string, width: number, height: number) => {
    const pixels = decode(blurhash, width, height);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const imageData = ctx.createImageData(width, height);
      imageData.data.set(pixels);
      ctx.putImageData(imageData, 0, 0);
      return canvas.toDataURL("image/png");
    }
    return "";
  };
  const handleChangeImage = (e: any) => {
    setImage(e.target.file);
  };
  const blurhashBig = "L68]y=00?b_N4nM{s.t000%N%Lxt";
  const bigPlaceholder = getPlaceholder(blurhashBig, 200, 200);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Stack
            borderBottom="1px solid #E2E8F0"
            width="100%"
            direction="row"
            p={1}
          >
            <Typography color="#1E293B" width="40%">
              Ady
            </Typography>
            <TextField
              label="Ady"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              required
              sx={style}
            />
          </Stack>
          <Stack
            borderBottom="1px solid #E2E8F0"
            width="100%"
            direction="row"
            p={1}
          >
            <Typography color="#1E293B" width="40%">
              Familiýasy
            </Typography>
            <TextField
              label="Familiýasy"
              name="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              variant="outlined"
              fullWidth
              size="small"
              sx={style}
              required
            />
          </Stack>
          <Stack
            borderBottom="1px solid #E2E8F0"
            width="100%"
            direction="row"
            p={1}
          >
            <Typography color="#1E293B" width="40%">
              Telefon belgi
            </Typography>
            <TextField
              label="Telefon belgi"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              variant="outlined"
              fullWidth
              size="small"
              sx={style}
              required
            />
          </Stack>
          <Stack
            borderBottom="1px solid #E2E8F0"
            width="100%"
            direction="row"
            p={1}
          >
            <Typography color="#1E293B" width="40%">
              Açar söz
            </Typography>
            <TextField
              label="Açar söz"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              sx={style}
              //   required
            />
          </Stack>
          <Stack
            borderBottom="1px solid #E2E8F0"
            width="100%"
            direction="row"
            p={1}
          >
            <Typography color="#1E293B" width="29%">
              Profil surady
            </Typography>
            <Stack
              borderRadius="100%"
              width={60}
              height={60}
              border="1px solid lightgray"
              bgcolor="#aecad6"
            >
              <a target="_blank" href={`${BASE_URL_IMG}public/${image}`}>
                <LazyLoadImage
                  src={`${BASE_URL_IMG}public/${image}`}
                  // src={product.imagesOne || "fallback-image.jpg"}
                  alt="profile picture"
                  placeholderSrc={bigPlaceholder}
                  effect="blur"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </a>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2} ml={3}>
              {/* <Button
                sx={{
                  backgroundColor: "#1E293B",
                  height: 38,
                  color: "#fff",
                  borderRadius: "100px",
                  p: 1,
                }}
              >
                Üýtgetmek
              </Button> */}
              <Button
                component="label"
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#1E293B",
                  height: 38,
                  color: "#fff",
                  borderRadius: "100px",
                  p: 1,
                }}
              >
                <AddPhotoAlternateIcon />
                Üýtgetmek
                <input
                  type="file"
                  hidden
                  onChange={handleChangeImage}
                  accept="image/*"
                />
              </Button>
              <Button
                sx={{
                  backgroundColor: "#C3000E",
                  height: 38,
                  p: 1,
                  color: "#fff",
                  borderRadius: "100px",
                }}
              >
                Aýyrmak
              </Button>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
            ml={3}
          >
            <Button
              variant="outlined"
              sx={{
                // backgroundColor: "#1E293B",
                height: 38,
                color: "#1E293B",
                border: "1px solid #1E293B",
                borderRadius: "100px",
                p: 1,
              }}
            >
              Yza
              <CloseIcon />
            </Button>
            <Button
              type="submit"
              sx={{
                backgroundColor: "#C3000E",
                height: 38,
                p: 1,
                color: "#fff",
                borderRadius: "100px",
              }}
            >
              Ýatda sakla
              <CheckIcon />
            </Button>
          </Stack>
          {/* <Button type="submit" variant="contained" color="primary">
            Submit
          </Button> */}
        </Stack>
      </form>
    </div>
  );
};

export default UserProfileData;
