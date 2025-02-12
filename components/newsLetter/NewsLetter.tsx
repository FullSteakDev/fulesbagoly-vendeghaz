// @ts-nocheck

'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

const NewsletterForm = () => {
  const [email, setEmail] = useState("");

   // Reguláris kifejezés az email validációhoz
    const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const subscribeOnClick = async () => {

    if (!email) {
      return toast.error("Kérjük, töltsd ki az Email cím mezőt!");
    }

    if (!validateEmail(email)) {
      return toast.error("Kérjük, érvényes email címet adj meg!");
    }
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Hiba történt");
      }
      toast("🦉 Sikeres feliratkozás 🦉");
      setEmail(""); // Clear the input after successful submission
    } catch (error: any) {
      toast.error(error.message);
    }
  }
    return(
    <section className='container mx-auto px-4'>
      <form className='bg-primary text-white px-4 rounded-xl md:rounded-[30px] flex flex-col justify-center items-center py-6 md:py-24'>
        <p className='md:font-semibold text-lg md:text-xl text-center mb-3'>
          Tudj meg többet vendégházunkról, értesülj elsőként akcióinkról
        </p>
        <h6 className='md:font-semibold font-medium text-2xl md:text-3xl lg:text-5xl text-center'>
          🦉 Iratkozz fel hírlevelünkre 🦉
        </h6>

        <div className='flex-col justify-center w-full md:flex-row flex pt-12'>
          <input
            type='email'
            placeholder='Email cím'
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Only updates state
            className='bg-[#026057] h-11 md:h-16 mb-2 md:mb-0 rounded-xl pl-6 md:mr-5 md:w-[452px] text-white placeholder:text-white focus:outline-none'
            required // Kötelező mező
          />
          <button onClick={subscribeOnClick} type='button' className='btn-tertiary'>
            🦉 Feliratkozás 🦉
          </button>
        </div>
      </form>
    </section>
    )
};

export default NewsletterForm;