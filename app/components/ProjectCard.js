"use client"
import { useState, useEffect } from 'react'
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const ProjectCard = ({
  title = "Title",
  description = "Description",
  href = "#",
  src_lists = ["/images/blog_005.png", "/images/blog_002.png"],
  techs = ["NextJS", "supabase"]
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (src_lists.length > 1) {
      const intervalId = setInterval(() => {
        setIsTransitioning(true);

        setTimeout(() => {
          setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % src_lists.length
          );
        }, 250);

        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      }, 2000);

      return () => clearInterval(intervalId);
    }
  }, [src_lists]);

  return (
    <div className="border overflow-hidden border-neutral-800 hover:border-blue-500 rounded-sm transition duration-400 bg-neutral-900">
      <div>
        <div className="relative w-full h-[60vw] max-h-[356px] overflow-hidden">
          {src_lists.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt="Project image"
              width={400}
              height={400}
              className={`
                absolute top-0 left-0 w-full h-full object-cover rounded-md
                transition-all duration-500 ease-in-out
                ${currentImageIndex === index
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'}
              `}

              priority={index === 0}
            />
          ))}
        </div>

        <div className="flex p-6 flex-col h-[21rem]">
          <h1 className="text-2xl font-bold mt-4">{title}</h1>
          <p className="text-neutral-500">{description}</p>
          <div className="flex gap-2 mt-4">
            {techs.map((tech, index) => (
              <span
                key={index}
                className="p-[0.5rem] rounded-full border-1 min-w-8 text-center border-blue-900 text-[7pt] text-blue-500 bg-[#16245677]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className='mt-auto'>
            <Link
              href={href}
              className="flex justify-center gap-2 mt-4 p-3 text-sm items-center bg-blue-500 rounded-sm"
            >
              <ArrowUpRight />
              <span>VIEW PROJECT</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
