import { useParams } from "react-router-dom";
import PokemonItemInfo from "../components/PokemonItemInfo/PokemonItemInfo";
import { ErrorPage } from "../components/AppRouter";
import MyLoader from "../components/UI/MyLoader";
import { usePokimonItemQuery } from "../service/pokemonService";

const PokimonItemPage = () => {
    const { name } = useParams();
    const { data, isLoading, error } = usePokimonItemQuery(name + "");

    if (isLoading) {
        return <MyLoader />;
    }

    if (error) {
        return <ErrorPage />;
    }

    console.log(data)
    return <div>
       {data &&<PokemonItemInfo data={data}/>}
    </div>
};

export default PokimonItemPage;
