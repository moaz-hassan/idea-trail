import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';

const sendVerificationEmail = async () => {
  const user = auth.currentUser;

  if (!user) return { error: 'No authenticated user found.' };

  try {
    await sendEmailVerification(user);
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
};

export default sendVerificationEmail;
