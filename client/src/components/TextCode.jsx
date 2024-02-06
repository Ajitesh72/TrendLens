/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

export default function TextTags() {
  const [textQuery, setTextQuery] = useState("");
  const [GeneratedTags, setGeneratedTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const TextQueries = [
    " Exciting match today! ⚽️ The clash between Manchester United and Barcelona showcased exceptional skill and strategy. With both teams giving their all, it was a nail-biting experience for fans worldwide. A stunning goal in the final minutes secured the victory for Manchester United, leaving supporters on the edge of their seats.",
    "Embracing the latest trends at Milan Fashion Week! From bold prints to elegant silhouettes, designers showcased a diverse range of styles that are set to dominate the fashion scene this season. The runway was a celebration of creativity and individuality, proving once again that fashion is an ever-evolving form of self-expression. Which looks are you excited to incorporate into your wardrobe? ",
    "Analyzing Rahul Gandhi's recent policy proposal on education reform. His emphasis on enhancing accessibility and quality in the education sector raises important questions about our current system. Critics argue for a more detailed implementation plan, while supporters appreciate the focus on inclusivity. As the debate unfolds, it's crucial to examine the potential impact on students and the broader education landscape. ",
    " Exploring the advancements in artificial intelligence at the annual Tech Summit. From breakthroughs in machine learning to the integration of AI in various industries, the summit showcased the rapid evolution of technology. Experts predict a transformative impact on healthcare, finance, and beyond. As society navigates this digital frontier, discussions around ethical considerations and responsible AI development gain prominence.",
  ];

  const GenerateRandomTextQuery = () => {
    const randomIndex = Math.floor(Math.random() * TextQueries.length);
    const randomTextQuery = TextQueries[randomIndex];
    setTextQuery(randomTextQuery);
  };

  const handleTextareaChange = (event) => {
    setTextQuery(event.target.value);
  };

  const handleGenerateTags = async () => {
    try {
      setLoading(true); // Set loading to true when Tags generation starts

      const response = await fetch(" http://127.0.0.1:5000/api/v1/Tags_generation/using_text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_text: textQuery }),
      });

      if (!response.ok) {
        throw new Error("Failed to Generate Tags");
      }

      const GeneratedText = await response.text();
      setGeneratedTags(GeneratedText);
      // console.log(GeneratedText)
    } catch (error) {
      console.error("Error generating Tags:", error);
    } finally {
      setLoading(false); // Set loading to false when Tags generation completes
      console.log(GeneratedTags)
    }
  };

  const handleCopyTags = () => {
    const textarea = document.createElement("textarea");
    textarea.value = GeneratedTags;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <div className="py-4 border border-1 border-slate-300 w-full bg-slate-200">
        {/* heading of prompt */}
        <div className="w-full px-4 pb-4">
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <p className="text-2xl font-bold">Prompt</p>
          </div>
          <div className="text-slate-800">
            Guiding instruction for Ai's intelligent response for generating Text to Trending Hashtags
          </div>
        </div>
        <div className="w-full flex items-center justify-between py-4 px-4">
          <div>Base prompt</div>
          <div
            className="bg-slate-800 text-white p-2 rounded-lg cursor-pointer"
            onClick={GenerateRandomTextQuery}
          >
            Prompt Example
          </div>
        </div>
        <textarea
          className="mx-4 h-32 w-[90%] sm:w-[92%] md:w-[95%] rounded-lg p-4"
          value={textQuery}
          onChange={handleTextareaChange}
        />
        <div
          className="mx-4 text-white py-2 font-bold text-xl rounded-xl w-[90%] sm:w-[92%] md:w-[95%] text-center bg-black cursor-pointer hover:bg-slate-800"
          onClick={handleGenerateTags}
        >
          {loading ? "Generating..." : "Generate Trending Tags"}
        </div>
      </div>
      {/* when response is Generated */}
      {loading ? (
        <div className="mt-4 text-xl font-bold">Loading...</div>
      ) : (
        <div className="mt-4 text-xl font-bold">Generated Tags:</div>
      )}
      <div className="bg-slate-900 p-2 rounded-xl sm:p-2 text-red-400 mt-4 h-60 w-full overflow-y-scroll">
        <div className="">
          <pre>{loading ? "Loading..." : GeneratedTags}</pre>
        </div>
      </div>
      {!loading && GeneratedTags && (
        <div
          className={`mx-4 mt-4 text-white py-2 font-bold text-xl rounded-xl w-[50%] sm:w-[92%] md:w-[95%] text-center ${
            copied ? "bg-slate-500" : "bg-slate-900"
          } cursor-pointer hover:bg-slate-800`}
          onClick={handleCopyTags}
        >
          {copied ? "Copied!" : "Copy Tags"}
        </div>
      )}
    </>
  );
}
