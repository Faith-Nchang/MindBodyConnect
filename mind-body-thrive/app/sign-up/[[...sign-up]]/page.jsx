// app/sign-up/[[...sign-up]]/page.jsx

import { SignUp } from '@clerk/nextjs';

export default function signUpPage() {
  return (
    <div>
      <h1>Create an Account</h1>
      <SignUp />
    </div>
  );
}
