import React, {useState, createContext} from "react";

export const P5Context = createContext({p5Obj: null, setP5: () => {}});
export default (props) => {
    const [p5Obj, setP5Obj] = useState(null);
    const value = { p5Obj, setP5Obj };

    return (
        <P5Context.Provider value={value}>{props.children}</P5Context.Provider>
    )
}