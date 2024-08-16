import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrCopy } from "react-icons/gr";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux";
import { TbCopyCheckFilled } from "react-icons/tb";

const ShortLinks = () => {
  const [allURLs, setAllURLs] = useState([]);
  const [filteredURLs, setFilteredURLs] = useState([]);
  const [show, setShow] = useState({});
  const [copied, setCopied] = useState({});
  const user = useSelector((state) => state.user);
  const links = useSelector((state)=> state.url)
  const backendPortURL = "https://tiny-url-backend.vercel.app/url";

  useEffect(() => {

    console.log("links",links)
    const fetchURLs = async () => {
      try {
        const response = await axios.get(backendPortURL);
        console.log(response.data)
        let filteredData = response.data.filter((url) => url.createdBy === user._id);
        setFilteredURLs(filteredData);
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };

    fetchURLs();
  }, [user, links]);

  const handleCopyURL = (shortId) => {
    const shortURL = `${backendPortURL}/${shortId}`;

    navigator.clipboard
      .writeText(shortURL)
      .then(() => {
        console.log("URL copied to clipboard!");
        setCopied((prevCopied) => {
          // Create a new object with all previous values set to false
          const updatedCopied = Object.keys(prevCopied).reduce((acc, id) => {
            acc[id] = false;
            return acc;
          }, {});
          
          // Set only the current shortId to true
          updatedCopied[shortId] = true;

          return updatedCopied;
        });
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  const toggleShow = (id) => {
    setShow((prevShow) => ({
      ...prevShow,
      [id]: !prevShow[id],
    }));
  };

  return (
    <div>
      <div className="bg-zinc-700 rounded-tr-lg rounded-tl-lg p-3">
        <h1 className="text-gray-100 text-lg font-semibold sm:text-2xl sm:text-[#144ee3] sm:font-semibold font-serif">
          Shorten Links
        </h1>
        <div className="hidden sm:flex justify-between pt-4">
          <div className="w-full flex justify-start text-center underline">
            <h3>Short-Link</h3>
          </div>
          <div className="w-full flex justify-end underline">
            <h3>Original-Link</h3>
          </div>
          <div className="w-full flex justify-end underline">
            <h3>Total-Clicks</h3>
          </div>
          <div className="w-2/4 flex justify-end underline">
            <h3>QR-Code</h3>
          </div>
        </div>
      </div>

      <div>
        {filteredURLs.length > 0 ? (
          filteredURLs.map((url) => (
            <div key={url._id}>
              <div className="flex justify-between py-3">
                <div className="flex justify-start text-center gap-1 text-gray-400">
                  <h3 className="text-md font-mono pt-1 max-w-56 overflow-hidden  text-ellipsis sm:w-64 md:w-72">
                    {backendPortURL}
                    /{url.shortID}
                  </h3>
                  <div>
                    <div
                      className={`p-2 text-xl rounded-full ${
                        copied[url.shortID] ? "text-[#144ee3] md:text-3xl" : "bg-gray-700"
                      }`}
                      onClick={() => handleCopyURL(url.shortID)}
                    >
                      {copied[url.shortID] ? <TbCopyCheckFilled /> : <GrCopy />}
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    onClick={() => toggleShow(url._id)}
                    className="text-lg p-2 rounded-full cursor-pointer bg-zinc-700 flex justify-center text-center sm:hidden"
                  >
                    {show[url._id] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>
                </div>

                <div className="hidden sm:flex justify-between text-center sm:w-52 md:w-80">
                  <div className="text-gray-400 text-left font-mono text-wrap overflow-hidden text-ellipsis">
                    {url.redirectURL}
                  </div>
                </div>

                <div className="flex justify-between text-center sm:gap-14 md:gap-36">
                  <div className="hidden sm:flex font-mono sm:justify-between sm:pl-20">
                    {url.visitHistory.length}
                  </div>

                  <div className="hidden sm:inline-block">
                    <img
                      src={`${url.qrcode}`}
                      className="size-20 object-fill"
                      alt="QR Code"
                    />
                  </div>
                </div>
              </div>

              {show[url._id] && (
                <div className="flex justify-between text-center gap-1 sm:hidden">
                  <div className="text-gray-400 font-mono w-3/4 overflow-hidden text-ellipsis text-left">
                    {url.redirectURL}
                  </div>
                  <img
                    src={`${url.qrcode}`}
                    className="size-20 pb-1"
                    alt="QR Code"
                  />
                </div>
              )}

              <hr className="opacity-40" />
            </div>
          ))
        ) : (
          <div className="p-3 text-gray-400">No URL Available</div>
        )}
      </div>
    </div>
  );
};

export default ShortLinks;
