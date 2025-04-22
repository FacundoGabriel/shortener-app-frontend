import { useEffect, useState } from "react";
import { Form, Button, Toast } from "react-bootstrap";
import { FaClipboard } from "react-icons/fa";
import './UrlC.css'

export const UrlC = () => {
  const [url, setUrl] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const fullText = "http://www.ejemplo.com";
  const [index, setIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [resData, setResData] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("info");
    
  useEffect(() => {
    const interval = setInterval(() => {
      if (!reverse) {
        if (index < fullText.length) {
          setPlaceholder(fullText.slice(0, index + 1));
          setIndex((prev) => prev + 1);
        } else {
          setReverse(true);
        }
      } else {
        if (index > 0) {
          setPlaceholder(fullText.slice(0, index - 1));
          setIndex((prev) => prev - 1);
        } else {
          setReverse(false);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [index, reverse]);

  const API_URL = "https://shortener-app-backend.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setToastMessage("❌ El campo está vacío. Por favor, ingresá una URL.");
      setToastType("error");
      setShowToast(true);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/link/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl: url,
        }),
      });

      const data = await res.json();
      if (res.ok && data.shortUrl) {
        setResData(data);
        setToastMessage("✅ ¡Tu URL fue acortada con éxito!");
        setToastType("success");
        setShowToast(true);
        setUrl("");
      } else {
        setToastMessage("❌ La URL que ingresaste no es válida.");
        setToastType("error");
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error al enviar la URL:", error);
      setToastMessage("Ocurrió un error al acortar la URL.");
      setShowToast(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resData.shortUrl);
    setToastMessage("📋 ¡La URL se copió al portapapeles!");
    setToastType("info");
    setShowToast(true);
  };

  return (
    <div className="container-xl mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-7">
          <h5 className="mb-4 text-center text-secondary">
            Pegá aquí el URL que querés acortar
          </h5>
          <Form onSubmit={handleSubmit} className="d-flex">
            <Form.Control
              type="text"
              placeholder={placeholder}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="me-2 custom-input"
            />
            <Button variant="primary" type="submit">
              Acortar
            </Button>
          </Form>
        </div>

        <div className="col-12 col-lg-6">
          {resData && (
            <div className="mt-4 text-center">
              <p className="text-success">URL acortada:</p>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control bg-dark text-light pr-5"
                  value={resData.shortUrl}
                  readOnly
                />
                <FaClipboard
                  className="copy-icon"
                  onClick={handleCopy}
                  title="Copiar"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        className={`position-fixed bottom-0 end-0 m-3 custom-message toast-${toastType}`}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};
