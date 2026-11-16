import { motion } from 'framer-motion'
import PageShell from './PageShell'
import CONFIG from '../config'

export default function MemoryTimeline({ onNext }) {
  return (
    <PageShell
      id="timeline"
      gradient="from-sky-blue via-lavender to-beige"
      bgItems={['🌟', '💫', '☁️']}
      heading="A Little Walk Down Memory Lane"
      onNext={onNext}
      nextLabel="100 Reasons You're Amazing"
    >
      <div className="relative w-full max-w-xl lg:max-w-6xl">
        <div className="absolute left-4 sm:left-1/2 lg:left-0 top-0 lg:top-1/2 h-full lg:h-0.5 w-0.5 lg:w-full sm:-translate-x-1/2 lg:translate-x-0 lg:-translate-y-1/2 bg-gradient-to-b lg:bg-gradient-to-r from-gold via-rose-red to-burgundy" />
        <div className="flex flex-col lg:flex-row gap-10">
          {CONFIG.timeline.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className={`relative flex items-center gap-4 ${
                i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse sm:text-right'
              }`}
            >
              <div className="glass-card w-full flex-1 rounded-2xl px-6 py-5 shadow-card ml-8 sm:ml-0 lg:mt-8">
                <div className="mb-1 text-2xl">{item.emoji}</div>
                <h3 className="font-display font-semibold text-burgundy text-xl sm:text-2xl">{item.title}</h3>
                <p className="font-body text-burgundy/70 text-sm sm:text-base lg:text-lg">{item.text}</p>
              </div>
              <span className="absolute left-4 sm:left-1/2 lg:left-auto lg:top-0 lg:bottom-auto lg:left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-gold shadow-glow block" />
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
