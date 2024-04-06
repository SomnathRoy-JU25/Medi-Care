import React, { useState } from "react";
import chatbot from "../../assets/chat-bot.jpg";
import { HashLoader } from "react-spinners";
import { useSelector } from "react-redux";

const API_KEY = import.meta.env.MEDICARE_APP_GEMINI_API;

const RightSection = () => {
  const { user } = useSelector((state) => state.profile);

  const trainingPrompt = [
    {
      role: "user",
      parts: [
        {
          text: "This is Introductory dialogue for any prompt :  'Hello, my dear friend, I am the Medi-Care Bot. Ask me anything regarding doctocs, medicine, and healthcare. I will be happy to help you. '",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "okay",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Special Dialogue 1 : if any prompt mentions 'Shashi Shahi' word :  'Ofcourse! Dr. Shashi Shahi is one of the prominent professors at UWindsor! He is an IIT-D alumni with year of invaluable experience and a fun way of engaging in lectures!' 'Likes: Analytics and Research and Case Studies ''Dislikes: Students near riverside.'",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "okay",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Special Dialogue 2 : Any prompt that mentions Medicare class / classroom  A : ' The Medicare Batch of 2023 is by far the best the university has ever seen by all sets of standards. Students from different come together to form a truly diverse and culturally rich classroom experience. I believe that all students are highly capable and will achieve all great things in their professional career!' ",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "okay",
        },
      ],
    },
  ];

  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(true);
  const [allMessages, setAllMessages] = useState([]);

  const sendMessage = async () => {
    let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
    let messagesToSend = [
      ...trainingPrompt,
      ...allMessages,
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    setIsSent(false);
    try {
      let res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: messagesToSend,
        }),
      });

      if (res.ok) {
        let resjson = await res.json();
        if (
          resjson &&
          resjson.candidates &&
          resjson.candidates.length > 0 &&
          resjson.candidates[0].content &&
          resjson.candidates[0].content.parts &&
          resjson.candidates[0].content.parts.length > 0
        ) {
          let responseMessage = resjson.candidates[0].content.parts[0].text;
          let newAllMessages = [
            ...allMessages,
            {
              role: "user",
              parts: [{ text: message }],
            },
            {
              role: "model",
              parts: [{ text: responseMessage }],
            },
          ];
          setAllMessages(newAllMessages);
          setMessage("");
        } else {
          console.error("Invalid response format:", resjson);
        }
      } else {
        console.error("Error:", res.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsSent(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="rightSection p-4 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={chatbot}
            alt="ChatGPT"
            className="w-10 h-10 mr-2 rounded-lg"
          />
          <p className="text-lg font-semibold">Medi-Care AI BOT</p>
        </div>
        {/* Add icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </div>
      <div className="rightin flex-1 overflow-y-auto">
        <div className="chatgptversion flex items-center justify-between mb-4">
          <p className="text-lg font-semibold">Chat Here</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>

        {allMessages.length > 0 ? (
          <div className="messages space-y-4">
            {allMessages.map((msg, index) => (
              <div key={index} className="message flex items-start space-x-4">
                <img
                  src={msg.role === "user" ? user?.image : chatbot}
                  width={40}
                  height={40}
                  alt=""
                  className="rounded-2xl"
                />
                <div>
                  <h2 className="font-semibold">
                    {msg.role === "user" ? "You" : "MEDICARE Bot"}
                  </h2>
                  <p>{msg.parts[0].text}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="nochat">
            <div className="s2 flex flex-row">
              {[
                "Understanding the role of genetics in inherited diseases.",
                "Exploring the impact of lifestyle choices on heart health.",
                "Managing chronic pain through non-pharmacological interventions.",
                "Addressing mental health stigma in healthcare settings.",
              ].map((sentence, index) => (
                <div key={index} className="suggestioncard">
                  <p>{sentence}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bottomsection mt-4">
        <div className="messagebar flex items-center space-x-4">
          <input
            type="text"
            placeholder="Message MEDICARE Bot..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            value={message}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue 
            transition duration-300 ease-in-out text-gray-800 placeholder-gray-500 
            hover:border-blue focus:ring-2 focus:ring-blue"
          />

          {isSent ? (
            <svg
              onClick={sendMessage}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
          ) : (
            <HashLoader color="#36d7b7" size={30} />
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          MEDICARE BOT can make mistakes. Consider checking important
          information.
        </p>
      </div>
    </div>
  );
};

export default RightSection;
