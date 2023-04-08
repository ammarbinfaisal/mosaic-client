import consts from "./consts";

export const post = async (p: string, data: any) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${consts.API_URL}/${p}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return res.json();
};


export const get = async (p: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${consts.API_URL}/${p}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return { status: res.status, data: await res.json() };
};
