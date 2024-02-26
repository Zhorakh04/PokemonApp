
interface IProp {
    url:string
    onClick?:()=>void
}

const PokemonItemImg = ({url ,onClick, ...props}:IProp) => {
    return (
        <div className="pokemon__Item__Image" {...props}>
            <img src={url} alt="Pokimon Img" />
        </div>
    );
};

export default PokemonItemImg;
