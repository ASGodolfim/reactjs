import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState([]); // Initialize to an empty array
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        async function loadData() {
            if (cancelled) return;

            setLoading(true);

            const collectionRef = collection(db, docCollection);

            try {
                let q;

                if (search) {
                    q = query(
                        collectionRef, 
                        orderBy("createdAt", "desc")
                    );
                } else if (uid) {
                    q = query(
                        collectionRef, 
                        where("uid", "==", uid),
                        orderBy("createdAt", "desc")
                    );
                } else {
                    q = query(collectionRef, orderBy("createdAt", "desc"));
                }

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    if (!cancelled) {
                        let docs = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));

                        if (search) {
                            const lowerCaseSearch = search.toLowerCase();
                            docs = docs.filter(doc => 
                                doc.title.toLowerCase().includes(lowerCaseSearch) ||
                                (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch)))
                            );
                        }

                        setDocuments(docs);
                        setLoading(false);
                    }
                }, (error) => {
                    if (!cancelled) {
                        setError(error.message);
                        setLoading(false);
                    }
                });

                return () => unsubscribe();

            } catch (error) {
                if (!cancelled) {
                    setError(error.message);
                    setLoading(false);
                }
            }
        }

        loadData();

    }, [docCollection, search, uid, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { documents, loading, error };
};