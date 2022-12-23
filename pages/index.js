import Head from "next/head";
import Image from "next/image";
import { useState, useCallback } from "react";
import NavBar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import getBase64 from "../utils/getBase64";
import uploadIcon from "../public/icons/imgicon.png";
import {
  ArrowsRightLeftIcon,
  XMarkIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Badge,
  Spinner,
  Tooltip,
  Textarea,
  Label,
} from "flowbite-react";
import FeedBack from "../components/Feedback";

const formatText = (textArray) => {
  let formatedText = "";
  textArray.forEach((line) => {
    formatedText += line + "\n";
  });
  return formatedText;
};

export default function Home() {
  const [Languages, setLanguages] = useState(["English", "Arabic "]);
  const [viewImage, setViewImage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [textResults, settextResults] = useState();

  const swapLanguages = useCallback(() => {
    setLanguages([Languages[1], Languages[0]]);
  }, [Languages]);

  const clearResult = useCallback(() => {
    settextResults(null);
    setViewImage(null);
    setisError(null);
  }, []);

  const handleUpload = useCallback(
    async (fileList) => {
      let [srcLang, outLang] = ["", ""];
      if (Languages[0] === "English") {
        [srcLang, outLang] = ["eng", "ara"];
      } else {
        [srcLang, outLang] = ["ara", "eng"];
      }
      const img = await getBase64(fileList[0]);
      setViewImage(img);
      setisLoading(true);

      const translateResult = await (
        await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            img,
            srcLang,
            outLang,
          }),
        })
      ).json();
      if (translateResult.detectedText) {
        settextResults(translateResult);
        setViewImage(null);
      } else {
        setisLoading(false);
        setisError(true);
      }
    },
    [Languages]
  );

  return (
    <div>
      <Head>
        <title>Online OCR</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <div className=' h-full   dark:text-white'>
        <NavBar />
        <div className=' m-5 md:m-15 py-5 px-3 rounded-xl bg-gray-100 dark:bg-slate-800'>
          {/* Options Panel */}
          <div className='flex justify-center  relative'>
            {/* Lang Switch Button */}
            <div className='flex gap-4 justify-center items-center '>
              <div className='w-20 text-right'>{Languages[0]}</div>
              <Button onClick={swapLanguages} color='gray' outline pill>
                <ArrowsRightLeftIcon className='w-3 h-3' />
              </Button>
              <div className='w-20 text-left'>{Languages[1]}</div>
            </div>
            <div className='hidden md:flex gap-5 absolute right-10'>
              <Tooltip
                content={<FeedBack />}
                placement='bottom'
                trigger='click'
                animation='duration-500'
              >
                <Button color={"gray"} className='h-[42px]'>
                  <FaceSmileIcon className='w-4 h-4' />
                </Button>
              </Tooltip>
              {(textResults || isError) && (
                <Button color={"gray"} onClick={clearResult}>
                  <XMarkIcon className='w-4 h-4' />
                </Button>
              )}
            </div>
          </div>
          {/* upload button and image area */}
          <div className=' flex justify-center items-center rounded-xl border-dashed border-2 border-gray-300 dark:border-gray-700 mt-4 px-4 py-6  '>
            {!(viewImage || textResults) && (
              <label className='relative flex flex-col justify-center  items-center w-[300px] cursor-pointer md:py-14'>
                <Image
                  src={uploadIcon}
                  alt='upload'
                  height={100}
                  objectFit='contain'
                />
                <p className='md:text-2xl text-slate-600 dark:text-white  my-4 font-semibold text-center'>
                  Drag file here or{" "}
                  <span className='dark:text-yellow-300 text-blue-400'>
                    select file to upload
                  </span>
                </p>
                <input
                  onChange={(e) => handleUpload(e.target.files)}
                  type='file'
                  className='absolute block opacity-0 w-full h-full'
                  multiple={false}
                  accept='.jpg, .jpeg, .png'
                />
              </label>
            )}
            {viewImage && (
              <div className='relative'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={viewImage}
                  alt='uploaded img'
                  className='object-contain max-h-[300px] blur-sm '
                />

                <div className=' absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center'>
                  {isLoading && (
                    <div className='drop-shadow-lg bg-white py-3 px-5 rounded-[25%] '>
                      <Spinner size='xl' />
                    </div>
                  )}
                  {isError && (
                    <div className='bg-black/70  p-5 rounded-[15px]'>
                      <p className='text-red-500 text-sm text-center'>
                        An Error occured while proccessing this img, please try
                        again.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {textResults && (
              <div className='grid grid-cols-2 w-full justify-center items-center gap-x-10'>
                <div className='col-span-2 md:col-span-1'>
                  <div id='textarea1'>
                    <div className='mb-2 block'>
                      <Label htmlFor='comment' value='Detected Text' />
                    </div>
                    <Textarea
                      className='resize-none'
                      id='original'
                      rows={8}
                      value={formatText(textResults.detectedText)}
                      readOnly
                    />
                  </div>
                </div>
                <div className='col-span-2 md:col-span-1'>
                  <div id='textarea2'>
                    <div className='mb-2 block'>
                      <Label htmlFor='comment' value='Translated Text' />
                    </div>
                    <Textarea
                      className='resize-none'
                      id='original'
                      rows={8}
                      value={formatText(textResults.translatedText)}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='flex justify-center md:hidden gap-5 mt-3'>
            <Tooltip
              content={<FeedBack />}
              placement='bottom'
              trigger='click'
              animation='duration-500'
            >
              <Button color={"gray"} className='h-[42px]'>
                <FaceSmileIcon className='w-4 h-4' />
              </Button>
            </Tooltip>
            {(textResults || isError) && (
              <Button onClick={clearResult} color={"gray"}>
                <XMarkIcon className='w-4 h-4' />
              </Button>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
