import { useState, useEffect } from "react";

export default function StoreFronts() {
  const [storeDeals, setStoreDeals] = useState({
    steam: [],
    gog: [],
    epic: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoreDeals = async () => {
      try {
        setLoading(true);

        // Fetch deals for all 3 stores
        const [steamRes, gogRes, epicRes] = await Promise.all([
          fetch(
            "https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=5"
          ),
          fetch(
            "https://www.cheapshark.com/api/1.0/deals?storeID=7&pageSize=5"
          ),
          fetch(
            "https://www.cheapshark.com/api/1.0/deals?storeID=25&pageSize=5"
          ),
        ]);

        if (!steamRes.ok || !gogRes.ok || !epicRes.ok) {
          throw new Error("Failed to fetch store data");
        }

        const [steamData, gogData, epicData] = await Promise.all([
          steamRes.json(),
          gogRes.json(),
          epicRes.json(),
        ]);

        setStoreDeals({
          steam: steamData,
          gog: gogData,
          epic: epicData,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreDeals();
  }, []);

  if (loading)
    return <p className="animate-pulse text-center py-8">Loading deals...</p>;
  if (error)
    return <p className="text-red-500 text-center py-8">Error: {error}</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">
        Popular Store Fronts
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Steam Deals */}
        <div className="bg-gray-800 rounded-lg p-4 hover:shadow-lg hover:shadow-blue-400/10 hover:-translate-y-1 transition-all duration-300 border border-gray-700 hover:border-blue-400/30">
          <h2 className="text-xl font-semibold mb-4 text-blue-400 flex items-center gap-2">
            Steam
          </h2>
          <ul className="space-y-3">
            {storeDeals.steam.map((deal) => (
              <li
                key={deal.dealID}
                className="border-b border-gray-700 pb-2 hover:bg-gray-700/50 transition-colors duration-200 rounded px-2 -mx-2"
              >
                <a
                  href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-white transition-colors"
                >
                  <p className="font-medium line-clamp-1">{deal.title}</p>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-gray-400 line-through">
                      ${deal.normalPrice}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-yellow-400">
                        {Math.round(
                          (1 - deal.salePrice / deal.normalPrice) * 100
                        )}
                        % OFF
                      </span>
                      <span className="text-green-400 font-bold">
                        ${deal.salePrice}
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://store.steampowered.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors"
          >
            Go to Steam →
          </a>
        </div>

        {/* GOG Deals */}
        <div className="bg-gray-800 rounded-lg p-4 hover:shadow-lg hover:shadow-purple-400/10 hover:-translate-y-1 transition-all duration-300 border border-gray-700 hover:border-purple-400/30">
          <h2 className="text-xl font-semibold mb-4 text-purple-400 flex items-center gap-2">
            GOG
          </h2>
          <ul className="space-y-3">
            {storeDeals.gog.map((deal) => (
              <li
                key={deal.dealID}
                className="border-b border-gray-700 pb-2 hover:bg-gray-700/50 transition-colors duration-200 rounded px-2 -mx-2"
              >
                <a
                  href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-white transition-colors"
                >
                  <p className="font-medium line-clamp-1">{deal.title}</p>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-gray-400 line-through">
                      ${deal.normalPrice}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-yellow-400">
                        {Math.round(
                          (1 - deal.salePrice / deal.normalPrice) * 100
                        )}
                        % OFF
                      </span>
                      <span className="text-green-400 font-bold">
                        ${deal.salePrice}
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://www.gog.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-purple-400 hover:text-purple-300 hover:underline transition-colors"
          >
            Go to GOG →
          </a>
        </div>

        {/* Epic Games Deals */}
        <div className="bg-gray-800 rounded-lg p-4 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-1 transition-all duration-300 border border-gray-700 hover:border-white/30">
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            Epic Games
          </h2>
          <ul className="space-y-3">
            {storeDeals.epic.map((deal) => (
              <li
                key={deal.dealID}
                className="border-b border-gray-700 pb-2 hover:bg-gray-700/50 transition-colors duration-200 rounded px-2 -mx-2"
              >
                <a
                  href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-white transition-colors"
                >
                  <p className="font-medium line-clamp-1">{deal.title}</p>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-gray-400 line-through">
                      ${deal.normalPrice}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-yellow-400">
                        {Math.round(
                          (1 - deal.salePrice / deal.normalPrice) * 100
                        )}
                        % OFF
                      </span>
                      <span className="text-green-400 font-bold">
                        ${deal.salePrice}
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://store.epicgames.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-white hover:text-gray-300 hover:underline transition-colors"
          >
            Go to Epic Games →
          </a>
        </div>
      </div>
    </div>
  );
}
