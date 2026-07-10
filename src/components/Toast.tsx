import { useStore } from "../store/StoreContext";
import { CheckIcon, CloseIcon, HeartIcon } from "./Icons";

export function ToastContainer() {
  const { toasts } = useStore();
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`animate-slide-right flex items-center gap-3 rounded-xl border px-5 py-4 shadow-2xl backdrop-blur-md min-w-[260px] ${
            t.type === "success"
              ? "border-emerald-200 bg-emerald-50/95 text-emerald-900"
              : t.type === "error"
              ? "border-red-200 bg-red-50/95 text-red-900"
              : "border-stone-200 bg-white/95 text-stone-900"
          }`}
        >
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              t.type === "success"
                ? "bg-emerald-500 text-white"
                : t.type === "error"
                ? "bg-red-500 text-white"
                : "bg-stone-800 text-white"
            }`}
          >
            {t.type === "success" ? (
              <CheckIcon className="h-4 w-4" />
            ) : t.type === "error" ? (
              <CloseIcon className="h-4 w-4" />
            ) : (
              <HeartIcon className="h-4 w-4" />
            )}
          </div>
          <p className="text-sm font-medium">{t.message}</p>
        </div>
      ))}
    </div>
  );
}
