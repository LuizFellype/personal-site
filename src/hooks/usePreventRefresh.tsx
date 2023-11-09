import { useEffect } from "react";

export const usePreventRefresh = () => {
    useEffect(() => {
      const beforeUnloadHandler = (event: any) => {
        event?.preventDefault();
      };
  
      window.addEventListener("beforeunload", beforeUnloadHandler);
      
      return () => {
        window.removeEventListener("beforeunload", beforeUnloadHandler);
      }
    }, []);
  }