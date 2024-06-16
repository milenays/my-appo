import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-4xl font-bold text-center">Welcome to Stockie</h1>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400">
          Please <Link href="/login" className="text-blue-600">login</Link> to access your dashboard.
        </p>
      </div>
    </div>
  );
}
