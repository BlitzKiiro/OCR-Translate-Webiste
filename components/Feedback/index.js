/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from "react";
import { Button } from "flowbite-react";
import useBrowserContext from "../../hooks/useBrowerContext";

const FeedBack = () => {
  const { info } = useBrowserContext();
  const [isGiven, setisGiven] = useState();

  const sendFeedback = useCallback(
    async (feed) => {
      await fetch("https://639dc7653542a261304f8f96.mockapi.io/api/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ feed, info }),
      });
      localStorage.setItem("feedbackGiven", true);
      setisGiven(true);
    },
    [info]
  );

  const clearFeedback = useCallback(() => {
    localStorage.removeItem("feedbackGiven");
    setisGiven(false);
  }, []);

  useEffect(() => {
    setisGiven(localStorage.getItem("feedbackGiven"));
  }, []);

  return (
    <div className='w-[220px] p-2'>
      {!isGiven && (
        <div>
          <p className='font-semibold text-center'>
            Tell us what you think about our website
          </p>
          <div className='flex justify-center gap-4 px-1 py-5'>
            <img
              className='cursor-pointer'
              src='/svgs/angry.svg'
              alt='angry'
              width={40}
              onClick={() => {
                sendFeedback("angry");
              }}
            />
            <img
              className='cursor-pointer'
              src='/svgs/confused.svg'
              alt='neutral'
              width={40}
              onClick={() => {
                sendFeedback("neutral");
              }}
            />
            <img
              className='cursor-pointer'
              src='/svgs/in-love.svg'
              alt='angry'
              width={40}
              onClick={() => {
                sendFeedback("love");
              }}
            />
          </div>{" "}
        </div>
      )}
      {isGiven && (
        <div className='flex flex-col justify-center  items-center'>
          <div className='flex justify-center gap-4 px-1 pt-4 pb-2'>
            <img
              className='cursor-pointer'
              src='/svgs/happy.svg'
              alt='angry'
              width={80}
            />
          </div>
          <p className='font-semibold text-[16px] text-center pb-4'>
            Thanks for the feedback 👍
          </p>
          <Button onClick={clearFeedback} size='xs' color={"gray"}>
            Change Raring
          </Button>
        </div>
      )}
    </div>
  );
};

export default FeedBack;
