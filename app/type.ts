export type Func_t = {
    func_name: string;
    func_description: string;
};

export type Argument_t = {
    arg_type: string;
    arg_name: string;
    arg_description: string;
};

export type Return_t = {
    return_type: string;
    return_name: string;
    return_description: string;
};

export type SourceCode_t = {
    source_code: string;
};

export type Data_t = {
    func: Func_t;
    args: Argument_t[];
    returns: Return_t;
    source: SourceCode_t;
};
