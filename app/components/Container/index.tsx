import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
    return (
        <div className="w-[90%] mx-auto md:max-w-[560px] lg:max-w-[720px]">
            {children}
        </div>
    );
}
