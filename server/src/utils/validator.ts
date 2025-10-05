export const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
};

export const isValidPassword = (password: string) => {
    return password.length >= 8;
};

export const isValidName = (name: string) => {
    return name.length >= 3;
};

export const isValidPhone = (phone: string) => {
    return phone.length >= 10;
};
