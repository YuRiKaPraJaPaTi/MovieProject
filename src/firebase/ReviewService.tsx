import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const reviewsCollection = firestore().collection('reviews');

const user = auth().currentUser;
// Get current user's truncated email as username
const getUsernameFromEmail = () => {
      const email = auth().currentUser?.email || 'anonymous';
      return email.split('@')[0];
};

// Store a new review
export const addReview = async (movieId: string, comment: string, rating: number) => {
      
      if (!user) throw new Error('User not logged in');

      const userId = user.uid;
      const username = getUsernameFromEmail();

      await reviewsCollection.add({
            userId,
            author: username,
            movieId,
            comment,
            rating,
            createdAt: firestore.FieldValue.serverTimestamp(),
      });
};

// Fetch reviews for a specific movie
export const fetchFirestoreReviews = async (movieId: string) => {
      try {
            const snapshot = await reviewsCollection
            .where('movieId', '==', movieId)
            .orderBy('createdAt', 'desc')
            .get();

            if (!snapshot || snapshot.empty) {
                  console.log("No reviews found for this movie.");
                  return [];
            }

            return snapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data(),
            }));

            } catch (error) {
                  console.error("Error fetching reviews:", error);
                  return []; 
      }
};

// Listen to reviews in real-time for a movie
export const listenToFirestoreReviews = (movieId: string,
      callback: (reviews: any[] | null) => void) => {
      const unsubscribe = reviewsCollection
      .where('movieId', '==', movieId)
      .onSnapshot(
            snapshot => {
                  const data = snapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data(),
            }));
            callback(data); // Send updated reviews to the callback
            },
            error => {
                  console.error("Error listening to reviews:", error);
                  callback([]); 
            }
      );

      return unsubscribe; 
};






