import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { persist } from "zustand/middleware";

export const nrlmAckStore = create(
    persist(
        (set) => ({
            ftoTxnLogId: "",
            setFtoTxnLogId: (name) => set({ ftoTxnLogId: name }),

            ackNo: "",
            setAckNo: (name) => set({ ackNo: name }),

            id: uuidv4(),
            regenerateId: () => set({ id: uuidv4() }),

            message: "",
            setMessage: (name) => set({ message: name }),

            status_code: "",
            setStatus_code: (name) => set({ status_code: name }),
        })
    )
);


