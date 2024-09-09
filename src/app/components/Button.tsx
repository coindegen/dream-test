<button
  onClick={handleClick}
  className={`inline-flex h-28 w-28 items-center justify-center rounded-3xl bg-white p-7 transition-transform duration-300 hover:scale-105 ${
    isLoading ? "scale-95 opacity-75" : ""
  }`}
  disabled={isLoading}
>
  <DreamLogo />
</button>;
