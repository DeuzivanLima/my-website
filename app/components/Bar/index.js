"use client";
import { motion } from "framer-motion";

export const Bar = ({ title, progress }) => {
  return (
    <div>
      <h2 className="text-neutral-400 text-sm ml-4">{title}</h2>
      <div className="bg-white m-4 text-sm text-white rounded-full mt-2">
        <motion.span
          className={`bg-[#2bbdf2] rounded-full p-1 pl-4 block`}
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 100 / progress }}
        >
          {progress}%
        </motion.span>
      </div>
    </div>
  );
};
