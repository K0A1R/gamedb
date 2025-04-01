export default function GameCard({ game }) {
  return (
    <div className="border border-gray-600 rounded-lg p-4 bg-slate-700">
      <img src={game.gameIMG} alt={game.name} height={100} width={100} />
      <h2 className="font-semibold text-slate-200">{game.name}</h2>
      <p>Price: ${game.normalPrice}</p>
      <p>
        Sale Price: <span className="text-red-500">${game.salePrice}</span>
      </p>

      {/* Steam Rating */}
      {game.steamRatingPercent > 0 && (
        <p>
          Steam Rating: {game.steamRatingPercent}% ({game.steamRatingText})
        </p>
      )}

      {/* Steam Rating Count */}
      {game.steamRatingCount > 0 && (
        <p>Steam Rating Count: {game.steamRatingCount}</p>
      )}

      {/* Metacritic Score */}
      {game.metacriticScore > 0 && (
        <p>Metacritic Score: {game.metacriticScore}</p>
      )}

      <button className="hover:cursor-pointer">
        {game.isSaved ? "♥ Unfavorite" : "♡ Favorite"}
      </button>
    </div>
  );
}
