'use client'; // Ensure this component is rendered on the client side

import Sidebar from '../components/Sidebar';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs'; // Import Clerk for authentication
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import db from "@/firebase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function Tracking() {
  const { userId } = useAuth();
  const [sets, setSets] = useState([]);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [nutrition, setNutrition] = useState([]);
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');


  // Fetch data on load
  useEffect(() => {
    if (userId) {
      const userDocRef = doc(db, 'users', userId);

      getDoc(userDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setSets(userData.sets || []);
          setNutrition(userData.nutrition || []);
        } else {
          // If the document doesn't exist, create it
          setDoc(userDocRef, { sets: [], nutrition: [] });
        }
      });
    }
  }, [userId]);

  // Function to handle adding gym activity
  const handleAddSet = async () => {
    const newSet = { name, duration, caloriesBurned };
    const userDocRef = doc(db, 'users', userId);

    await updateDoc(userDocRef, {
      sets: arrayUnion(newSet)
    });

    setSets((prevSets) => [...prevSets, newSet]);
    setName('');
    setDuration('');
    setCaloriesBurned('');
  };

  // Function to handle adding food consumed
  const handleAddNutrition = async () => {
    const newNutrition = { food, calories };
    const userDocRef = doc(db, 'users', userId);

    await updateDoc(userDocRef, {
      nutrition: arrayUnion(newNutrition)
    });

    setNutrition((prevNutrition) => [...prevNutrition, newNutrition]);
    setFood('');
    setCalories('');
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full bg-gray-100 min-h-screen">
        <div>
          <h1 className="text-2xl font-bold">Track your gym workouts and calories</h1>
          <p>Welcome to your tracking dashboard! This is where you can manage your activities.</p>
        </div>

       

        <div className="mt-8">
          <Tabs defaultValue="sets" className="w-full">
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value="sets">Gym Activities</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            </TabsList>
            <TabsContent value="sets">
              <h2 className="text-2xl font-bold">Gym Activities</h2>
              {/* Gym Activity Dialog */}
          <Dialog className="mt-8">
            <DialogTrigger asChild>
              <Button >Add Gym Activity</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add a New Gym Activity</DialogTitle>
                <DialogDescription>
                  Enter the details of your gym activity.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <Label htmlFor="activity-name">Activity Name</Label>
                <Input
                  id="activity-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                
                <Label htmlFor="activity-duration">Duration (minutes)</Label>
                <Input
                  id="activity-duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
                
                <Label htmlFor="calories-burned">Calories Burned</Label>
                <Input
                  id="calories-burned"
                  type="number"
                  value={caloriesBurned}
                  onChange={(e) => setCaloriesBurned(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleAddSet}>
                  Add Activity
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
              <div className="grid gap-4 mt-4">
                {sets.map((set, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-300">
                    <h3 className="text-xl font-semibold mb-2">{set.name}</h3>
                    <p className="text-gray-600">Duration: {set.duration} minutes</p>
                    <p className="text-gray-600">Calories Burned: {set.caloriesBurned}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nutrition">
            <h2 className="text-2xl font-bold">Nutrition</h2>
            <Dialog className=" mt-8">
            <DialogTrigger asChild>
              <Button className="m-4">Add Nutrient Food</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Nutrient Food</DialogTitle>
                <DialogDescription>
                  Enter the details of the food consumed.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <Label htmlFor="food-name">Food Name</Label>
                <Input
                  id="food-name"
                  value={food}
                  onChange={(e) => setFood(e.target.value)}
                />
                
                <Label htmlFor="food-calories">Calories</Label>
                <Input
                  id="food-calories"
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleAddNutrition}>
                  Add Food
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
              
              <div className="grid gap-4 mt-4">
                {nutrition.map((food, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-300">
                    <h3 className="text-xl font-semibold mb-2">{food.food}</h3>
                    <p className="text-gray-600">Calories: {food.calories}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
