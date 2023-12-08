import "./App.css";
import { router } from "./routes/routes";
import { RouterProvider } from "react-router-dom";
import ThemeProvider from "./theme";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import useGetMovie from "./api/useGetMovie";

const InitialApp = () => {
  useGetMovie();
  return <RouterProvider router={router} />;
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <InitialApp />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
