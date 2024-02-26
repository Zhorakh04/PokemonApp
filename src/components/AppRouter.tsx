import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PokimonItemPage from "../pages/PokemonItemPage";

export const ErrorPage = () => {
    return <div>Error</div>;
};

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon/:name" element={<PokimonItemPage />} />
            <Route path="/pokemon/" element={<ErrorPage />} />

            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};

export default AppRouter;
