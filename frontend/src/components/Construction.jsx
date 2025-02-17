import { motion } from 'framer-motion'

export default function Construction({ height }) {
  const messages = ["Work in Progress...", "Coming Soon...", "Updating Features..."];


  function ChangingText() {
    return (
      <motion.p
        className="mt-4 text-xl"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {messages[Math.floor(Math.random() * messages.length)]}
      </motion.p>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white text-center" style={{height: `${height}px`}}>
        {/* Blinking Heading */}
        <motion.h1 
          className="text-3xl md:text-6xl font-bold pb-[50px]"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          🚧 Under Construction 🚧
        </motion.h1>

        {/* Rotating Loader */}
        <motion.div
          className="w-12 h-12 border-4 border-gray-300 border-t-yellow-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />

        {/* Moving Worker Icon */}
        <motion.div
          className="text-4xl mt-6 py-[50px]"
          animate={{ x: ["-50%", "50%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        >
          👷‍♂️ 🔨
        </motion.div>

        {/* Changing Messages */}
        <ChangingText />
      </div>
  )
}