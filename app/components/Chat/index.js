"use client";
import { Send } from "lucide-react";
import { Layout } from "../Layout";
import { NavigationBar } from "../NavigationBar";
import { useEffect, useState } from "react";

const formatDate = (time) => {
  let date = new Date(time);
  return ` ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
};

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [updateChat, setUpdateChat] = useState(0);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await (await fetch("/api/dump-messages")).json();
      setMessages(res);
    };
    fetchMessages();
  }, [updateChat]);

  const submitMessage = async () => {
    if (content.length <= 64 && content.length > 0) {
      await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ content: content }),
      });

      setUpdateChat(updateChat + 1);
      setContent("");
    } else {
      alert("The max characters is 64 and not can be empty");
    }
  };

  return (
    <Layout className={"h-[90vh]"}>
      <NavigationBar title={"Chat Me"} />
      <ul className="text-white m-4 flex flex-col gap-2 h-[65vh] overflow-scroll">
        {messages.map((val) => {
          return (
            <li
              className="bg-neutral-900 rounded-3xl p-4 break-words"
              key={val.id}
            >
              <p className="text-neutral-500 text-sm">Post ID: {val.id}</p>
              <p>{val.content}</p>
              <p className="text-right text-neutral-700 text-sm">
                {formatDate(val.createdAt)}
              </p>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-center items-center gap-2 bottom-2 p-4">
        <input
          placeholder="Type here..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className="outline-none p-4 rounded-full block w-[80%]"
        />
        <button
          className="bg-neutral-800 p-4 rounded-full block"
          onClick={submitMessage}
        >
          <Send className="text-white" />
        </button>
      </div>
    </Layout>
  );
};
