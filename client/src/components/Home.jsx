import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const HomePage = () => {
  const controls = useAnimation();
  const titleControls = useAnimation();

  useEffect(() => {
    const animation = async () => {
      await controls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: 'easeOut',
        },
      });
      await titleControls.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: 'easeOut',
          delay: 0.2,
        },
      });
    };
    animation();
  }, [controls, titleControls]);

  return (
    <div className="h-screen w-screen overflow-hidden m-0 p-0">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={controls}
        className="flex flex-col relative h-full w-full"
      >
        <img
          src="/background.jpg"
          alt="Geocel Enterprises Hardware"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-8 rounded-lg text-center">
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={titleControls}
            className="text-4xl font-bold mb-4"
          >
            Geocel Enterprises Hardware
          </motion.h1>
          <p className="text-2xl text-gray-600">
            Your partner for quality building materials
          </p>
          <p className="text-xl text-gray-600 mt-4">
            Welcome to Geocel Enterprises Hardware, a leading provider of quality products and services.
            We are dedicated to delivering exceptional solutions that meet the needs of our valued customers.
          </p>
          <a
            href="/products"
            className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded mt-6"
          >
            Shop Now
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
