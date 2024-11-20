import React from "react";

const Test = () => {
  return (
    <>
      <div className=" w-full h-screen p-[50px] flex  items-end flex-col">
        Profile name
        <ul className="list-disc">
          <li>Name one</li>
          <li>Name two</li>
          <li>
            Name three
            <ul className="list-decimal ml-[20px]">
              <li>sub name</li>
              <li>
                sub name
                <ul className="list-[square] ml-[20px]">
                  <li>Nested name</li>
                  <li>Nested name</li>
                  <li>Nested name</li>
                  <li>Nested name</li>
                </ul>
              </li>
              <li>sub name</li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Test;
