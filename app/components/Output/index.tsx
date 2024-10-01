import { Button } from "@headlessui/react";
import { useState } from "react";
import { GoCopy } from "react-icons/go";
import { useRecoilValue } from "recoil";
import { dataStateAtom } from "~/routes/_index";
import { Data_t } from "~/type";

export default function Output() {
    const data = useRecoilValue(dataStateAtom);
    const [latexCode, setLatexCode] = useState("");

    function generateLatexCode(data: Data_t): string {
        const { func, args, returns, source } = data;

        // 引数部分の生成
        const argString =
            args.length > 0
                ? `この関数は引数に${args
                      .map((arg) => `\\Inline{${arg.arg_type} ${arg.arg_name}}`)
                      .join(", ")}を渡す。`
                : "この関数は引数に何も渡さない。";

        // 引数テーブルの行生成
        const argRows =
            args.length > 0
                ? args
                      .map(
                          (arg) =>
                              `\\multirow{1}{*}{引数} & ${arg.arg_type} & \\Inline{${arg.arg_name}} & ${arg.arg_description} \\\\`
                      )
                      .join("\n    ")
                : "\\multirow{1}{*}{引数} & - & - & 引数なし \\\\";

        // 戻り値のテーブル行生成
        const returnRow = `
            \\multirow{1}{*}{戻り値} & ${returns.return_type} & \\Inline{${returns.return_name}} & ${returns.return_description} \\\\
        `;

        // ソースコードの改行を LaTeX の改行コマンドに変換
        const formattedSourceCode = source.source_code.replace(/\n/g, "\\\\\n");

        // LaTeX テンプレート
        return `
    \\subsubsection{${func.func_name}関数}
    \\Inline{${func.func_name}}関数は${func.func_description}関数である。
    この関数の引数と戻り値を表\\ref{tab:${func.func_name}_func}に示す。
    ソースコードをソースコード\\ref{lst:${func.func_name}_func}に示す。
    ${argString}
    
    \\begin{table}[H]
        \\centering
        \\caption{\\Inline{${func.func_name}}関数の引数と戻り値}
        \\label{tab:${func.func_name}_func}
        \\begin{tabular}{cllp{6cm}}
        \\toprule
        種類 & 型 & 変数/役割 & 詳細 \\\\
        \\midrule \\midrule
        ${argRows}
        \\midrule
        ${returnRow}
        \\bottomrule
        \\end{tabular}
    \\end{table}
    
    \\begin{lstlisting}[caption={${func.func_name}関数のソースコード}, label={lst:${func.func_name}_func}]
    ${formattedSourceCode}
    \\end{lstlisting}
    `.trim(); // 余分な空白を除去
    }

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(latexCode);
    };

    return (
        <div className="grid gap-4">
            {latexCode !== "" && (
                <div className="bg-neutral-900 border-2 border-neutral-800 px-4 py-8 rounded-lg relative">
                    <Button
                        className={
                            "absolute right-2 top-2 p-2 rounded-md bg-neutral-900 hover:bg-neutral-800"
                        }
                        onClick={() => copyToClipboard()}
                    >
                        <GoCopy className="size-4" />
                    </Button>
                    <code className="max-w-full overflow-auto break-words">
                        {latexCode}
                    </code>
                </div>
            )}
            <Button
                className={
                    "w-full bg-neutral-900 p-2 rounded-lg hover:bg-neutral-800"
                }
                onClick={() => {
                    setLatexCode(generateLatexCode(data));
                }}
            >
                生成
            </Button>
        </div>
    );
}
