'use client'
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const Project = ( { title, description, src_list, href = "#" } ) => {
    const [img_index, setIMG_Index] = useState(0)

    useEffect(() => {
        const timerId = setInterval(()=> {
          img_index < src_list.length - 1 ?
            setIMG_Index(img_index + 1) :
            setIMG_Index(0)
        }, 2500);
        return () => clearInterval(timerId);
    }, [img_index, src_list]);

    return (
        <motion.div className="text-white bg-neutral-900 rounded-xl m-4 shadow-sm relative pb-4 overflow-hidden"
            initial={{opacity: 0, scale: 0.01}}
            whileInView={{opacity: 1, scale: 1}}
            transition={{duration: 0.3}}
        >
            <AnimatePresence>
                <motion.div className="flex overflow-hidden absolute p-4"
                    key={src_list[img_index]}
                    initial={{ x: 300, opacity: 0}}
                    animate={{ x: 0, opacity: 1}}
                    exit={{ x: -300, opacity: 0}}
                >
                    <Image
                        className="rounded-xl object-cover object-center h-[180px] w-[100]"
                        src={src_list[img_index]}
                        width={700}
                        height={700}/>
                </motion.div>
            </AnimatePresence>

            <h1 className="pt-4 text-xl text-center pt-[13.5rem]">{ title }</h1>
            <p className="text-sm p-4 text-neutral-500">{ description }</p>
            <Link href={href} className="bg-indigo-500 p-3 block rounded-xl text-center text-sm hover:bg-indigo-300 ml-4 mr-4">VIEW</Link>
        </motion.div>
    )
}