import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Heart, DollarSign, Server, Globe, Users, 
  Shield, Zap, Coffee, Gift, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';

const PayPalDonation = ({ className = '', compact = false }) => {
  const { t } = useTranslation();
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const donationEmail = 'tanloifmc@yahoo.com';
  
  const predefinedAmounts = [
    { amount: 5, icon: Coffee, label: 'Coffee', description: 'Buy us a coffee' },
    { amount: 10, icon: Heart, label: 'Support', description: 'Show your support' },
    { amount: 25, icon: Star, label: 'Boost', description: 'Boost our mission' },
    { amount: 50, icon: Gift, label: 'Generous', description: 'Generous donation' },
    { amount: 100, icon: Zap, label: 'Power', description: 'Power our platform' }
  ];

  const handleDonation = (amount) => {
    const finalAmount = amount || customAmount;
    if (!finalAmount || finalAmount <= 0) {
      alert(t('pleaseSelectAmount'));
      return;
    }

    // Create PayPal donation URL
    const paypalUrl = `https://www.paypal.com/donate/?business=${encodeURIComponent(donationEmail)}&amount=${finalAmount}&currency_code=USD&item_name=${encodeURIComponent('FindSOS.org Platform Support')}`;
    
    // Open PayPal in new window
    window.open(paypalUrl, '_blank', 'width=600,height=700');
  };

  if (compact) {
    return (
      <Card className={`border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Heart className="w-5 h-5 text-pink-600 mr-2" />
              <div>
                <h4 className="font-semibold text-pink-800">{t('supportUs')}</h4>
                <p className="text-xs text-pink-600">{t('helpMaintainPlatform')}</p>
              </div>
            </div>
            <Button 
              onClick={() => handleDonation(10)}
              size="sm"
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              <DollarSign className="w-4 h-4 mr-1" />
              {t('donate')}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-pink-200 bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 ${className}`}>
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-pink-800">
          {t('supportFindSOS')}
        </CardTitle>
        <p className="text-pink-600 mt-2">
          {t('donationDescription')}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Why Donate Section */}
        <div className="bg-white/50 rounded-lg p-4">
          <h4 className="font-semibold text-pink-800 mb-3 flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            {t('whyDonate')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center text-gray-700">
              <Server className="w-4 h-4 mr-2 text-blue-500" />
              {t('serverCosts')}
            </div>
            <div className="flex items-center text-gray-700">
              <Shield className="w-4 h-4 mr-2 text-green-500" />
              {t('securityUpdates')}
            </div>
            <div className="flex items-center text-gray-700">
              <Users className="w-4 h-4 mr-2 text-purple-500" />
              {t('communitySupport')}
            </div>
            <div className="flex items-center text-gray-700">
              <Zap className="w-4 h-4 mr-2 text-yellow-500" />
              {t('newFeatures')}
            </div>
          </div>
        </div>

        {/* Donation Amounts */}
        <div>
          <h4 className="font-semibold text-pink-800 mb-3">{t('chooseAmount')}</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {predefinedAmounts.map(({ amount, icon: Icon, label, description }) => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount);
                  setShowCustom(false);
                  setCustomAmount('');
                }}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  selectedAmount === amount && !showCustom
                    ? 'border-pink-500 bg-pink-100 text-pink-800'
                    : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                }`}
              >
                <Icon className="w-6 h-6 mx-auto mb-1 text-pink-600" />
                <div className="font-semibold">${amount}</div>
                <div className="text-xs text-gray-600">{description}</div>
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowCustom(true);
                setSelectedAmount(null);
              }}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                showCustom
                  ? 'border-pink-500 bg-pink-100 text-pink-800'
                  : 'border-gray-200 hover:border-pink-300'
              }`}
            >
              {t('customAmount')}
            </button>
            {showCustom && (
              <div className="flex-1 flex">
                <span className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg px-3 py-2 text-gray-600">
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  placeholder="0"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-r-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Donation Button */}
        <div className="text-center">
          <Button
            onClick={() => handleDonation(selectedAmount)}
            size="lg"
            className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-8 py-3 text-lg font-semibold"
          >
            <Heart className="w-5 h-5 mr-2" />
            {t('donateNow')} ${showCustom ? customAmount || '0' : selectedAmount}
          </Button>
          
          <div className="mt-3 flex items-center justify-center text-sm text-gray-600">
            <Shield className="w-4 h-4 mr-1" />
            {t('securePayPal')}
          </div>
        </div>

        {/* Impact Statement */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 text-center">
          <h5 className="font-semibold text-blue-800 mb-2">{t('yourImpact')}</h5>
          <p className="text-sm text-blue-700">
            {t('impactDescription')}
          </p>
          <div className="mt-3 flex justify-center space-x-4 text-xs">
            <Badge className="bg-blue-100 text-blue-800">
              {t('globalReach')}
            </Badge>
            <Badge className="bg-green-100 text-green-800">
              {t('livesHelped')}
            </Badge>
            <Badge className="bg-purple-100 text-purple-800">
              {t('familiesReunited')}
            </Badge>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center text-sm text-gray-600">
          <p>{t('donationEmail')}: <span className="font-mono text-pink-600">{donationEmail}</span></p>
          <p className="mt-1">{t('taxDeductible')}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayPalDonation;

