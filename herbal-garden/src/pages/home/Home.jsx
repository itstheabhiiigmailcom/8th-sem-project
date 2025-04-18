'use client';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-lg">
        <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
        <p className="text-muted-foreground">
          You have successfully logged in!
        </p>
        <button
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          onClick={() => {
            // Clear auth token
            localStorage.removeItem('authToken');
            // Redirect to login page
            window.location.href = '/';
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
