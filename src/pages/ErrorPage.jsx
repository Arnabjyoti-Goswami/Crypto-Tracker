const ErrorPage = (props) => {
  const { error, resetErrorBoundary } = props;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-slate-200 to-blue-600">
      <h1 className="mb-10 text-5xl font-bold text-red-600">
        Something went wrong!
      </h1>
      <p className="mb-6 text-lg text-gray-700">
        {error.message == "Failed to fetch"
          ? "Failed to fetch data. Please try again later, as the free version of the CoinGecko API is rate limited."
          : error.message}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 hover:text-blue-200 hover:border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        text-md font-nunito"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
