export default function Footer() {
  return (
    <footer className="flex justify-center bg-gray-900 text-gray-200 h-16 rounded-md p-4 shadow-sm">
      <div className="flex">
        <a
          href="https://apidocs.cheapshark.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-200 hover:text-blue-300 font-medium"
        >
          CheapShark API
        </a>
        <span className="text-gray-400 px-2">|</span>
        <a
          href="https://github.com/K0A1R/gamedb"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-200 hover:text-blue-300 font-medium"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
