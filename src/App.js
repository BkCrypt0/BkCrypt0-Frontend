import { Provider } from "react-redux";
import store from "./redux/store";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "./configs/routes";
import { Layouts } from "./layouts";
import { Suspense } from "react";
import { SnackbarProvider } from "notistack";
import { createTheme, ThemeProvider } from "@mui/material";
require("dotenv").config();

const theme = createTheme({
  typography: {
    fontFamily: "'Lexend Deca', sans-serif",
  },

  colors: {
    dark_3: "#253f4b",
    dark_2: "#365563",
    dark_1: "#446879",
    medium_3: "#537d90",
    medium_2: "#608da2",
    medium_1: "#779eb2",
    light_3: "#8eb1c2",
    light_2: "#acc8d7",
    light_1: "#c8dfea",
    neutral_gray: "#f2f2f2",
  },
});

const filterRoutesAndPathsByLayout = (layout) => {
  const layoutRoutes = [];
  const layoutPaths = [];

  if (routes) {
    routes.forEach((route) => {
      if (!route.redirect && route.layout === layout) {
        layoutRoutes.push(route);
        layoutPaths.push(route.path);
      }
    });
  }

  return { layoutRoutes, layoutPaths };
};
const filterRedirectRoutes = () => {
  let redirectRoutes = [];
  if (routes) {
    redirectRoutes = routes.filter(
      (route) => !route.disableInProduction && route.redirect
    );
  }

  return redirectRoutes;
};

const redirectRoutes = filterRedirectRoutes();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <Provider store={store}>
          <Switch>
            {Object.keys(Layouts).map((layout, idx) => {
              const LayoutTag = Layouts[layout];
              const { layoutRoutes, layoutPaths } =
                filterRoutesAndPathsByLayout(layout);

              return (
                <Route key={idx} path={[...layoutPaths]}>
                  <LayoutTag>
                    <Switch>
                      {layoutRoutes.map((route) => (
                        <Route
                          key={route.path}
                          path={route.path}
                          exact={route.exact === true}
                          render={(props) => {
                            const Component = route.component;
                            return (
                              <Suspense fallback={null}>
                                <Component {...props} />
                              </Suspense>
                            );
                          }}
                        />
                      ))}
                    </Switch>
                  </LayoutTag>
                </Route>
              );
            })}
            {redirectRoutes.map((route) => (
              <Redirect
                from={route.path}
                key={route.path}
                to={route.to}
                exact={route.exact}
              />
            ))}
            <Redirect from="/" to="/welcome" />
          </Switch>
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
