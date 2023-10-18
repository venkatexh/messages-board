/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import CardContainer from "../layouts/CardContainer";
import MessageBox from "./MessageBox";
import Pagination from "../core/Pagination";

const MessageList = ({ messages, loading, error, deleteMessage }) => {
  const [sort, setSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCapacity, _] = useState(8);
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    setPagesCount(Math.ceil(messages.length / pageCapacity));
  }, [messages.length, pageCapacity]);

  const handleSort = () => {
    setSort((prev) => !prev);
  };

  const handlePageNext = () => {
    if (currentPage < pagesCount) setCurrentPage((page) => page + 1);
  };

  const handlePagePrevious = () => {
    if (currentPage !== 1) {
      setCurrentPage((page) => page - 1);
    }
  };

  const messagesToRender = () => {
    return messages
      .slice(
        currentPage === 1 ? 0 : pageCapacity * currentPage - pageCapacity,
        pageCapacity * currentPage
      )
      .sort((a, b) => {
        const x = new Date(a.timestamp);
        const y = new Date(b.timestamp);
        return sort ? y - x : x - y;
      });
  };

  const renderLoading = () => (
    <div className="w-full h-full justify-center flex items-center">
      Loading..
    </div>
  );

  const renderError = () => (
    <div className="w-full h-full justify-center flex items-center">
      Something went wrong.
    </div>
  );

  return (
    <CardContainer classes="w-full md:w-3/5  p-4 min-h-[calc(100vh-100px)] flex flex-col justify-between">
      {loading && renderLoading()}
      {error && renderError()}
      <div>
        <div className="flex justify-end mb-2">
          <div
            className="text-blue-700 underline cursor-pointer"
            onClick={() => handleSort()}
          >
            {sort ? "Unsort by time" : "Sort by time"}
          </div>
        </div>
        {messagesToRender().map((message) => (
          <MessageBox
            key={message.id}
            author={message.source}
            content={message.text}
            timestamp={message.timestamp}
            deleteMessage={() => deleteMessage(message.id)}
          />
        ))}
      </div>
      <Pagination
        previousPage={handlePagePrevious}
        nextPage={handlePageNext}
        currentPage={currentPage}
      />
    </CardContainer>
  );
};

export default MessageList;
