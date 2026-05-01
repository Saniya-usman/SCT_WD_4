import { useState, useEffect , useRef} from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import SparkleBackground from "./SparkleBackground";
const Home = () => {
  const profile = JSON.parse(localStorage.getItem("profile"));

  
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  // Load tasks
 const [tasks, setTasks] = useState(() => { const saved = localStorage.getItem("tasks"); return saved ? JSON.parse(saved) : []; });

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add or Edit Task
  const addTask = () => {
    if (!input.trim() || !priority){
      toast.error("Please enter task and select priority!");
      return;
    } 

    if (editId) {
      setTasks(
        tasks.map((task) =>
          task.id === editId
            ? { ...task, text: input, date: dueDate, priority }
            : task
        )
      );
      setEditId(null);
      toast.success("Task updated ✏️");
    } else {
      const newTask = {
        id: Date.now(),
        text: input,
        completed: false,
        date: dueDate,
        priority,
      };
      setTasks([newTask, ...tasks]);
      toast.success("Task added successfully 🎉");
    }

    setInput("");
    setDueDate("");
    setPriority("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
    setFilter("all");
    toast.success("Task status updated ✅");
  };

  const handleEdit = (task) => {
    setInput(task.text);
    setDueDate(task.date);
    setPriority(task.priority);
    setEditId(task.id);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
      toast.success("Task deleted 🗑️");
  };

  const dateRef = useRef(null);

  const today = new Date().toISOString().split("T")[0];

const tomorrowDate = new Date();
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
const tomorrow = tomorrowDate.toISOString().split("T")[0];

const getNextSaturday = () => {
  const d = new Date();
  const day = d.getDay();

  let diff = 6 - day;

  if (diff <= 1) {
    // if Saturday is today OR tomorrow → push to next week
    diff += 7;
  }

  d.setDate(d.getDate() + diff);
  return d.toISOString().split("T")[0];
};

const weekend = getNextSaturday();

const isCustomDate =
  dueDate &&
  dueDate !== today &&
  dueDate !== tomorrow &&
  dueDate !== weekend;

  const filteredTasks = tasks.filter(task => {
  if (filter === "pending") return !task.completed;
  if (filter === "completed") return task.completed;
  return true;
});
const completedCount = tasks.filter(t => t.completed).length;
const total = tasks.length;
const percent = total ? (completedCount / total) * 100 : 0;

const pendingCount = tasks.filter(t => !t.completed).length;

const sortedTasks = [...filteredTasks].sort((a, b) => {
  if (sortBy === "priority") {
    const order = { High: 3, Medium: 2, Low: 1 };
    return order[b.priority] - order[a.priority];
  }

  if (sortBy === "date") {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
  }

  return 0;
});

const isOverdue = (date) => {
  if (!date) return false;

  const today = new Date().toISOString().split("T")[0];
  return date < today;
};

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#6F4E37] via-[#A67B5B] to-[#ECB176] p-6">

  <SparkleBackground />
      {/* Header */}
      <div className="flex justify-between items-center mb-6 text-white">
        <div>
          <h1 className="text-3xl font-bold">Hello, {profile?.name} 👋</h1>
          <p className="text-white/70 text-sm">
            {new Date().toDateString()}
          </p>
        </div>

        <img
          src={profile?.image}
          alt="profile"
          className="w-12 h-12 rounded-full object-cover border-2 border-white"
        />
      </div>

      {/* Glass Card */}
      <div className="backdrop-blur-xl  bg-white/10 border border-white/20 
      rounded-3xl p-6 shadow-xl max-w-md mx-auto">

        {/* Input Section */}
        
        <div className="mb-4">
  <p className="text-white text-sm">
    {completedCount} of {total} tasks completed
  </p>

  <div className="w-full h-2 bg-white/20 rounded-full mt-1">
    <motion.div
  style={{ width: `${percent}%` }}
  className="h-2 bg-gradient-to-br from-[#ECB176] via-[#A67B5B] to-[#6F4E37] rounded-full"
  transition={{ duration: 0.5 }}
/>
  </div>
</div>
      <div className="flex gap-2 mb-4">
  <button
    onClick={() => setFilter("all")}
    className={`px-3 py-1 rounded-full text-sm ${
      filter === "all"
        ? "bg-[#4B2E2B] text-white"
        : "bg-white/10 text-white/70"
    }`}
  >
    All ({tasks.length})
  </button>

  <button
    onClick={() => setFilter("pending")}
    className={`px-3 py-1 rounded-full text-sm ${
      filter === "pending"
        ? "bg-[#4B2E2B] text-white"
        : "bg-white/10 text-white/70"
    }`}
  >
    Pending ({pendingCount})
  </button>

  <button
    onClick={() => setFilter("completed")}
    className={`px-3 py-1 rounded-full text-sm ${
      filter === "completed"
        ? "bg-[#4B2E2B] text-white"
        : "bg-white/10 text-white/70"
    }`}
  >
    Completed ({completedCount})
  </button>
</div>



        <div className="flex flex-col gap-3 mb-6">

          <input
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="p-3 rounded-xl bg-white/20 text-white placeholder-white/70 outline-none 
focus:ring-2 focus:ring-[#FED8B1] transition"
          />

          <div className="flex items-center gap-2 flex-wrap">

  {/* Quick Date Buttons */}
  {/* Today */}
<button
  onClick={() => setDueDate(today)}
  className={`px-3 py-1 rounded-full text-sm transition ${
    dueDate === today
      ? "bg-[#4B2E2B] text-white scale-105 shadow-lg"
      : "bg-white/10 text-white/70 hover:bg-white/20"
  }`}
>
  Today
</button>

<button
  onClick={() => setDueDate(tomorrow)}
  className={`px-3 py-1 rounded-full text-sm transition ${
    dueDate === tomorrow
      ? "bg-[#4B2E2B] text-white scale-105 shadow-lg "
      : "bg-white/10 text-white/70 hover:bg-white/20"
  }`}
>
  Tomorrow
</button>

<button
  onClick={() => setDueDate(weekend)}
  className={`px-3 py-1 rounded-full text-sm transition ${
    dueDate === weekend
      ? "bg-[#4B2E2B] text-white scale-105 shadow-lg"
      : "bg-white/10 text-white/70 hover:bg-white/20"
  }`}
>
  Weekend
</button>

 
<div className="relative">

  {/* Visible Icon */}
  <div
    className={`cursor-pointer p-2 rounded-full transition border
    ${
      isCustomDate
        ? "bg-[#4B2E2B] text-white shadow-[0_0_10px_#FED8B1]  border-[#FED8B1] scale-105"
        : "bg-white/20 text-white hover:bg-white/30 border-white/30"
    }`}
  >
    📅
  </div>

  {/* Actual Input (placed ON TOP of icon) */}
  <input
    type="date"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
    className="absolute inset-0 opacity-0 cursor-pointer"
  />
</div>



  {/* Priority */}
 <select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
  className="p-2 px-3 rounded-full bg-white/20 text-[#4B2E2B] text-sm font-semibold outline-none backdrop-blur-md"
>
  <option  value="" >Priority</option>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select>

  {/* Add Button */}
  <motion.button
  onClick={addTask}
  whileTap={{ scale: 0.95 }}
  whileHover={{ scale: 1.03 }}
  className="w-full mt-4 py-3 rounded-xl 
  bg-gradient-to-r from-[#4B2E2B] to-[#6F4E37] 
  text-white font-bold text-lg shadow-lg"
>
  {editId ? "Update Task ✔" : "Add Task ➕"}
</motion.button>

</div>
        </div>

        {/* Tasks */}
        {/* Tasks */}
<div className="space-y-3 max-h-[250px] overflow-y-auto scrollbar-hide">

  {sortedTasks.length === 0 && (
    <p className="text-center text-white/60">
      No tasks yet — start building your day ✨
    </p>
  )}

  <AnimatePresence>
    {sortedTasks.map((task) => (
      <motion.div
        key={task.id}
        layout
       initial={{ opacity: 0, y: -20, scale: 0.9 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, x: 30, scale: 0.9 }}
whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className={`p-4 rounded-2xl border backdrop-blur-md shadow-md transition
        ${
          isOverdue(task.date) && !task.completed
            ? "bg-red-500/20 border-red-400"
            : "bg-white/10 border-white/20"
        }`}
      >

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <motion.input
  type="checkbox"
  checked={task.completed}
  onChange={() => toggleTask(task.id)}
  className="w-5 h-5 accent-[#4B2E2B]"
  whileTap={{ scale: 1.3 }}
  transition={{ type: "spring", stiffness: 300 }}
/>

            <div>
             <motion.p
  animate={{
    opacity: task.completed ? 0.6 : 1,
    scale: task.completed ? 0.98 : 1
  }}
  transition={{ duration: 0.2 }}
  className={`${
    task.completed
      ? "line-through text-white/50"
      : isOverdue(task.date)
      ? "text-red-200"
      : "text-white"
  }`}
>
  {task.text}
</motion.p>

              <div className="text-xs text-white/70 mt-1 flex gap-3 items-center flex-wrap">

                {task.date && (
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
                    📅 {new Date(task.date).toDateString()}
                  </span>
                )}

                {isOverdue(task.date) && !task.completed && (
                  <span className="text-xs text-red-300 font-bold">
                    ⚠ Overdue
                  </span>
                )}

                <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                  task.priority === "High"
                    ? "bg-gradient-to-r from-[#4B2E2B] to-[#6F4E37] text-white"
                    : task.priority === "Medium"
                    ? "bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] text-white"
                    : "bg-gradient-to-r from-[#A67B5B] to-[#ECB176] text-[#2B1B17]"
                }`}>
                  {task.priority}
                </span>

              </div>
            </div>
          </div>

          <div className="flex gap-2">
           <motion.button
  onClick={() => handleEdit(task)}
  whileHover={{ scale: 1.2, rotate: 5 }}
  whileTap={{ scale: 0.9 }}
  className="px-2 py-1 rounded-lg 
  bg-gradient-to-r from-[#A67B5B] to-[#ECB176]
  text-white text-sm shadow-md"
>
  ✏️
</motion.button>
           <motion.button
  onClick={() => deleteTask(task.id)}
  whileHover={{ scale: 1.2, rotate: -5 }}
  whileTap={{ scale: 0.9 }}
  className="px-2 py-1 rounded-lg 
  bg-gradient-to-r from-[#6F4E37] to-[#4B2E2B]
  text-white text-sm shadow-md"
>
  ❌
</motion.button>
          </div>

        </div>

      </motion.div>
    ))}
  </AnimatePresence>

</div>
      </div>
    </div>
  );
};

export default Home;