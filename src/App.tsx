import ErrorPage from "./pages/error-page";
import { useMediaQuery } from "./hooks/use-media-query";

import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import tw from "twin.macro";
import { Header } from "./components/header";

function App() {
  const { isMD } = useMediaQuery();
  const Main = lazy(() => import("./pages/main-page"));
  const Krump = lazy(() => import("./pages/krump"));
  const KrumpWordDance = lazy(() => import("./pages/krump-word-dance"));
  const KrumpWordCulture = lazy(() => import("./pages/krump-word-culture"));
  const KrumpTipsDomestic = lazy(() => import("./pages/krump-tips-domestic"));
  const DetailPage = lazy(() => import("./pages/detail-page"));

  if (isMD) return <ErrorPage />;

  return (
    <Suspense fallback={<></>}>
      <BrowserRouter>
        <Header />
        <RouteWrapper>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/krump" element={<Krump />} />
            <Route path="/krump/:id" element={<Krump />} />
            <Route path="/krump-word-dance" element={<KrumpWordDance />} />
            <Route path="/krump-word-dance/:id" element={<KrumpWordDance />} />
            <Route path="/krump-word-culture" element={<KrumpWordCulture />} />
            <Route
              path="/krump-word-culture/:id"
              element={<KrumpWordCulture />}
            />
            <Route
              path="/krump-tips-domestic"
              element={<KrumpTipsDomestic />}
            />
            <Route
              path="/krump-tips-domestic/:id"
              element={<KrumpTipsDomestic />}
            />

            <Route path="/detail/:type/:id" element={<DetailPage />} />
          </Routes>
        </RouteWrapper>
      </BrowserRouter>
    </Suspense>
  );
}
const RouteWrapper = tw.main`relative w-full h-full`;
export default App;
