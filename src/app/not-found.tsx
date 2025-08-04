export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-white text-black dark:bg-black dark:text-white px-4">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <a
        href="/"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go Home
      </a>
    </div>
  );
}
