'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Copy, Check, Smartphone, CreditCard, Phone } from 'lucide-react';
import { brandColors } from '@/lib/theme';
import toast from 'react-hot-toast';

// Informations de paiement depuis les variables d'environnement
const PAYMENT_INFO = {
  mtn: process.env.NEXT_PUBLIC_MTN_NUMBER || 'Non configuré',
  orange: process.env.NEXT_PUBLIC_ORANGE_NUMBER || 'Non configuré',
  card: process.env.NEXT_PUBLIC_BANK_ACCOUNT || 'Non configuré',
};

type PaymentMethod = 'MTN' | 'ORANGE' | 'CARD';

export default function DonatePage() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('MTN');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success('Numéro copié !');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const paymentMethods = [
    {
      id: 'MTN' as PaymentMethod,
      name: 'MTN Mobile Money',
      icon: Phone,
      color: '#FFCC00',
      number: PAYMENT_INFO.mtn,
      instructions: 'Composez *126# puis suivez les instructions pour envoyer votre don'
    },
    {
      id: 'ORANGE' as PaymentMethod,
      name: 'Orange Money',
      icon: Phone,
      color: '#FF6600',
      number: PAYMENT_INFO.orange,
      instructions: 'Composez #150# puis suivez les instructions pour envoyer votre don'
    },
    {
      id: 'CARD' as PaymentMethod,
      name: 'Virement Bancaire',
      icon: CreditCard,
      color: brandColors.primary[600],
      number: PAYMENT_INFO.card,
      instructions: 'Effectuez un virement bancaire vers ce compte'
    },
  ];

  const currentMethod = paymentMethods.find(m => m.id === selectedMethod)!;

  return (
    <div className="min-h-screen py-16" style={{ backgroundColor: '#f9fafb' }}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Heart 
            className="w-16 h-16 mx-auto mb-4" 
            style={{ color: brandColors.secondary[500] }}
          />
          <h1 className="text-4xl font-bold mb-4" style={{ color: brandColors.primary[600] }}>
            Faire un Don
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Votre générosité change des vies. Soutenez nos programmes pour les jeunes et les personnes âgées.
          </p>
        </motion.div>

        {/* Méthodes de paiement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-6"
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: brandColors.primary[600] }}>
            Choisissez votre moyen de paiement
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = selectedMethod === method.id;
              
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{
                    borderColor: isSelected ? brandColors.primary[600] : undefined,
                    backgroundColor: isSelected ? `${brandColors.primary[600]}10` : undefined,
                  }}
                >
                  <Icon 
                    className="w-10 h-10 mx-auto mb-3" 
                    style={{ color: isSelected ? brandColors.primary[600] : method.color }}
                  />
                  <p className="font-semibold text-gray-800">{method.name}</p>
                </button>
              );
            })}
          </div>

          {/* Informations de paiement */}
          <motion.div
            key={selectedMethod}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="border-2 rounded-xl p-6"
            style={{ borderColor: brandColors.primary[200] }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold" style={{ color: brandColors.primary[600] }}>
                {currentMethod.name}
              </h3>
              <currentMethod.icon 
                className="w-8 h-8" 
                style={{ color: currentMethod.color }}
              />
            </div>

            {/* Numéro/Compte */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">
                {selectedMethod === 'CARD' ? 'Numéro de compte' : 'Numéro'}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-mono font-bold" style={{ color: brandColors.primary[600] }}>
                  {currentMethod.number}
                </p>
                <button
                  onClick={() => copyToClipboard(currentMethod.number, selectedMethod)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ 
                    backgroundColor: copiedField === selectedMethod ? brandColors.primary[600] : brandColors.primary[100],
                    color: copiedField === selectedMethod ? 'white' : brandColors.primary[600]
                  }}
                >
                  {copiedField === selectedMethod ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="rounded-lg p-4" style={{ backgroundColor: `${brandColors.primary[600]}10` }}>
              <p className="text-sm font-semibold mb-2" style={{ color: brandColors.primary[600] }}>
                Instructions :
              </p>
              <p className="text-sm text-gray-700">
                {currentMethod.instructions}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Montants suggérés */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: brandColors.primary[600] }}>
            Montants suggérés
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[5000, 10000, 25000, 50000, 100000, 250000].map((amount) => (
              <div
                key={amount}
                className="p-4 rounded-xl border-2 text-center"
                style={{ borderColor: brandColors.primary[200] }}
              >
                <p className="text-2xl font-bold" style={{ color: brandColors.primary[600] }}>
                  {amount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">FCFA</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-6">
            💡 Ces montants sont indicatifs. Vous pouvez donner le montant de votre choix.
          </p>
        </motion.div>

        {/* Impact du don */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid md:grid-cols-3 gap-6"
        >
          {[
            { amount: '5 000 FCFA', impact: 'Repas pour 5 personnes âgées' },
            { amount: '25 000 FCFA', impact: 'Kit scolaire pour 10 jeunes' },
            { amount: '100 000 FCFA', impact: 'Formation professionnelle complète' },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 text-center"
            >
              <p className="text-xl font-bold mb-2" style={{ color: brandColors.primary[600] }}>
                {item.amount}
              </p>
              <p className="text-sm text-gray-600">{item.impact}</p>
            </div>
          ))}
        </motion.div>

        {/* Note finale */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600">
            Après votre don, vous pouvez nous contacter pour obtenir un reçu fiscal.
          </p>
          <p className="text-gray-600 mt-2">
            Merci pour votre générosité ! 💙
          </p>
        </motion.div>
      </div>
    </div>
  );
}
