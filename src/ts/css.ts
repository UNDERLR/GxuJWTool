function setCSSVar(name: string, value: string){
    document.documentElement.style.setProperty(name, value);
}

export const css = {
    setVar: setCSSVar
}
