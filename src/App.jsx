import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { NotifProvider } from "./app/context/notif";
import { ThemeProvider } from "./app/context/theme";
import { ConfigProvider } from "./app/context/config";
import AuthProvider from "./app/context/auth";
import AppRouter from "./routers/AppRouter";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "",
      },
    }),
  },
});

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <NotifProvider>
              <ConfigProvider>
                <ChakraProvider resetCSS={false} theme={theme}>
                  <AppRouter />
                </ChakraProvider>
              </ConfigProvider>
            </NotifProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
