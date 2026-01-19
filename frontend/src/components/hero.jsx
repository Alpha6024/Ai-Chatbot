import { useNavigate } from "react-router";
import { motion, useAnimation } from "framer-motion";

export default function Hero() {
    const navigate = useNavigate();

    const c1 = useAnimation();
    const c2 = useAnimation();
    const c3 = useAnimation();
    const c4 = useAnimation();

    const handleHover = () => {
    const circleHalf = 120;
    const yTarget = window.innerHeight / 2;

    c1.start({
        x: -window.innerWidth / 2 + circleHalf,
        y: yTarget,
        transition: { duration: 1.2, ease: "easeInOut" }
    });

    c2.start({
        x: -circleHalf,
        y: yTarget,
        transition: { duration: 1.2, ease: "easeInOut" }
    });

    c3.start({
        x: circleHalf,
        y: yTarget,
        transition: { duration: 1.2, ease: "easeInOut" }
    });

    c4.start({
        x: window.innerWidth / 2 - circleHalf,
        y: yTarget,
        transition: { duration: 1.2, ease: "easeInOut" }
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
};


    return (
        <>
        <div className="relative h-screen w-full gap-2 flex flex-col justify-center items-center bg-white overflow-hidden">
            
            <div className="text-6xl text-gray-700 font-maint z-0 select-none">
                AI-CHATBOT
            </div>


            <div
                onMouseEnter={handleHover}
                className="absolute flex z-10"
            >
                <motion.div
                    className="h-60 w-60 bg-red-500 rounded-full -mr-32"
                    initial={{ y: 0 }}
                    animate={c1}
                />
                <motion.div
                    className="h-60 w-60 bg-blue-500 rounded-full -mr-32"
                    initial={{ y: 0 }}
                    animate={c2}
                />
                <motion.div
                    className="h-60 w-60 bg-yellow-300 rounded-full -mr-32"
                    initial={{ y: 0 }}
                    animate={c3}
                />
                <motion.div
                    className="h-60 w-60 bg-green-600 rounded-full"
                    initial={{ y: 0 }}
                    animate={c4}
                />
            </div>

            
        </div>
        
</>
    );
}
