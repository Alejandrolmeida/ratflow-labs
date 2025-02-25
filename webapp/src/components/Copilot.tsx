import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import Select from "react-select";
import SimpleBar from "simplebar-react"; // si quieres agregar un scroll personalizado
import "simplebar/dist/simplebar.min.css";
import ReactMarkdown from "react-markdown";
import rata from "../assets/images/rata.png";
import david from "../assets/images/david.png";
import alex from "../assets/images/alex.png";

import Copilot_Service, {
  Copilot_Request,
  Copilot_History_Interface,
} from "../services/Copilot_Service";

const Copilot: React.FC = () => {

  //#region ActiveUser
  const [activeUser, setActiveUser] = useState("Alejandro");
  const TemptingData = [
    {
      value: "Alejandro",
      label: (
        <div>
          <img
            src={alex}
            alt="Azure Architect"
            className="avatar avatar-md me-2"
          />
          Alejandro
        </div>
      ),
    },
    {
      value: "David",
      label: (
        <div>
          <img
            src={david}
            alt="Engineer Acount"
            className="avatar avatar-md me-2"
          />
          David
        </div>
      ),
    }
  ];

  const handleChangeUser = (selectedOption: any) => {
    const value = selectedOption.value;
    setActiveUser(value);
  };
  //#endregion

  //#region Chat Data
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      user: "bot",
      text: `Hola soy Splinter. ¿En que puedo ayudarte ${activeUser}?.`,
      assistant: activeUser,
    },
  ]);
  const [chatHistory, setChatHistory] = useState<Copilot_History_Interface[]>([
    {
      inputs: { question: `Hola. Mi nombre es ${activeUser}` },
      outputs: { answer: `Hola soy Splinter. ¿En que puedo ayudarte ${activeUser}?.` },
    },
  ]);
  //#endregion

  //#region Manage Chat
  const [messageTextSend, setMessageTextSend] = useState<string>("");
  const handleClearChat = () => {
    setMessages([
      {
        user: "bot",
        text: `Hola soy Splinter. ¿En que puedo ayudarte ${activeUser}?.`,
        assistant: activeUser,
      },
    ]);
    setChatHistory([
      {
        inputs: { question: `Hola. Mi nombre es ${activeUser}.` },
        outputs: {
          answer: `Hola soy tu rata personal. ¿En que puedo ayudarte?.`,
        },
      },
    ]);
  };

  // Función para enviar un mensaje
  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const newMessage = {
        user: "user",
        text: inputValue.trim(),
        assistant: activeUser,
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
      setMessageTextSend(inputValue.trim());
    }
  };

  //#endregion

  //#region Chat Line
  const ChatComponent = () => {
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      chatEndRef.current?.scrollIntoView();
    }, [messages]);

    return (
      <SimpleBar className="content-inner chat-content" id="main-chat-content">
        {messages.map((message: any, index: number) => (
          <div
            key={index}
            className={`media`}
          >
            <div>
              {message.user === "bot" ? (
                <span className="avatar me-2 avatar-rounded me-4">
                  <img src={rata} alt="rat" />
                </span>
              ) : <span className="avatar me-2 avatar-rounded ms-4">
                <img src={message.assistant === "David" ? david : alex} alt="user" />
              </span>}
            </div>
            <div className="media-body">
              <div
                className={`main-msg-wrapper ${message.user === "user" ? "left bg-light ms-4" : "left"
                  }`}
              >
                <ReactMarkdown>{message.text}</ReactMarkdown>

              </div>
              {/* <div>
                <span>{new Date().toLocaleTimeString()}</span>{" "}
                <Link to="#">
                  <i className="icon ion-android-more-horizontal"></i>
                </Link>
              </div> */}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </SimpleBar>
    );
  };
  //#endregion

  //#region input Textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Función para ajustar la altura del textarea
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      // Restablecer la altura y luego ajustarla según el scrollHeight
      textareaRef.current.style.height = "auto";
      const maxLines = 5;
      const lineHeight = 24; // Ajusta según el tamaño de fuente del textarea
      const maxHeight = maxLines * lineHeight;

      if (textareaRef.current.scrollHeight > maxHeight) {
        textareaRef.current.style.height = `${maxHeight}px`;
        textareaRef.current.style.overflowY = "auto";
      } else {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        textareaRef.current.style.overflowY = "hidden";
      }
    }
  };
  useEffect(() => {
    adjustTextareaHeight(); // Ajusta la altura al cargar el componente
  }, [inputValue]);
  //#endregion

  //#region useEffect Send Message
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Chat_Service;
        const request: Copilot_Request = {
          chat_history: chatHistory.slice(-10), // Get the last 10 items
          tenantId: "141865c6-66e2-48e1-a63d-20d5046a0c4a",
          subscriptionName: "all",
          category: "advisor",
          assistant: activeUser,
          question: messageTextSend,
        };
        // console.log(request);
        const resp = await Copilot_Service.getChatResp(request);
        const botMessage = {
          user: "bot",
          text: resp.answer,
          assistant: resp.assistant,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setChatHistory([
          ...chatHistory,
          {
            inputs: { question: messageTextSend },
            outputs: { answer: resp.answer },
          },
        ]);
      } catch (error) {
        const botMessage = {
          user: "bot",
          text: "Lo siento ha fallado la conexión con el servidor.",
          assistant: activeUser,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } finally {
        setMessageTextSend("");
      }
    };
    if (messageTextSend != "") {
      fetchData();
    }
  }, [messageTextSend]);
  //#endregion

  return (
    <>
      <Container fluid className="copilot-container mt-5">
        {/* Contenido del chat */}
        <Row className="copilot-body mt-5 p-2">
          <Col>
            <ChatComponent />
          </Col>
        </Row>
        {/* Pie para enviar mensajes */}
        <Row>
          <Col xs={2}>
            <Select
              options={TemptingData}
              classNamePrefix="Select2"
              defaultValue={TemptingData.find(item => item.value === activeUser)}
              onChange={handleChangeUser}
              menuPlacement="top"
            />
          </Col>
          <Col xs={10}>
            <div className="input-container">
              <OverlayTrigger overlay={<Tooltip>New Chat</Tooltip>}>
                <div className="p-2">
                  <button
                    className="btn btn-icon btn-sm waves-effect btn-success-light rounded-pill btn-wave"
                    onClick={handleClearChat}
                  >
                    N
                  </button>
                </div>
              </OverlayTrigger>
              <textarea
                ref={textareaRef}
                placeholder={
                  messageTextSend === ""
                    ? "Escribe una pregunta..."
                    : "Esperando respuesta..."
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                rows={1}
                className="message-textarea"
                disabled={messageTextSend !== ""}
              />
              {messageTextSend === "" && (
                <button className="send-button" onClick={handleSendMessage}>
                  ➤
                </button>
              )}
            </div>
          </Col>
        </Row>


      </Container>
    </>
  );
};

export default Copilot;
