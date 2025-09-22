import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "motion/react"

import img1 from "../../assets/Banner/1.png";
import img2 from "../../assets/Banner/2.jpg";
import img3 from "../../assets/Banner/3.png";
import img4 from "../../assets/Banner/4.png";
import img5 from "../../assets/Banner/5.png";
import img6 from "../../assets/Banner/6.jpg";
import img7 from "../../assets/Banner/7.png";
import img8 from "../../assets/Banner/8.jpg";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query,
  {
    defaultValue = false,
    initializeWithValue = true
  } = {}
) {
  const getMatches = query => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches;
  }

  const [matches, setMatches] = useState(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    };
  }, [query])

  return matches
}

const keywords = [
  "night",
  "city",
  "sky",
  "sunset",
  "sunrise",
  "winter",
  "skyscraper",
  "building",
  "cityscape",
  "architecture",
  "street",
  "lights",
  "downtown",
  "bridge",
]

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1], filter: "blur(4px)" }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

const Carousel = memo(({
  handleClick,
  controls,
  cards,
  isCarouselActive
}) => {
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
  const cylinderWidth = isScreenSizeSm ? 1600 : 2600 
  const faceCount = cards.length
  const faceWidth = cylinderWidth / faceCount
  const radius = cylinderWidth / (2 * Math.PI)
  const rotation = useMotionValue(0)
  const transform = useTransform(rotation, (value) => `rotate3d(0, 1, 0, ${value}deg)`)

  // Auto rotation effect
  useEffect(() => {
    if (!isCarouselActive) return

    const autoRotate = () => {
      const currentRotation = rotation.get()
      controls.start({
        rotateY: currentRotation + 0.5, // Tăng tốc độ quay lên 1.5 độ
        transition: {
          duration: 0.04, // Giảm duration để mượt hơn
          ease: "linear",
        },
      }).then(() => {
        rotation.set(rotation.get() + 1.5)
      })
    }

    const interval = setInterval(autoRotate, 4) // 🔥 TĂNG FPS TẠI ĐÂY: 16ms = 60 FPS (thay vì 30ms = 33 FPS)
    
    return () => clearInterval(interval)
  }, [isCarouselActive, controls, rotation])

  return (
    <div
      className="flex h-full items-center justify-center bg-transparent"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}>
      <motion.div
        drag={isCarouselActive ? "x" : false}
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{
          transform,
          rotateY: rotation,
          width: cylinderWidth,
          transformStyle: "preserve-3d",
        }}
        onDrag={(_, info) => {
          if (isCarouselActive) {
            controls.stop() // Stop auto rotation when dragging
            rotation.set(rotation.get() + info.offset.x * 0.02)
          }
        }}
        onDragEnd={(_, info) => {
          if (isCarouselActive) {
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.02,
              transition: {
                type: "spring",
                stiffness: 60,
                damping: 40,
                mass: 0.2,
              },
            })
          }
        }}
        animate={controls}>
        {cards.map((imgUrl, i) => (
          <motion.div
            key={`key-${imgUrl}-${i}`}
            className="absolute flex h-full origin-center items-center justify-center bg-transparent"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${
                i * (360 / faceCount)
              }deg) translateZ(${radius}px)`,
            }}
            onClick={() => handleClick(imgUrl, i)}>
            <motion.img
              src={imgUrl}
              alt={`keyword_${i} ${imgUrl}`}
              layoutId={`img-${imgUrl}`}
              className="pointer-events-none w-full rounded-xl object-cover"
              initial={{ filter: "blur(4px)" }}
              layout="position"
              animate={{ filter: "blur(0px)" }}
              transition={transition} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
})

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`
function ThreeDPhotoCarousel() {
  const [activeImg, setActiveImg] = useState(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()
  const cards = useMemo(
    () => [img1, img2, img3, img4, img5, img6, img7, img8],
    []
  )

  useEffect(() => {
  }, [cards])

  const handleClick = (imgUrl) => {
    setActiveImg(imgUrl)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveImg(null)
    setIsCarouselActive(true)
  }

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeImg}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 flex items-center justify-center z-50 m-5 md:m-36 lg:mx-[19rem] rounded-3xl"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}>
            <motion.img
              layoutId={`img-${activeImg}`}
              src={activeImg}
              className="max-w-full max-h-full rounded-lg shadow-lg"
              // Start with a smaller scale
              initial={{ scale: 0.5 }}
              // Animate to full scale
              animate={{ scale: 1 }}
              // Clean ease-out curve
              transition={{
                delay: 0.5,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{
                willChange: "transform",
              }} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[500px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={cards}
          isCarouselActive={isCarouselActive} />
      </div>
    </motion.div>
  );
}

export default ThreeDPhotoCarousel