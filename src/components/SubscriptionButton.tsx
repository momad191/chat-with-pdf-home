"use client";
import React from "react";
import axios from "axios";
import {useTranslations} from 'next-intl'; 
 
type Props = { isPro: boolean };


const SubscriptionButton = (props: Props) => {
  const t = useTranslations('SubscriptionButton');

  const [loading, setLoading] = React.useState(false);
  const handleSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    } 
  };
  return (
    <button
    className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-lg text-2xl font-bold"
    disabled={loading} onClick={handleSubscription}>
      {props.isPro ? t('Manage Subscriptions') : t('Get Plus')}
    </button>
  );
};

export default SubscriptionButton;