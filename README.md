#### Mind Body Thrive

## Story
As people enthusiastic about both physical and mental health wellness, we were interested in building something that not only allows us to keep track of our health and progress, but also find others with similar interests for accountability and social support.

# How Mind Body Thrive Solves the Problem
Mind Body Thrive not only provides a way for users to track their workouts, calories burned, and nutritional intake and get insights about the likelihood of gaining or losing weight, but it also provides two means of mental health support: accountability and social interactions. In Mind Body Thrive, users can get advice and have discussions from a conversational chatbot. As a means of peer and social interaction, finding others with similar interests, and sharing their progress, users can join groups with similar interests and support each other to attain their fitness goals.

Tech Stack

- **Frontend**: Next.js, React (for creating a responsive UI and handling page navigation)
- **Backend**: Firebase (for database storage, user authentication, and real-time data handling)
- **APIs & Libraries**:
  - Firebase Firestore for database management
  - Clerk for user authentication
  - Chart.js for interactive and responsive charting
  - Tailwind CSS for modern and clean UI styling
- **Additional Tools**: React Icons for UI elements, dotenv for managing environment variables

### How It Works

1. **User Authentication**: Users sign in through Clerk, ensuring secure access to personalized data. If a user is not signed in, they are redirected to the home page.

2. **Dashboard**: Upon logging in, users are directed to a dashboard where they can see their total calorie intake, total calories burned, and total workout duration. This information is pulled from Firebase and updated in real-time.
3. **Tracking**: Users can track their gym workouts, calories burned, and nutritional intake. This ensures they can visualize calorie intake vs calories burned to see if they are attaining their goals
4. **Groups**: users can create/join groups with similar interests. Within each group, users can have conversations with each other. This serves as a means of accountability, social support, and collaborative growth in their wellness journey.
5. **Conversational Chatbot**: Users can also interact with the app in a conversational manner, enabling them to get advice about work routines, nutrition, or mental health.



8. **UI and User Experience**: 
   - Sidebar navigation allows users to easily switch between different areas of the app.
   - Intuitive UI elements, such as progress circles and icon-labeled cards, make the app easy to use.
   - Tailwind CSS styling ensures the app is visually appealing and fully responsive across devices.

