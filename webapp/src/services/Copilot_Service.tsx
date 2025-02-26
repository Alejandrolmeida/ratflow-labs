import http from "./httpService_Copilot";

//    "chat_history": [{"inputs": {"question": "¿Cuántos App Services tengo?"}, "outputs": {"answer": "Tienes 5 App Services."}},{"inputs": {"question": "¿Cuál es el estado de mi base de datos?"}, "outputs": {"answer": "Tu base de datos está en línea."}}],
export interface Copilot_History_Interface {
  inputs: { question: string };
  outputs: { answer: string };
}

export interface Copilot_Service_Interface {
  answer:string,
  assistant: string,
}

export interface Copilot_Request {
  chat_history: Copilot_History_Interface[];
  activeUser: string;
  question: string;
}

class Copilot_Service {
  public static async getChatResp(
    request: Copilot_Request
  ): Promise<Copilot_Service_Interface> {
    let result = await http.post(
      "score",
      request // Envía el objeto request directamente como el cuerpo de la solicitud
    );
    console.log("result.data", request);
    return result.data;
  }
}

export default Copilot_Service;
