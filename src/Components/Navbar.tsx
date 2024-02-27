const Navbar = () => {
  return (
    <div className="w-full h-auto bg-slate-300 flex flex-row justify-between items-center p-4">
      <button
        className="text-xl font-bold"
        onClick={() => window.location.reload()}
      >
        Trivia
      </button>
    </div>
  );
};

export default Navbar;
