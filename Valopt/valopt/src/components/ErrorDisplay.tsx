export default function ErrorDisplay({ error }: { error: string }) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }