let Joss_utility_class = [];
let oneProps = {
    "c-": {
        "color": {
            value: null,
            type: ""
        }
    }
}

let twoProps = {
    "p-t-": {
        "padding-top": {
            value: null,
            type: ""
        },
    },
    "bg-i-": {
        "background-image": {
            value: 'url("$")',
            type: ""
        }
    },
    "bg-g-": {
        "background": {
            value: "linear-gradient(to bottom, $)",
            type: ""
        }
    }
}

let CREATE_UUID = ()=>{
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

class joss_overload {

    my_class = "";
    my_element;

    constructor(obj) {
        if (obj.class) {
            this.my_class = obj.class;
            this.my_element = obj.element;
        }
    }

    oneClassDirection() {

        let Class = this.my_class;
        let Allclass = [];
        let index = -1;
        let g = "";
        let name = "";
        let property = [];


        for (let x in oneProps) {
            Allclass.push(x);
        }

        Allclass.forEach((i) => {
            if (Class.match(i)) {

                const class_name = Class;

                let result = Class.split(/-/igm).filter((j) => {
                    return i.split(/-/igm).indexOf(j) !== -1;
                });

                if (result.length !== 0 && result.length === 1) {
                    for (let x in oneProps[i]) {

                        index++;

                        property.push(x + ": ");

                        if (typeof oneProps[i][x] === "object") {
                            if (Class.split(/-/igm)[Class.split(/-/igm).length - 1].match(/\(.*?\)/) && oneProps[i][x].value === null) {
                                oneProps[i][x].value = Class.split(/-/igm)[Class.split(/-/igm).length - 1].replace(/\(/igm, "").replace(/\)/igm, "");
                                property[index] += oneProps[i][x].value + oneProps[i][x].type + ";";
                                Class = Class.replace(Class.split(/-/igm)[Class.split(/-/igm).length - 1], CREATE_UUID());
                            } else if (oneProps[i][x].value === null) {
                                oneProps[i][x].value = Class.split(/-/igm)[Class.split(/-/igm).length - 1];
                                property[index] += oneProps[i][x].value + oneProps[i][x].type + ";";
                                Class = Class.replace(Class.split(/-/igm)[Class.split(/-/igm).length - 1], CREATE_UUID());
                            } else if (oneProps[i][x].value.match(/\$/igm)) {
                                oneProps[i][x].value = oneProps[i][x].value.replace(/\$/igm, Class.split(/-/igm)[Class.split(/-/igm).length - 1]);
                                property[index] += oneProps[i][x].value + oneProps[i][x].type + ";";
                                Class = Class.replace(Class.split(/-/igm)[Class.split(/-/igm).length - 1], CREATE_UUID());
                            } else {
                                oneProps[i][x].value = oneProps[i][x].value.replace(/\$/igm, Class.split(/-/igm)[Class.split(/-/igm).length - 1]);
                                property[index] += oneProps[i][x].value + oneProps[i][x].type + ";";
                                Class = Class.replace(Class.split(/-/igm)[Class.split(/-/igm).length - 1], CREATE_UUID());
                            }

                            // di sini woi di benerin

                        } else {
                            property[index] += oneProps[i][x] + ";";
                        }
                        g = `.${Class}{${property.join(" ")}}`;
                        name = class_name;

                        this.my_element.className = this.my_element.className.replace(class_name, Class);
                        if(typeof oneProps[i][x] === "object"){
                            oneProps[i][x].value = null;
                        }
                    }
                }

            }
        });

        for (let x in Joss_utility_class) {
            if (name.length > 0) {
                if (Joss_utility_class[x].Name === name) {

                    // do something
                    this.my_element.className = this.my_element.className.replace(Class, Joss_utility_class[x].Class);
                    return "";

                }
            }
        }

        if (g.length > 0 && name.length > 0) {
            Joss_utility_class.push({
                Class: Class,
                Name: name,
                glob: g
            });
        }

        return g;

    }

    twoClassDirection() {

        let a = this.my_class;
        let Allclass = [];
        let index = -1;
        let property = [];
        let g = "";
        let name = "";

        for (let x in twoProps) {
            Allclass.push(x);
        }



        Allclass.forEach((i) => {

            if (a.match(i)) {

                const class_name = a;

                let result = a.split(/-/igm).filter((j) => {
                    return i.split(/-/igm).indexOf(j) !== -1;
                });

                if (result.length === 2) {
                    for (let x in twoProps[i]) {
                        if (twoProps[i].hasOwnProperty(x)) {
                            index++;

                            property.push(x + ": ");

                            if (typeof twoProps[i][x] === "object") {
                                if (a.split(/-/igm)[a.split(/-/igm).length - 1].match(/\(.*?\)/) && twoProps[i][x].value === null) {
                                    twoProps[i][x].value = a.split(/-/igm)[a.split(/-/igm).length - 1].replace(/^\(/igm, "").replace(/\)$/igm, "");
                                    property[index] += twoProps[i][x].value + twoProps[i][x].type + ";";
                                    a = a.replace(a.split(/-/igm)[a.split(/-/igm).length - 1], CREATE_UUID());
                                } else if (twoProps[i][x].value === null) {
                                    twoProps[i][x].value = a.split(/-/igm)[a.split(/-/igm).length - 1];
                                    property[index] += twoProps[i][x].value + twoProps[i][x].type + ";";
                                    a = a.replace(a.split(/-/igm)[a.split(/-/igm).length - 1], CREATE_UUID());
                                } else if (twoProps[i][x].value.match(/\$/igm)) {
                                    twoProps[i][x].value = twoProps[i][x].value.replace(/\$/igm, a.split(/-/igm)[a.split(/-/igm).length - 1]);
                                    property[index] += twoProps[i][x].value + twoProps[i][x].type + ";";
                                    a = a.replace(a.split(/-/igm)[a.split(/-/igm).length - 1], CREATE_UUID());
                                } else {
                                    twoProps[i][x].value = twoProps[i][x].value.replace(/\$/igm, a.split(/-/igm)[a.split(/-/igm).length - 1]);
                                    property[index] += twoProps[i][x].value + twoProps[i][x].type + ";";
                                    a = a.replace(a.split(/-/igm)[a.split(/-/igm).length - 1], CREATE_UUID());
                                }

                            } else {
                                property[index] += twoProps[i][x] + ";";
                            }
                            g = `.${a}{${property.join(" ")}}`;
                            name = class_name;
                            this.my_element.className = this.my_element.className.replace(class_name, a);
                            twoProps[i][x].value = null
                        }
                    }
                }
            }
        });

        for (let x in Joss_utility_class) {
            if (name.length > 0) {
                if (Joss_utility_class[x].Name === name) {

                    // do something
                    this.my_element.className = this.my_element.className.replace(a, Joss_utility_class[x].Class);
                    return "";

                }
            }
        }

        if (g.length > 0 && name.length > 0) {
            Joss_utility_class.push({
                Class: a,
                Name: name,
                glob: g
            });
        }

        return g;
    }

    update() {
        let style = document.createElement("style");
        let all = [];
        Joss_utility_class.forEach((i) => {
            all.push(i.glob);
        });
        style.textContent = all.join(" ")

        if (document.querySelector("style")) {
            document.querySelector("style").textContent += all.join(" ");
            return;
        } else {
            document.head.appendChild(style);
            return;
        }
    }
}