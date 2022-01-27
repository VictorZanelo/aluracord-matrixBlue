import appConfig from "../config.json";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";
//import React from "react";
import { useRouter } from "next/router";
import * as React from "react";
import ReactDOM from "react-dom";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App(props) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <Alert
    sx={{ visibility: 'visible' }}
      theme={darkTheme}
      display="block"
      severity="success"
    >
      {props.children}
    </Alert>
  );
}

function Title(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>
        {`
          ${Tag} {
            color: ${appConfig.theme.colors.neutrals["400"]};
            font-size: 24px;
            font-weight: 600;
          }
        `}
      </style>
    </>
  );
}

/* function HomePage() {
  return (
    <div>
        <GlobalStyle />
      <Title tag="h2">Alô galera de cowboy</Title>
      <h2>quem gosta de rodeio bate forte com a mão</h2>
    </div>
  );
}

export default HomePage;
 */

export default function PaginaInicial() {
  //const username = 'VictorZanelo';
  const [username, setUsername] = React.useState("VictorZanelo");
  const [bio, setBio] = React.useState("Bio Dev");
  const [alerta, setAlerta] = React.useState("usu existente");
  const roteamento = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[600],
          backgroundImage:
            "url(https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: appConfig.theme.colors.neutrals["700"],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(event) => {
              event.preventDefault();

              roteamento.push("/chat");
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
           {/*  <App>{alerta}</App> */}
            <Title tag="h2">Boas vindas de volta!</Title>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              fullWidth
              rounded="md"
              placeholder="User name"
              onChange={function (event) {
                const uname = event.target.value;

                if (uname.length > 2) {
                  setUsername(uname);
                  fetch(`https://api.github.com/users/${uname}`)
                    .then((res) => {
                      res.json().then((bd) => {
                        setBio(bd.bio);
                        setAlerta(bd.bio)
                      });
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                }
              }}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />

            <Button
              type="submit"
              label="Entrar"
              fullWidth
              rounded="md"
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[700],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />

            <Text
              variant="body4"
              styleSheet={{
                margin: "20px",
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "10px",
              }}
            >
              {bio}
            </Text>
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "6px",
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
