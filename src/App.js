import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [sentences, setSentences] = useState([]);
  const [newSentence, setNewSentence] = useState("");
  const [editID, setEditID] = useState(null);
  const [editText, setEditText] = useState("");

  const collectionRef = collection(db, "sentences");

  useEffect(() => {
    fetchSentences();
  }, []);

  const fetchSentences = async () => {
    const snapshot = await getDocs(collectionRef);
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSentences(docs);
  };

  const addSentence = async () => {
    if (newSentence.trim()) {
      await addDoc(collectionRef, { text: newSentence.trim() });
      setNewSentence("");
      fetchSentences();
    }
  };

  const deleteSentence = async (id) => {
    await deleteDoc(doc(db, "sentences", id));
    fetchSentences();
  };

  const saveEdit = async () => {
    if (editText.trim()) {
      const sentenceRef = doc(db, "sentences", editID);
      await updateDoc(sentenceRef, { text: editText.trim() });
      setEditID(null);
      setEditText("");
      fetchSentences();
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>📝 Firebase CRUD App</h2>
      <input
        placeholder="Enter a sentence"
        value={newSentence}
        onChange={(e) => setNewSentence(e.target.value)}
        style={{ width: 300, marginRight: 10 }}
      />
      <button onClick={addSentence}>Add</button>

      <ul style={{ marginTop: 30 }}>
        {sentences.map((item) => (
          <li key={item.id} style={{ marginBottom: 10 }}>
            {editID === item.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ width: 300 }}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={() => setEditID(null)}>Cancel</button>
              </>
            ) : (
              <>
                {item.text}
                <button
                  onClick={() => {
                    setEditID(item.id);
                    setEditText(item.text);
                  }}
                  style={{ marginLeft: 10 }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteSentence(item.id)}
                  style={{ marginLeft: 5 }}
                >
                  🗑️ Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
