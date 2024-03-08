import ErrorPage from "./pages/error-page";
import { useMediaQuery } from "./hooks/use-media-query";
import Header from "./components/Header";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import tw from "twin.macro";

function App() {
  const { isMD } = useMediaQuery();
  const Main = lazy(() => import("./pages/main-page"));

  if (isMD) return <ErrorPage />;

  return (
    <Suspense fallback={<></>}>
      <Header />
      <BrowserRouter>
        <RouteWrapper>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </RouteWrapper>
      </BrowserRouter>
    </Suspense>
  );
}
const RouteWrapper = tw.main`relative w-full h-full`;
export default App;
