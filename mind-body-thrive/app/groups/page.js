// pages/groups.js
'use client';
import CustomSidebar from '../Components/CustomSidebar';
import { userButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from "@/firebase";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function Groups() {
  const { user } = useUser(); // Get the current user from Clerk
  const [yourGroups, setYourGroups] = useState([]);
  const [findNewGroups, setFindNewGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const router = useRouter();
 
  useEffect(() => {
    if (!user) {
      router.push('/sign-in'); // Redirect to sign-in page if user is not signed in
    }
  }, [user, router]);

  useEffect(() => {
    const groupsRef = collection(db, 'groups');

    // Set up a listener for changes to the groups collection
    const unsubscribe = onSnapshot(groupsRef, (snapshot) => {
      const allGroups = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter groups for the user's groups and other available groups
      const userGroups = allGroups.filter(group => group.members.some(member => member.id === user?.id)); // Use Clerk user ID
      const availableGroups = allGroups.filter(group => !group.members.some(member => member.id === user?.id)); // Use Clerk user ID

      setYourGroups(userGroups);
      setFindNewGroups(availableGroups);
    });

    return () => unsubscribe();
  }, [user?.id]); // Add user ID as a dependency

  const createGroup = async () => {
    if (!newGroupName.trim() || !newGroupDescription.trim()) {
      alert('Please fill in all fields.');
      return;
    }
  
    const userId = user.id; // Use Clerk user ID
    const userName = user.firstName + (user.lastName ? ' ' + user.lastName : ''); // Construct user name only if last name exists
  
    // Get a reference to the "groups" collection
    const groupRef = doc(db, 'groups', newGroupName); // Use the `doc` function from Firestore
  
    // Ensure the group name is unique
    const groupSnapshot = await getDoc(groupRef); // Get the document snapshot
    if (groupSnapshot.exists()) {
      alert('Group name must be unique.');
      return;
    }
  
    await setDoc(groupRef, {
      name: newGroupName,
      description: newGroupDescription,
      members: [{ id: userId, name: userName }], // Add the current user as the first member
      messages: [],
      dateCreated: new Date(),
    });
  
    // Clear input fields after group creation
    setNewGroupName('');
    setNewGroupDescription('');
  };
  

  const handleGroupClick = (id) => {
    router.push(`/groups/${id}`); // Navigate to group detail page
  };

  return (
    <div className="flex">
      <CustomSidebar />
      <main className="ml-64 p-8 w-full bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Groups</h1>
        <p>Welcome to your groups! This is where you can find others with common health and fitness goals.</p>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-6">Create New Group</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new group.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="groupName" className="text-right">
                  Group Name
                </Label>
                <Input
                  id="groupName"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="groupDescription" className="text-right">
                  Description
                </Label>
                <Input
                  id="groupDescription"
                  value={newGroupDescription}
                  onChange={(e) => setNewGroupDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setNewGroupName('');
                setNewGroupDescription('');
              }}>Cancel</Button>
              <Button onClick={createGroup}>Create Group</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Tabs defaultValue="yourGroups" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="yourGroups">Your Groups</TabsTrigger>
            <TabsTrigger value="findNewGroups">Find New Groups</TabsTrigger>
          </TabsList>

          <TabsContent value="yourGroups">
            <h2 className="text-xl mt-4">Your Groups</h2>
            <ul>
              {yourGroups.map((group) => (
                <li key={group.id} className="border p-4 mb-2 rounded">
                  <h3 className="font-semibold">{group.name}</h3>
                  <p>description: {group.description}</p>
                  <p>Members: {group.members.length}</p>
                  <Button onClick={() => handleGroupClick(group.id)}>View Group</Button>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="findNewGroups">
            <h2 className="text-xl mt-4">Find New Groups</h2>
            <ul>
              {findNewGroups.map((group) => (
                <li key={group.id} className="border p-4 mb-2 rounded">
                  <h3 className="font-semibold">{group.name}</h3>
                  <p>description: {group.description}</p>
                  <p>Members: {group.members.length}</p>
                  <Button onClick={() => handleGroupClick(group.id)}>Join Group</Button>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
