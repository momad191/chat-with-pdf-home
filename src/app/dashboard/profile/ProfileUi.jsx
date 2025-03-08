"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ProfileUi({ session }) {
 
  const t = useTranslations("Profile");
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
        }));
      })
      .catch((error) => console.error("Failed to fetch profile:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, ...updatedUserData } = user; // Remove email before sending
    const response = await fetch("/api/users/edituser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUserData),
    });

    if (response.ok) {
      alert("Profile updated successfully");
      router.push("/dashboard");
    } else {
      alert("Failed to update profile");
    }
  };


 

   

  return (
  
      <div className="w-full h-screen bg-gray-800 text-white shadow-lg rounded p-6">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <Image
              src={user.image || "/default-avatar.jpg"}
              width={72}
              height={72}
              alt="User Avatar"
              className="w-20 h-20 rounded-full border"
            />
            <div>
              <h2 className="text-xl">{user.name || ""}</h2>
              <p>{user.job}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <InputField
              label={t("User Name")}
              name="name"
              value={user.name || ""}
              onChange={handleChange}
            />
            <InputField
              label={t("Age")}
              name="age"
              value={user.age || ""}
              onChange={handleChange}
            />
         
            <div className="flex flex-col space-y-2">
              <label className="">{t("Sex")}</label>
              <select
                className="w-full bg-gray-200 text-black border-2 border-gray-100 p-2 rounded-md focus:ring focus:ring-gray-300 outline-none"
                name="sex"
                value={user.sex || ""}
                onChange={handleChange}
              >
              <option key={1} value="male"> male </option>
              <option key={2} value="female"> female </option>
              
              </select>
            </div>

            <InputField
              label={t("Job")}
              name="job"
              value={user.job || ""}
              onChange={handleChange}
            />
            <InputField
              label={t("Education")}
              name="education"
              value={user.education || ""}
              onChange={handleChange}
            />
            <InputField
              label={t("Interests")}
              name="interests"
              value={user.interests || ""}
              onChange={handleChange}
            />
            <Textarea
              label={t("Bio")}
              name="bio"
              value={user.bio || ""}
              onChange={handleChange}
            />

  
            <button
              type="submit"
              className="col-span-2 mt-4 bg-[#1abac8] text-white py-2 px-4 rounded-lg border-2 border-white 
                        hover:bg-gray-400 focus:ring focus:ring-blue-300 transition-all duration-300"
            >
              {t("Save Changes")}
            </button>
          </form>
        </div>
      </div>
   
  );
}

// Reusable input component
function InputField({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="">{label}</label>
      <input
        className="w-full bg-gray-200 text-black border-2 border-gray-100 p-2 rounded-md focus:ring focus:ring-gray-300 outline-none"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

// Reusable textarea component
function Textarea({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="">{label}</label>
      <textarea
        className="w-full  bg-gray-200 text-black border-2 border-gray-100 p-2 rounded-md focus:ring focus:ring-gray-300 outline-none"
        name={name}
        value={value}
        onChange={onChange}
       
      />
    </div>
  );
}


 
