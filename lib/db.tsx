import { getDatabase, ref, push, set } from "firebase/database";

const addPayload = (result: any) => {
  const db = getDatabase();
  const payloadRef = ref(db, "payload");
  const newPayLoadRef = push(payloadRef);
  set(newPayLoadRef, {
    //
  });
};
