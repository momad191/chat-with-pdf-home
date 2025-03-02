
"use client"
import Navbar from "@/components/navbar"
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";

export default function ContactUs() {
  const router = useRouter();
  const YOUR_RECAPTCHA_SITE_KEY=process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      alert("Please verify the reCAPTCHA");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captcha: captchaValue }),
      });
      const data = await res.json();
      setResponse(data);
      router.push("/");

    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
        <Navbar />
        <div className="min-h-screen flex flex-col">
        <main className="flex-grow bg-gradient-to-b from-blue-100 to-blue-300 flex items-center justify-center text-center">
        <div className="container mx-auto px-4">


        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="email" name="email" placeholder="youremail@example.com" onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="message" placeholder="Your Message" onChange={handleChange} required className="w-full h-[250px] p-2 border rounded"></textarea>
        <ReCAPTCHA sitekey={YOUR_RECAPTCHA_SITE_KEY} onChange={setCaptchaValue} />
        <button type="submit" disabled={loading} className="w-full p-2 bg-blue-500 text-white rounded">{loading ? "Sending..." : "Submit"}</button>
      </form>
      {response && <p className="text-green-500 mt-2">{response.message}</p>}
    </div>
      
 

            </div>
          </main>
        </div>
    </div>
  )
}

 