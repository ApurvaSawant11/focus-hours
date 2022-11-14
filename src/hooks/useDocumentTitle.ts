import { useEffect } from "react";

export function useDocumentTitle(
  time: string | null,
  taskName: string | null
): void {
  useEffect(() => {
    document.title = `${time} | ${taskName}`;
  }, [time]);
}
