import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store";

const colors = {
  brand: {
    900: "#1d1d1d",
  },
};

const fonts = {
  heading: "raleway",
  body: "raleway",
};

const theme = extendTheme({ colors, fonts });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      {/* <QueryClientProvider client={queryClient}> */}
        <BrowserRouter>
          <Provider store={store}>
            <App />
            {/* <ToastContainer /> */}
          </Provider>
        </BrowserRouter>
      {/* </QueryClientProvider> */}
    </ChakraProvider>
  </React.StrictMode>
);
