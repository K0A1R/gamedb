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
          // Steam
          fetch(
            "https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=5"
          ),
          // GOG
          fetch(
            "https://www.cheapshark.com/api/1.0/deals?storeID=7&pageSize=5"
          ),
          // Epic
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

  if (loading) return <p className="animate-pulse">Loading deals...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Popular Store Fronts</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Steam Deals */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Steam</h2>
          <ul className="space-y-3">
            {storeDeals.steam.map((deal) => (
              <li key={deal.dealID} className="border-b border-gray-700 pb-2">
                <a
                  href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="font-medium">{deal.title}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 line-through">
                      ${deal.normalPrice}
                    </span>
                    <span className="text-green-400 font-bold">
                      ${deal.salePrice}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* GOG Deals */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-purple-400">GOG</h2>
          <ul className="space-y-3">
            {storeDeals.gog.map((deal) => (
              <li key={deal.dealID} className="border-b border-gray-700 pb-2">
                <a
                  href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="font-medium">{deal.title}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 line-through">
                      ${deal.normalPrice}
                    </span>
                    <span className="text-green-400 font-bold">
                      ${deal.salePrice}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Epic Games Deals */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-white">Epic Games</h2>
          <ul className="space-y-3">
            {storeDeals.epic.map((deal) => (
              <li key={deal.dealID} className="border-b border-gray-700 pb-2">
                <a
                  href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="font-medium">{deal.title}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 line-through">
                      ${deal.normalPrice}
                    </span>
                    <span className="text-green-400 font-bold">
                      ${deal.salePrice}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
