'use client';

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
import {Input} from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from 'react';

export default function Tracking() {
  const [sets, setSets] = useState([]);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  
  const [nutrition, setNutrition] = useState([]);
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const [view, setView] = useState('sets');

  // Function to handle adding gym activity
  const handleAddSet = () => {
    const newSet = { name, duration, caloriesBurned };
    setSets([...sets, newSet]);
    setName('');
    setDuration('');
    setCaloriesBurned('');
  };

  // Function to handle adding food consumed
  const handleAddNutrition = () => {
    const newNutrition = { food, calories };
    setNutrition([...nutrition, newNutrition]);
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
          {/* Gym Activity Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Gym Activity</Button>
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

          {/* Nutrient Food Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-4">Add Nutrient Food</Button>
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
        </div>

        <div>
            <div className="flex justify-between items-center mt-8">
               <Button variant="outline" onClick={() => setView('sets')}>View Gym Activities</Button>
                <Button variant="outline" onClick={() => setView('nutrition')}>View Nutrition</Button>

            </div>
            <div>
                {view === 'sets' && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold">Gym Activities</h2>
                        <div className="grid gap-4 mt-4">
                            {sets.map((set, index) => (
                                <div key={index} className="p-4 rounded-lg bg-gray-300">
                                    <h3 className="text-xl font-semibold mb-2">{set.name}</h3>
                                    <p className="text-gray-600">Duration: {set.duration} minutes</p>
                                    <p className="text-gray-600">Calories Burned: {set.caloriesBurned}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'nutrition' && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold">Nutrition</h2>
                        <div className="grid gap-4 mt-4">
                            {nutrition.map((food, index) => (
                                <div key={index} className="p-4 rounded-lg bg-gray-300">
                                    <h3 className="text-xl font-semibold mb-2">{food.food}</h3>
                                    <p className="text-gray-600">Calories: {food.calories}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>

      </main>
    </div>
  );
}
