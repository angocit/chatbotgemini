import { useState, type FormEvent } from "react";
import "./App.css";
import geminiService from "./services/geminiService";
interface HistoryType {
  type: "user" | "bot";
  name: string;
  message: string;
}
function App() {

  const [message, setMessage] = useState<string>("");
  const [history, setHistory] = useState<HistoryType[]>([]);
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // console.log(message);
    const usermessage: HistoryType = {
      type: "user",
      name: "Ngọc",
      message: message,
    };
    // setHistory([...history,usermessage])
    setHistory((prev) => [...prev, usermessage]);
    const text = await geminiService.sendMessage(message)


    const botmessage: HistoryType = {
      type: "bot",
      name: "Simi Bot",
      message: text ?? "Lỗi, vui lòng thử lại",
    };
    // console.log(response.text);
    //  setHistory([...history,usermessage,botmessage])
    setHistory((prev) => [...prev, botmessage]);
  };
  return (
    <>
      <div className="content">
        {history.map((item, index) => (
          <div className={item.type} key={index}>
            <h3>{item.name}</h3>
            <p>{item.message}</p>
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Nhập câu hỏi"
        />
        <button>Gửi</button>
      </form>
    </>
  );
}

export default App;
