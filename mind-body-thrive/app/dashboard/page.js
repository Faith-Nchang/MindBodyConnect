'use client';
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import db from "@/firebase";
import Sidebar from "../Components/Sidebar";
import { UserButton } from "@clerk/nextjs";
import { FaBurn, FaUtensils, FaClock } from "react-icons/fa";
import { Line } from 'react-chartjs-2';



export default function Dashboard() {
  const { user } = useUser();
  const [totalCaloriesIntake, setTotalCaloriesIntake] = useState(0);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
  const [totalWorkoutDuration, setTotalWorkoutDuration] = useState(0);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, "users", user.id);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setTotalCaloriesIntake(data.totalCaloriesIntake || 0);
            setTotalCaloriesBurned(data.totalCaloriesBurned || 0);
            setTotalWorkoutDuration(data.totalWorkoutDuration || 0);
          } else {
            console.log("No user data found!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const calorieSurplusOrDeficit = totalCaloriesIntake - totalCaloriesBurned;
const potentialWeightChange = calorieSurplusOrDeficit / 3500; // Approximate weight gain/loss in pounds
const potentialWeightChangeRounded = Math.round(potentialWeightChange * 10) / 10; // Round to one decimal place

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <UserButton />
        </header>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 transform transition hover:scale-105">
            <FaUtensils className="text-4xl text-green-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Calorie Intake</h2>
              <p className="text-3xl font-bold text-gray-900">{totalCaloriesIntake} kcal</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 transform transition hover:scale-105">
            <FaBurn className="text-4xl text-red-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Calories Burned</h2>
              <p className="text-3xl font-bold text-gray-900">{totalCaloriesBurned} kcal</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 transform transition hover:scale-105">
            <FaClock className="text-4xl text-blue-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Workout Duration</h2>
              <p className="text-3xl font-bold text-gray-900">{totalWorkoutDuration} mins</p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 transform transition hover:scale-100 h-full">
        'use client';
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import db from "@/firebase";
import Sidebar from "../Components/Sidebar";
import { UserButton } from "@clerk/nextjs";
import { FaBurn, FaUtensils, FaClock } from "react-icons/fa";
import { Line } from 'react-chartjs-2';

export default function Dashboard() {
  const { user } = useUser();
  const [totalCaloriesIntake, setTotalCaloriesIntake] = useState(0);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
  const [totalWorkoutDuration, setTotalWorkoutDuration] = useState(0);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, "users", user.id);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setTotalCaloriesIntake(data.totalCaloriesIntake || 0);
            setTotalCaloriesBurned(data.totalCaloriesBurned || 0);
            setTotalWorkoutDuration(data.totalWorkoutDuration || 0);
          } else {
            console.log("No user data found!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const calorieSurplusOrDeficit = totalCaloriesIntake - totalCaloriesBurned;
  const potentialWeightChange = calorieSurplusOrDeficit / 3500; // Approximate weight gain/loss in pounds

  // Data for projected weight gain and weight loss over weeks
  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Projected Weight Gain (lbs)",
        data: [0, potentialWeightChange * 2, potentialWeightChange * 3, potentialWeightChange * 4],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
      {
        label: "Projected Weight Loss (lbs)",
        data: [0, -potentialWeightChange * 2, -potentialWeightChange * 3, -potentialWeightChange * 4],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <UserButton />
        </header>
        
        {/* Stat Boxes */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 transform transition hover:scale-105">
            <FaUtensils className="text-4xl text-green-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Calorie Intake</h2>
              <p className="text-3xl font-bold text-gray-900">{totalCaloriesIntake} kcal</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 transform transition hover:scale-105">
            <FaBurn className="text-4xl text-red-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Calories Burned</h2>
              <p className="text-3xl font-bold text-gray-900">{totalCaloriesBurned} kcal</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 transform transition hover:scale-105">
            <FaClock className="text-4xl text-blue-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Workout Duration</h2>
              <p className="text-3xl font-bold text-gray-900">{totalWorkoutDuration} mins</p>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Projected Weight Gain</h2>
            <Line data={chartData} options={{ responsive: true }} />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Projected Weight Loss</h2>
            <Line data={chartData} options={{ responsive: true }} />
          </div>
        </section>
      </main>
    </div>
  );
}

        </section>
      </main>
    </div>
  );
}
