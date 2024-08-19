// import { createContext, useContext, useEffect, useState } from "react";

// const SidebarContext = createContext();

// export const SidebarProvider = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(() => {
//     const savedState = localStorage.getItem("sidebarIsOpen");
//     return savedState ? JSON.parse(savedState) : false;
//   });

//   const toggleSidebar = () => {
//     setIsOpen((prev) => !prev);
//   };

//   useEffect(() => {
//     localStorage.setItem("sidebarIsOpen", JSON.stringify(isOpen));
//   }, [isOpen]);

//   return (
//     <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
//       {children}
//     </SidebarContext.Provider>
//   );
// };

// export const useSidebar = () => {
//   return useContext(SidebarContext);
// };


import { createContext, useState, useContext, useEffect } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(() => {
        const savedState = localStorage.getItem("sidebarIsOpen");
        return savedState ? JSON.parse(savedState) : window.innerWidth <= 800;
    });

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    const handleResize = () => {
        if (window.innerWidth > 800) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem("sidebarIsOpen", JSON.stringify(isOpen));
    }, [isOpen]);

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    return useContext(SidebarContext);
};
