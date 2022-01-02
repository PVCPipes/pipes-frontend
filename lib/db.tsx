import { getDatabase, ref, push, set, get, child } from "firebase/database";

export const addPayload = async (result: any) => {
  const id = Date.now();
  const db = getDatabase(
    undefined,
    "https://pipes-4cc1b-default-rtdb.asia-southeast1.firebasedatabase.app"
  );
  const payloadRef = ref(db, `payload/${id}`);
  await set(payloadRef, result);
  return id;
};

export const getPayload = async (payloadId: any) => {
  const db = getDatabase(
    undefined,
    "https://pipes-4cc1b-default-rtdb.asia-southeast1.firebasedatabase.app"
  );
  const payloadRef = ref(db);
  const res = await get(child(payloadRef, `payload/${payloadId}`));
  return res.val();
};
