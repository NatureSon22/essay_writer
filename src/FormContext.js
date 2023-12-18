import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function FormProvider({children}) {
    const [formData, setFormData] = useState({});
}