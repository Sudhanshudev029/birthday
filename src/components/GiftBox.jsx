import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  FaImages,
  FaMusic,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import PageShell from "./PageShell";
import CONFIG from "../config";

const ITEMS = [
  {
    icon: FaImages,
    label: "Gallery",
    desc: "Relive the memories",
  },
  {
    icon: FaMusic,
    label: "Favorite Song",
    desc: CONFIG.favoriteSong,
  },
  {
    icon: FaEnvelopeOpenText,
    label: "Secret Letter",
    desc: "Words from the heart",
  },
];

export default function GiftBox({ onNext }) {
  const [untied, setUntied] = useState(false);
  const [selected, setSelected] = useState(null);

  function handleUntie() {
    if (untied) return;

    setUntied(true);

    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#FFF8F0", "#C94F6D"],
    });
  }

  return (
    <>
      <PageShell
        id="gift"
        gradient="from-gold-light via-blush to-lavender"
        bgItems={["🎁", "✨", "💫"]}
        heading="One Last Gift"
        subheading={
          !untied
            ? "Pull the ribbon to open it."
            : "Everything, wrapped with love."
        }
        onNext={onNext}
        nextLabel="The Final Surprise"
        showNext={untied}
      >
        <div className="flex w-full max-w-md flex-col items-center">
          <AnimatePresence mode="wait">
            {!untied ? (
              <motion.button
                key="box"
                onClick={handleUntie}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="relative flex h-56 w-56 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-burgundy to-rose-red shadow-card"
              >
                <div className="absolute inset-x-0 top-1/2 h-6 -translate-y-1/2 bg-gold" />

                <div className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2 bg-gold" />

                <span className="z-10 text-6xl">🎀</span>

                <span className="z-10 mt-3 font-display text-white">
                  Pull the ribbon
                </span>
              </motion.button>
            ) : (
              <motion.div
                key="opened"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
              >
                {ITEMS.map(({ icon: Icon, label, desc }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    onClick={() => setSelected(label)}
                    className="glass-card cursor-pointer flex flex-col items-center gap-2 rounded-xl px-5 py-6 text-center shadow-card hover:scale-105 duration-300"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-rose-red text-white">
                      <Icon size={18} />
                    </div>

                    <p className="font-display text-base font-semibold text-burgundy">
                      {label}
                    </p>

                    <p className="font-body text-xs text-burgundy/60">
                      {desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PageShell>

      {/* POPUP */}

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-3xl p-6 w-full max-w-[95vw] sm:max-w-md lg:max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden relative"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-5 top-5 text-2xl"
              >
                ✖
              </button>

              {/* Gallery */}

              {selected === "Gallery" && (
                <>
                  <h2 className="text-3xl font-bold mb-6 text-center">
                    Gallery
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {CONFIG.photos.map((photo, index) => (
                      <div key={index}>
                        <img
                          src={photo.src}
                          alt=""
                          className="rounded-xl w-full h-60 object-cover"
                        />

                        <p className="mt-2 text-center font-semibold">
                          {photo.caption}
                        </p>

                        <p className="text-center text-sm text-gray-500">
                          {photo.date}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Song */}

              {selected === "Favorite Song" && (
                <>
                  <h2 className="text-3xl font-bold mb-6 text-center">
                    Our Song
                  </h2>

                  <audio
                    controls
                    autoPlay
                    className="w-full"
                  >
                    <source src={CONFIG.music1} type="audio/mpeg" />
                  </audio>
                </>
              )}

              {/* Letter */}

              {selected === "Secret Letter" && (
                <>
                  <h2 className="text-3xl font-bold mb-6 text-center">
                    Secret Letter
                  </h2>

                  <p className="whitespace-pre-line leading-8 text-sm sm:text-base lg:text-lg break-words">
                    {CONFIG.letter2}
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}