'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Currency = 'USD' | 'IDR';

const EXCHANGE_RATE_USD_TO_IDR = 16000;

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatCurrency: (amountInUsd: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<Currency>('USD');

  useEffect(() => {
    const storedCurrency = localStorage.getItem('rideasy-currency') as Currency | null;
    if (storedCurrency && (storedCurrency === 'USD' || storedCurrency === 'IDR')) {
      setCurrencyState(storedCurrency);
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    localStorage.setItem('rideasy-currency', newCurrency);
    setCurrencyState(newCurrency);
  };

  const formatCurrency = (amountInUsd: number): string => {
    if (currency === 'IDR') {
      const amountInIdr = amountInUsd * EXCHANGE_RATE_USD_TO_IDR;
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(amountInIdr);
    }
    // Default to USD
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amountInUsd);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
