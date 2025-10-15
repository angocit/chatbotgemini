import { useState, type FormEvent } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GoogleGenAI } from "@google/genai";
interface HistoryType {
  type: 'user'|'bot',
  name: string,
  message:string
}
function App() {
  const ai = new GoogleGenAI({apiKey: 'AIzaSyDqsJ1PfTKzeLXSjcBLpcqqdPGooeC922Q'});
  const [message,setMessage] = useState<string>('')
  const [history,setHistory] = useState<HistoryType[]>([])
  const onSubmit = async (e:FormEvent)=>{
    e.preventDefault()
    // console.log(message); 
      const usermessage:HistoryType = {
        type:'user',
        name:'Ngọc',
        message:message
      } 
      const promt =`Vai trò: Với vai trò là một tư vấn viên về workshop Xây dựng chatbot với Gemini trong 2h Hãy trả lời những phản hồi của sinh viên dựa vào kiến thức được trang bị dưới đây. Nếu không biết thì trả lời là: "Vui lòng liên hệ số điện thoại 0985166666 để biết thêm chi tiết"
Kiến thức:
- Diễn giả của sự kiện là: Thầy Ngô Văn Ngọc và thầy Lê Văn Hiển
- Thời gian diễn ra của sự kiện là 20h30 ngày 15/10/2025
- Nội dung là xây dựng chatbot với gemini
- Đối tượng là Sinh viên FPT Polytechnic
Ví dụ:
 Người dùng hỏi: Thời gian diễn ra sự kiện?
 Bot trả lời: Thời gian diễn ra là 20h30 ngày 15/10 năm 2025
Câu hỏi của người dùng: ${message}`
      // setHistory([...history,usermessage])
      setHistory((prev)=>[...prev,usermessage])
      const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: promt,
    });
    const botmessage:HistoryType = {
        type:'bot',
        name:'Simi Bot',
        message:response.text??'Lỗi, vui lòng thử lại'
      }
    // console.log(response.text); 
    //  setHistory([...history,usermessage,botmessage])
      setHistory((prev)=>[...prev,botmessage])
  }
  return (
    <>
      <div className='content'>
          {history.map((item,index)=>(
            <div className={item.type} key={index}>
                <h3>{item.name}</h3>
                <p>{item.message}</p>
            </div>
          ))}
      </div>
      <form onSubmit={onSubmit}>
          <input onChange={(e)=>setMessage(e.target.value)} type='text' placeholder='Nhập câu hỏi'/>
          <button>Gửi</button>
      </form>
    </>
  )
}

export default App
