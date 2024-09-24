import { Fieldset, Label, Legend, Tab } from "@headlessui/react";

import React, { ReactNode } from "react";

export const CTab = ({ children }: { children: string }) => {
    return (
        <Tab
            className={
                "border-b-2 data-[selected]:border-neutral-300 w-full border-neutral-800 text-xl py-2"
            }
        >
            {children}
        </Tab>
    );
};

export const CFieldset = ({ children }: { children: ReactNode }) => {
    return (
        <Fieldset
            className={
                "bg-neutral-900 p-4 rounded-lg border-2 border-neutral-800 grid gap-4"
            }
        >
            {children}
        </Fieldset>
    );
};

export const CLegend = ({ children }: { children: string }) => {
    return <Legend className={"text-xl font-bold my-2"}>{children}</Legend>;
};

export const CLabel = ({ children }: { children: string }) => {
    return <Label className={"block text-lg"}>{children}</Label>;
};

export const Divider = () => {
    return <div className="h-[1px] w-full bg-neutral-800" />;
};

export const FieldWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className="p-4 border-2 border-neutral-800 grid gap-4 rounded-lg relative">
            {children}
        </div>
    );
};

export const ReturnCardWrapper = ({
    children,
    title,
}: {
    children: ReactNode;
    title: string;
}) => {
    return (
        <div className="grid gap-4">
            <p className="text-xl">{title}</p>
            {children}
        </div>
    );
};
