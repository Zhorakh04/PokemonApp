import "./App.css";
import AppRouter from "./components/AppRouter";

const App = () => {
    return (
        <main>
            <div className="pokemons">
                <AppRouter />
            </div>
        </main>
    );
};

export default App;
