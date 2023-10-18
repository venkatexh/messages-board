import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessageList from "../components/messages/MessageList";
import NewMessage from "../components/messages/NewMessage";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import { deleteRequest, getRequest, postRequest } from "../utils/axios-client";
import { toastProperties } from "../constants/toast-properties";

const IndexPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await getRequest("messages/");
        if (res.status === 200) {
          setMessages(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(err.message);
        toast.error(err.message, toastProperties);
      }
    };
    fetchMessages();
  }, []);

  const handleNewMessage = async (message) => {
    try {
      const res = await postRequest("messages/", { text: message });
      if (res.status === 201) {
        setMessages((prev) => [...prev, res.data]);
        toast.success("New message added", toastProperties);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message, toastProperties);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      const res = await deleteRequest(`messages/${id}/`);
      if (res.status === 204) {
        setMessages(messages.filter((message) => message.id !== id));
        toast.info("Message deleted", toastProperties);
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message, toastProperties);
    }
  };

  const handleDeleteAllMessages = async () => {
    try {
      for (let message of messages) {
        const res = await deleteRequest(`messages/${message.id}/`);
        if (res.status !== 204) {
          throw new Error("Something went wrong.");
        }
      }
      setMessages([]);
      toast.info("All messages deleted", toastProperties);
      setShowConfirmationModal(false);
    } catch (err) {
      console.error(err);
      toast.error(err.message, toastProperties);
    }
  };

  return (
    <div className="m-4">
      <div className="text-3xl my-4">Message Board</div>
      <div className="flex flex-col-reverse md:flex-row gap-4">
        <MessageList
          messages={messages}
          loading={loading}
          error={error}
          deleteMessage={handleDeleteMessage}
        />
        <NewMessage
          submitForm={(message) => handleNewMessage(message)}
          deleteAllMessages={() => setShowConfirmationModal(true)}
          showDeleteAll={messages.length > 1}
        />
      </div>
      {showConfirmationModal && (
        <ConfirmationModal
          message="Are you sure you want to delete all messages?"
          handleYesClick={handleDeleteAllMessages}
          handleNoClick={() => setShowConfirmationModal(false)}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default IndexPage;
