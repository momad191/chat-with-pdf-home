"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SidebarWrapper from "../../../components/SidebarWrapper";
import SubscriptionButton from "@/components/SubscriptionButton";
import { FaCheckCircle } from "react-icons/fa";
import { useTranslations } from "next-intl";

const Upgrade = ({ session, isPro }) => {
  const t = useTranslations("Upgrade");

  const router = useRouter();
  const [user, setUser] = useState({
    image: "",
    name: "", // Fix: was missing underscore in the UI code
    age: "",
    sex: "",
    job: "",
    education: "",
    interests: "",
    email: "",
    bio: "",
    membership: "",
  });

  useEffect(() => {
    fetch("/api/users/profile")
      .then((res) => res.json())
      .then((data) => {
        setUser((prev) => ({
          ...prev,
          ...data, // Merge fetched data with existing structure
          user_name: data.user_name || "", // Ensure no undefined values
          image: data.image || "",
          age: data.age || "",
          sex: data.sex || "",
          job: data.job || "",
          education: data.education || "",
          interests: data.interests || "",
          email: data.email || "",
          bio: data.bio || "",
          membership: "Basic",
        }));
      })
      .catch((error) => console.error("Failed to fetch profile:", error));
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { email, ...updatedUserData } = user; // Remove email before sending
  //   const response = await fetch("/api/users/upgradeuser", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(updatedUserData),
  //   });

  //   if (response.ok) {
  //     alert("Account upgraded successfully");
  //     router.push("/dashboard");
  //   } else {
  //     alert("Failed to upgrad cccount");
  //   }
  // };

  const plans = [
    {
      name: "Basic",
      price: "$9/mo",
      features: [
        "Upload up to 10 PDFs",
        "Basic AI Chat Responses",
        "Standard Support",
      ],
    },
    {
      name: "Pro",
      price: "$19/mo",
      features: [
        "Upload Unlimited PDFs",
        "Advanced AI Chat Responses",
        "Priority Support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom Pricing",
      features: [
        "Unlimited PDFs & Users",
        "Dedicated AI Model",
        "24/7 Support & API Access",
      ],
    },
  ];



  return (
    <div className="md:flex ">
      <SidebarWrapper session={session} />

      <div className="min-h-screen flex  items-center justify-center  w-[100%]  bg-gradient-to-b bg-white p-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {" "}
            {t("Upgrade to Plus")}
          </h2>
          <p className="text-lg font-normal text-gray-700 mb-8">
            {t("Take advantage of the features after upgrading")} /
            <span className="text-red-800"> {t("cancel any time")} </span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 border border-blue-300 flex flex-col justify-between">
              <h3 className="text-3xl font-semibold text-gray-900">
                {t("Plus")}
              </h3>
              <p className="text-2xl font-bold text-blue-600 mt-2 ">
                {" "}
                {t("$20/mo")}{" "}
              </p>
              <ul className="mt-4 space-y-2 text-gray-700 text-xl font-bold">
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 text-3xl" />{" "}
                  {t("Unlimited PDFs")}
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 text-3xl" />{" "}
                  {t("Unlimited Questions")}
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 text-3xl" />{" "}
                  {t("2,000 Pages/PDF")}
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 text-3xl" />{" "}
                  {t("32 MB/PDF")}
                </li>
              </ul>
              {/*  <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <InputField label="membership" name="membership" value={user.membership || ""} onChange={handleChange} /> */}
              {/* <button
               type="submit"
              className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-lg">
              Choose Plan
              </button> 
              
              </form>*/}
              <SubscriptionButton isPro={isPro} />
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};


// Reusable input component
function InputField({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-gray-700 font-semibold">{label}</label>
      <input
        className="w-full bg-gray-200 text-black border-2 border-gray-100 p-2 rounded-md focus:ring focus:ring-gray-300 outline-none"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Upgrade;
