import { AiFillDelete } from "react-icons/ai";
import { BiMessageRoundedDetail } from "react-icons/bi";

const MessageBox = ({ author, content, timestamp, deleteMessage }) => {
  return (
    <div className="flex gap-2 items-start border-b border-slate-200 pb-4">
      <div>
        <BiMessageRoundedDetail className="mt-1" />
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div>{author}</div>
            <div className="text-slate-400">
              {new Date(timestamp).toLocaleTimeString()}
            </div>
          </div>
          <AiFillDelete
            className="text-lg text-red-700 cursor-pointer"
            onClick={deleteMessage}
          />
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default MessageBox;
