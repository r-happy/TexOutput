import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import type { MetaFunction } from "@remix-run/node";
import { atom, RecoilRoot } from "recoil";
import Container from "~/components/Container";
import { CTab } from "~/components/CustomComponents";
import Output from "~/components/Output";
import Input from "~/components/InputCompo";
import { Data_t } from "~/type";

export const meta: MetaFunction = () => {
    return [
        { title: "TeXOut" },
        { name: "description", content: "latexを出力してくれます" },
    ];
};

export const dataStateAtom = atom<Data_t>({
    key: "dataState",
    default: {
        func: {
            func_name: "",
            func_description: "",
        },
        args: [
            {
                arg_name: "",
                arg_description: "",
                arg_type: "int",
            },
        ],
        returns: {
            return_type: "",
            return_name: "",
            return_description: "",
        },
        source: {
            source_code: "",
        },
    },
});

export default function Index() {
    return (
        <RecoilRoot>
            <Container>
                <TabGroup className={"py-8 relative"}>
                    <TabList
                        className={
                            "flex justify-around sticky top-0 left-0 backdrop-blur-md z-50"
                        }
                    >
                        <CTab>入力</CTab>
                        <CTab>出力</CTab>
                    </TabList>
                    <TabPanels className={"p-4"}>
                        <TabPanel>
                            <Input />
                        </TabPanel>
                        <TabPanel>
                            <Output />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </Container>
        </RecoilRoot>
    );
}
