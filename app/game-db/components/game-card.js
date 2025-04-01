export default function GameCard({ game }) {
  // const { gameID, name, gameIMG, storeID, dealID, salePrice, normalPrice, steamRatingText, steamRatingPercent, steamRatingCount, metacriticScore, metacriticLink } = game;
  return (
    <div className="border border-gray-600 rounded-lg p-4 bg-slate-700">
      <img src={game.gameIMG} alt={game.name} height={100} width={100} />
      <h2>{game.name}</h2>
      <p>Price: ${game.normalPrice}</p>
      <p>Sale Price: ${game.salePrice}</p>
      <p>
        Steam Rating: {game.steamRatingPercent}% ({game.steamRatingText})
      </p>
      <p>Steam Rating Count: {game.steamRatingCount}</p>
      <p>Metacritic Score: {game.metacriticScore}</p>
      <button className="hover:cursor-pointer">
        {game.isSaved ? "♥ Unfavorite" : "♡ Favorite"}
      </button>
    </div>
  );
}
