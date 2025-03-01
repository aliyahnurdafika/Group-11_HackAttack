import { useState } from "react";
import "./App.css";
import axios from "axios";

export default function MainPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5001/api/gpt", { prompt });
      setResponse(res.data.response);
    } catch (error) {
      setResponse("Error: Unable to get a response.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="text-white p-4 bg-gray-800 min-h-screen w-full flex flex-col items-center gap-4">
      <div className="text-3xl">Nutreazy</div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex justify-center flex-row gap-4"
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Have some ingredients in mind?"
          className="p-4 w-full rounded-lg border bg-gray-800 focus:ring-blue-500 resize-none"
          rows="4"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg disabled:bg-gray-600"
        >
          {loading ? "Processing..." : "Send"}
        </button>
      </form>

      {response && (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
