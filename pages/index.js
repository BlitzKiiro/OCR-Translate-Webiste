import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import useThemeContext from "../hooks/useThemeContext";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import getBase64 from "../utils/getBase64";
import uploadIcon from "../public/icons/upload.png";

export default function Home() {
  const { theme } = useThemeContext();
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
    console.log(fileList);
    const b64Img = await getBase64(fileList[0]);
    console.log(b64Img);
    setViewImage(b64Img);
  };

  return (
    <div className={theme.mode}>
      <Head>
        <title>Online OCR</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <div className=' h-full  dark:bg-gray-900  dark:text-white'>
        <NavBar />
        <div className=' m-5 md:m-15 py-5 px-3 rounded-xl bg-gray-100 dark:bg-slate-800'>
          {/* Lang Switch Button */}
          <div className='flex  font-semibold text-lg '>
            <span className='w-5/12 text-right'>{Languages[0]}</span>
            <span className=' w-2/12 flex justify-center '>
              <label className='transition  hover:text-blue-500   dark:hover:text-indigo-700 cursor-pointer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5'
                  />
                </svg>
                <input
                  onClick={swapLanguages}
                  type='button'
                  className='sr-only'
                />
              </label>
            </span>
            <span className='w-5/12 text-left'>{Languages[1]}</span>
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
                <p className='md:text-2xl  my-4 font-semibold text-center'>
                  Drag file here or{" "}
                  <span className='dark:text-yellow-500 text-blue-400'>
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
                  className='absolute cursor-pointer -top-2 -right-2 px-2 py-1 text-xs font-bold leading-none text-red-100 transform bg-red-600 rounded-full'
                >
                  X
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={viewImage}
                  alt='uploaded img'
                  className='object-contain max-h-[300px] '
                />
                {isLoading && <div className='w-full h-full absolute'>hi</div>}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
