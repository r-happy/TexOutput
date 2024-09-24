import { Button, Field, Input, Select, Textarea } from "@headlessui/react";
import {
    CFieldset,
    CLabel,
    CLegend,
    Divider,
    FieldWrapper,
    ReturnCardWrapper,
} from "../CustomComponents";
import { useRecoilState } from "recoil";
import { dataStateAtom } from "~/routes/_index";
import React from "react";
import clsx from "clsx";
import { GoChevronDown, GoPlus, GoTrash } from "react-icons/go";

export default function InputCompo() {
    const [data, setData] = useRecoilState(dataStateAtom);

    return (
        <div className="grid gap-4">
            <CFieldset>
                <CLegend>本文</CLegend>
                <Field>
                    <CLabel>関数名</CLabel>
                    <Input
                        className={
                            "block mt-2 rounded-lg bg-neutral-800 w-full px-2.5 py-1"
                        }
                        value={data.func.func_name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setData({
                                ...data,
                                func: {
                                    ...data.func,
                                    func_name: e.target.value,
                                },
                            });
                        }}
                    />
                </Field>
                <Field>
                    <CLabel>関数の説明</CLabel>
                    <Textarea
                        className={clsx(
                            "block mt-2 rounded-lg bg-neutral-800 w-full p-2"
                        )}
                        value={data.func.func_description}
                        onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                            setData({
                                ...data,
                                func: {
                                    ...data.func,
                                    func_description: e.target.value,
                                },
                            });
                        }}
                    />
                </Field>
            </CFieldset>
            <CFieldset>
                <CLegend>表</CLegend>

                <div className="grid gap-4 relative pb-14">
                    <p className="text-xl">引数</p>

                    {data.args.map((arg, index) => (
                        <FieldWrapper key={index}>
                            <Button
                                className={
                                    "w-fit p-1 rounded-md absolute top-4 right-4"
                                }
                                onClick={() => {
                                    setData({
                                        ...data,
                                        args: data.args.filter((_, i) => {
                                            return i !== index;
                                        }),
                                    });
                                }}
                            >
                                <GoTrash className="size-4 dark:text-red-400 text-red-600" />
                            </Button>
                            <Field>
                                <CLabel>型</CLabel>
                                <div className="relative">
                                    <Select
                                        className={
                                            "block mt-2 rounded-lg bg-neutral-800 w-full px-2.5 py-1 appearance-none font-mono"
                                        }
                                        name="argumentType"
                                        value={arg.arg_type}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                args: data.args.map(
                                                    (arg, i) => {
                                                        if (i === index) {
                                                            return {
                                                                ...arg,
                                                                arg_type:
                                                                    e.target
                                                                        .value,
                                                            };
                                                        }
                                                        return arg;
                                                    }
                                                ),
                                            });
                                        }}
                                    >
                                        <option
                                            value="void"
                                            className="font-mono"
                                        >
                                            void
                                        </option>
                                        <option
                                            value="char"
                                            className="font-mono"
                                        >
                                            char
                                        </option>
                                        <option
                                            value="int"
                                            className="font-mono"
                                        >
                                            int
                                        </option>
                                        <option
                                            value="float"
                                            className="font-mono"
                                        >
                                            float
                                        </option>
                                        <option
                                            value="double"
                                            className="font-mono"
                                        >
                                            double
                                        </option>
                                        <option
                                            value="struct"
                                            className="font-mono"
                                        >
                                            struct
                                        </option>
                                        <option
                                            value="union"
                                            className="font-mono"
                                        >
                                            union
                                        </option>
                                        <option
                                            value="enum"
                                            className="font-mono"
                                        >
                                            enum
                                        </option>
                                        <option
                                            value="custom"
                                            className="font-mono"
                                        >
                                            custom
                                        </option>
                                    </Select>
                                    <GoChevronDown
                                        className="group pointer-events-none absolute top-2 right-2.5 size-4 fill-white/60"
                                        aria-hidden="true"
                                    />
                                </div>
                            </Field>
                            <Field>
                                <CLabel>変数名</CLabel>
                                <Input
                                    className={
                                        "block mt-2 rounded-lg bg-neutral-800 w-full px-2.5 py-1"
                                    }
                                    value={arg.arg_name}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setData({
                                            ...data,
                                            args: data.args.map((arg, i) => {
                                                if (i === index) {
                                                    return {
                                                        ...arg,
                                                        arg_name:
                                                            e.target.value,
                                                    };
                                                }
                                                return arg;
                                            }),
                                        });
                                    }}
                                />
                            </Field>
                            <Field>
                                <CLabel>説明</CLabel>
                                <Textarea
                                    className={clsx(
                                        "block mt-2 rounded-lg bg-neutral-800 w-full p-2"
                                    )}
                                    value={arg.arg_description}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLTextAreaElement>
                                    ) => {
                                        setData({
                                            ...data,
                                            args: data.args.map((arg, i) => {
                                                if (i === index) {
                                                    return {
                                                        ...arg,
                                                        arg_description:
                                                            e.target.value,
                                                    };
                                                }
                                                return arg;
                                            }),
                                        });
                                    }}
                                />
                            </Field>
                        </FieldWrapper>
                    ))}
                    <Button
                        className={
                            "bg-neutral-800 w-fit p-2 rounded-md absolute bottom-0 right-0 hover:bg-neutral-700"
                        }
                        onClick={() => {
                            setData({
                                ...data,
                                args: [
                                    ...data.args,
                                    {
                                        arg_name: "",
                                        arg_description: "",
                                        arg_type: "int",
                                    },
                                ],
                            });
                        }}
                    >
                        <GoPlus className="size-6" />
                    </Button>
                </div>
                <Divider />
                <ReturnCardWrapper title="戻り値">
                    <FieldWrapper>
                        <Field>
                            <CLabel>型</CLabel>
                            <div className="relative">
                                <Select
                                    className={
                                        "block mt-2 rounded-lg bg-neutral-800 w-full px-2.5 py-1 appearance-none font-mono"
                                    }
                                    name="argumentType"
                                    value={data.returns.return_type}
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            returns: {
                                                ...data.returns,
                                                return_type: e.target.value,
                                            },
                                        });
                                    }}
                                >
                                    <option value="void" className="font-mono">
                                        void
                                    </option>
                                    <option value="char" className="font-mono">
                                        char
                                    </option>
                                    <option value="int" className="font-mono">
                                        int
                                    </option>
                                    <option value="float" className="font-mono">
                                        float
                                    </option>
                                    <option
                                        value="double"
                                        className="font-mono"
                                    >
                                        double
                                    </option>
                                    <option
                                        value="struct"
                                        className="font-mono"
                                    >
                                        struct
                                    </option>
                                    <option value="union" className="font-mono">
                                        union
                                    </option>
                                    <option value="enum" className="font-mono">
                                        enum
                                    </option>
                                    <option
                                        value="custom"
                                        className="font-mono"
                                    >
                                        custom
                                    </option>
                                </Select>
                                <GoChevronDown
                                    className="group pointer-events-none absolute top-2 right-2.5 size-4 fill-white/60"
                                    aria-hidden="true"
                                />
                            </div>
                        </Field>
                        <Field>
                            <CLabel>変数名/役割</CLabel>
                            <Input
                                className={
                                    "block mt-2 rounded-lg bg-neutral-800 w-full px-2.5 py-1"
                                }
                                value={data.returns.return_name}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setData({
                                        ...data,
                                        returns: {
                                            ...data.returns,
                                            return_name: e.target.value,
                                        },
                                    });
                                }}
                            />
                        </Field>
                        <Field>
                            <CLabel>説明</CLabel>
                            <Textarea
                                className={
                                    "block mt-2 rounded-lg bg-neutral-800 w-full px-2.5 py-1"
                                }
                                value={data.returns.return_description}
                                onChange={(
                                    e: React.ChangeEvent<HTMLTextAreaElement>
                                ) => {
                                    setData({
                                        ...data,
                                        returns: {
                                            ...data.returns,
                                            return_description: e.target.value,
                                        },
                                    });
                                }}
                            />
                        </Field>
                    </FieldWrapper>
                </ReturnCardWrapper>
            </CFieldset>
            <CFieldset>
                <CLegend>ソースコード</CLegend>
                <Field>
                    <CLabel>ソースコード</CLabel>
                    <Textarea
                        value={data.source.source_code}
                        onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                            setData({
                                ...data,
                                source: {
                                    ...data.source,
                                    source_code: e.target.value,
                                },
                            });
                        }}
                        className={clsx(
                            "block mt-2 rounded-lg bg-neutral-800 w-full p-2",
                            "font-mono"
                        )}
                    />
                </Field>
            </CFieldset>
        </div>
    );
}
