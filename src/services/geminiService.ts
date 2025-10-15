import { GoogleGenAI } from "@google/genai";
import productsData from "../data/products.json";
const ai = new GoogleGenAI({
    apiKey: "AIzaSyDqsJ1PfTKzeLXSjcBLpcqqdPGooeC922Q",
});

const createProductContext = () => {
    const context = `
 Bạn là Nhân viên hỗ trợ khách hàng của ${productsData.store.name}.
 Mô tả của hàng : ${productsData.store.description}
 Danh sách sản phẩm có sẵn:
 ${productsData.products.map((product) => {
        return `
     Tên: ${product.name}
     ID: ${product.id}
     Danh mục: ${product.category}
     Gia: ${product.price}
     Mô tả: ${product.description}
     Đặc Tính: ${Object.entries(product.specifications).map(([key, value]) => {
            ` ${key}- ${value}`
        })}

    `

    }).join("\n")}
     Hướng Dẫn Trả lời:

     1. Chỉ trả lời dựa trên dữ liệu sản phẩm ở trên
     2. Luôn trả lời bằng tiếng Việt
     3. Khách hàng hỏi sản phẩm không có trong danh sách, hãy noi sản phẩm không phẩ ko có sẵn
     4. Khi khách hàng đặt câu hỏi không liên quan đến sản phẩm, hãy lịch sự từ chối và gợi ý khách hàng hỏi sản phẩm
    `
    return context;
}
class GeminiService {
    constructor() {
        this.conversationHistory = [];
        this.productContext = createProductContext()
    }
    async sendMessage(userMessage) {
        this.conversationHistory.push({
            role: "user",
            parts: [{ text: userMessage }]
        })
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-001",
            config:{
                systemInstruction: this.productContext
            },
            contents: this.conversationHistory,
        });

        const assistantMessage = response.candidates[0].content?.parts[0].text;
        return assistantMessage;
    }

}
export default new GeminiService();