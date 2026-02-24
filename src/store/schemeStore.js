import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSchemeStore = create(
    persist(
        (set) => ({
            schemeName: "",
            setSchemeName: (name) => set({ schemeName: name }),
        })
    )
)

export const useSchemeMenuStore = create(
    persist(
        (set) => ({
            schemeMenuName: "",
            setSchemeMenuName: (name) => set({ schemeMenuName: name })
        })
    )
)

export const useSlsStore = create(
    persist(
        (set) => ({
            slsCode: "",
            setSlsCode: (name) => set({ slsCode: name })
        })
    )
)

export const useSchemeDetailsStore = create(
    persist(
        (set) => ({
            cssName: "",
            setCssName: (name) => set({ cssName: name }),
            cssCode: "",
            setCssCode: (name) => set({ cssCode: name }),
            slsCode: "",
            setSlsCode: (name) => set({ slsCode: name }),
            slsName: "",
            setSlsName: (name) => set({ slsName: name }),
            deptCode: "",
            setDeptCode: (name) => set({ deptCode: name }),
            deptName: "",
            setDeptName: (name) => set({ deptName: name }),
            centreShare: "",
            setCentreShare: (name) => set({ centreShare: name }),
            stateShare: "",
            setStateShare: (name) => set({ stateShare: name }),
            schemeName: "",
            setSchemeName: (name) => set({ schemeName: name }),

            setSchemeDetails: (scheme) =>
                set({
                    cssName: scheme.cssName,
                    cssCode: scheme.cssCode,
                    slsCode: scheme.slsCode,
                    slsName: scheme.slsName,
                    deptCode: scheme.deptCode,
                    deptName: scheme.deptName,
                    centreShare: scheme.centreShare,
                    stateShare: scheme.stateShare,
                    schemeName: scheme.schemeName,
                }),
        })
    )
)