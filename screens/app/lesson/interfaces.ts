export interface Highlights {
    data: ISelected[]
};

export type ISelected = {
    title: string,
    body: string
}

export interface IQuestion {
    question: string,
    hint?: string,
    opt_a: string,
    opt_b: string,
    opt_c: string,
    opt_d?: string,
    opt_e?: string,
    score: number,
    answer: string,
    topic: number,
    image: string,
    qtn_type: string
}