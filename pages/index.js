import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import getBase64 from "../utils/getBase64";
import uploadIcon from "../public/icons/imgicon.png";
import { ArrowsRightLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button, Badge, Spinner } from "flowbite-react";

export default function Home() {
  const [Languages, setLanguages] = useState(["English", "Arabic "]);
  const [isLoading, setisLoading] = useState(true);
  const [viewImage, setViewImage] = useState("");

  const swapLanguages = () => {
    setLanguages([Languages[1], Languages[0]]);
  };

  const clearImg = () => {
    setViewImage(null);
  };

  const handleUpload = async (fileList) => {
    const b64Img = await getBase64(fileList[0]);

    setViewImage(b64Img);
  };

  return (
    <div>
      <Head>
        <title>Online OCR</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <div className=' h-full   dark:text-white'>
        <NavBar />
        <div className=' m-5 md:m-15 py-5 px-3 rounded-xl bg-gray-100 dark:bg-slate-800'>
          {/* Lang Switch Button */}
          <div className='flex gap-4 justify-center items-center text'>
            <div className='w-20 text-right'>{Languages[0]}</div>
            <Button onClick={swapLanguages} color='gray' outline pill>
              <ArrowsRightLeftIcon className='w-3 h-3' />
            </Button>
            <div className='w-20 text-left'>{Languages[1]}</div>
          </div>
          {/* upload button and image area */}
          <div className=' flex justify-center items-center rounded-xl border-dashed border-2 border-gray-300 dark:border-gray-700 mt-4 px-4 py-6  '>
            {!viewImage && (
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
                <span
                  onClick={clearImg}
                  className='absolute cursor-pointer -top-3 -right-4 px-2 py-1 z-10'
                >
                  <Badge
                    color='gray'
                    className='justify-center border border-neutral-900 dark:border-neutral-200'
                    style={{ width: 25, height: 25, borderRadius: 25 }}
                  >
                    <XMarkIcon className='w-4 h-4' />
                  </Badge>
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={viewImage}
                  alt='uploaded img'
                  className={`object-contain max-h-[300px] ${
                    isLoading ? "blur-sm" : "blur-none"
                  }`}
                />
                {isLoading && (
                  <div className=' absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center'>
                    <div className='drop-shadow-lg bg-white py-3 px-5 rounded-[25%] '>
                      <Spinner size='xl' />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
