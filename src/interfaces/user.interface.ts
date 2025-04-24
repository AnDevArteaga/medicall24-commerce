export interface User {
    user: {
        identification: string;
        typeId: string;
        name1: string;
        name2: string;
        lastName1: string;
        lastName2: string;
        email: string;
        password: string;
        confirmPassword: string;
    };
    epsId: null;
    regimenId: null;
}

export interface GetUser {
    identification: string;
    typeId: string;
}
