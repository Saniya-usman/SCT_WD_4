import { useState } from "react";
import { motion } from "framer-motion";
import SparkleBackground from "./SparkleBackground";
const Profile = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!name || !image) {
      alert("Please fill required fields");
      return;
    }

    localStorage.setItem(
      "profile",
      JSON.stringify({ name, username, bio, image })
    );

    window.location.reload();
  };

  
  return (
  <motion.div
    className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden
    bg-gradient-to-br from-[#6F4E37] via-[#A67B5B] to-[#ECB176]"

    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <SparkleBackground />
    
    <div className="absolute w-72 h-72 bg-white/20 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
    <div className="absolute w-96 h-96 bg-[#4B2E2B]/30 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

<motion.div
  className="text-center mb-6 relative z-10"
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
>
  <h1 className="text-3xl font-bold text-white text-center mb-2">
  Start your day with intention ✨
</h1>

<p className="text-white/60 text-sm text-center mb-6">
  Add tasks, stay focused, and make progress today
</p>
</motion.div>

    
    <motion.div
  className="relative z-10 w-[380px] p-8 rounded-3xl 
  backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl"

  initial={{ y: 40, opacity: 0, scale: 0.95 }}
  animate={{ y: 0, opacity: 1, scale: 1 }}
  transition={{
    duration: 0.6,
    ease: "easeOut",
    delay: 0.2
  }}
>

    
      <h1 className="text-3xl font-bold text-white text-center mb-2">
        Create Profile
      </h1>
      <p className="text-white/60 text-sm text-center mb-6">
        Set up your account to continue
      </p>

      
      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        id="fileInput"
        className="hidden"
      />

     
     <motion.label
  htmlFor="fileInput"
  className="flex justify-center cursor-pointer"
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
>
        <div className="relative group">

          {image ? (
            <img
              src={image}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-28 h-28 rounded-full flex items-center justify-center 
            bg-white/20 text-white border border-white/30">
              Upload
            </div>
          )}

          
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
          bg-white/10 blur-md transition"></div>
        </div>
     </motion.label>

     
      <div className="mt-6 space-y-3">

        <input
          type="text"
          placeholder="Full Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/60 
          outline-none focus:ring-2 focus:ring-[#FED8B1] transition"
        />

      
        <textarea
          placeholder="Bio (optional)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-3 h-20 rounded-xl bg-white/20 text-white placeholder-white/60 
          outline-none resize-none focus:ring-2 focus:ring-[#FED8B1] transition"
        />
      </div>

      
      <motion.button
  onClick={handleSubmit}
  className="w-full mt-6 py-3 rounded-xl font-semibold text-white
  bg-gradient-to-r from-[#4B2E2B] to-[#6F4E37]
  shadow-lg"

  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ delay: 0.5, type: "spring" }}
  whileTap={{ scale: 0.95 }}
>
   Continue →
</motion.button>
       
      

    </motion.div>
  </motion.div>
);
};

export default Profile;