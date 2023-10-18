import { useState } from "react";
import CardContainer from "../layouts/CardContainer";

const NewMessage = ({ submitForm, deleteAllMessages, showDeleteAll }) => {
  const [message, setMessage] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    submitForm(message);
    setMessage("");
  };

  return (
    <CardContainer classes="p-4 flex flex-col gap-2 w-full md:w-2/5 self-start">
      <div className="text-md">
        Type something in the box below, then hit post!
      </div>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          handleSubmitForm(e);
        }}
      >
        <input
          className="border border-slate-300 focus:outline-none rounded-md px-1"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-blue-700 text-white px-4 rounded-md">Post</button>
      </form>
      {showDeleteAll && (
        <div
          className="text-red-700 underline cursor-pointer"
          onClick={deleteAllMessages}
        >
          Delete All Messages
        </div>
      )}
    </CardContainer>
  );
};

export default NewMessage;
