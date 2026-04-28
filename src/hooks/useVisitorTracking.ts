import { useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, increment } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export function useVisitorTracking() {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        let visitorId = localStorage.getItem('visitorId');
        const isNewVisitor = !visitorId;

        if (!visitorId) {
          visitorId = crypto.randomUUID();
          localStorage.setItem('visitorId', visitorId);
        }

        const visitorRef = doc(db, 'visitors', visitorId);
        
        if (isNewVisitor) {
          // Create new visitor record
          await setDoc(visitorRef, {
            firstVisit: serverTimestamp(),
            lastVisit: serverTimestamp(),
            pageViews: 1
          });
        } else {
          // Update existing visitor record
          // We first need to check if it exists in case it was deleted from DB but remains in localStorage
          const docSnap = await getDoc(visitorRef);
          if (docSnap.exists()) {
            await updateDoc(visitorRef, {
              lastVisit: serverTimestamp(),
              pageViews: increment(1)
            });
          } else {
            // Recreate if missing
            await setDoc(visitorRef, {
              firstVisit: serverTimestamp(),
              lastVisit: serverTimestamp(),
              pageViews: 1
            });
          }
        }
      } catch (error) {
        // We don't want to throw and break the app if tracking fails, just log it
        console.error("Visitor tracking failed:", error);
      }
    };

    trackVisitor();
  }, []);
}
