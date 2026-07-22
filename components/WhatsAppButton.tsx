'use client';

import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '237693480836';
const DEFAULT_MESSAGE = "Bonjour M2HC, j'aimerais avoir plus d'informations.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contacter M2HC sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 hover:shadow-3xl bg-[#25D366] hover:bg-[#1ebe5b]"
    >
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.7 4.61 1.908 6.484L4 29l7.723-1.867A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.9a9.86 9.86 0 0 1-5.02-1.377l-.36-.214-4.584 1.108 1.128-4.463-.235-.375A9.86 9.86 0 0 1 5.1 15c0-6.02 4.884-10.9 10.904-10.9 6.02 0 10.9 4.88 10.9 10.9 0 6.019-4.88 10.9-10.9 10.9Zm5.94-8.156c-.326-.163-1.926-.951-2.225-1.06-.298-.108-.515-.163-.732.163-.217.326-.84 1.06-1.03 1.278-.19.217-.38.244-.706.081-.326-.163-1.377-.508-2.622-1.618-.969-.865-1.624-1.934-1.814-2.26-.19-.326-.02-.502.143-.664.146-.146.326-.38.489-.57.163-.19.217-.326.326-.543.109-.217.054-.408-.027-.57-.081-.163-.732-1.766-1.003-2.42-.264-.635-.532-.549-.732-.559l-.624-.011c-.217 0-.57.081-.868.408-.298.326-1.137 1.111-1.137 2.71 0 1.6 1.164 3.145 1.326 3.362.163.217 2.29 3.497 5.55 4.905.776.335 1.381.535 1.853.685.778.248 1.486.213 2.046.129.624-.093 1.926-.787 2.198-1.548.272-.76.272-1.412.19-1.548-.081-.136-.298-.217-.624-.38Z"/>
      </svg>
    </motion.a>
  );
}
