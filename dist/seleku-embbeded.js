let JOSS = joss_overload;
let body = document.body;
let child;
let allElement = [];
let allElementAttribute = [];
let allElements = [];
let {
    ["log"]: _$c, ["error"]: _$e
} = console;
window._$all_attribute = [];

let Name;

let selekDOM = (element) => {

    if (body.children.length !== 0 && !element) {

        child = body.children;
        for(let _$x of child){
            let attr = {..._$x.attributes};
            for(let __$x in attr){
                _$all_attribute.push({
                    name: attr[__$x].name,
                    value: attr[__$x].value,
                    element: attr[__$x].ownerElement
                });
            }
        }

    } else {
        child = element.children;
        for(let _$x of child){
            let attr = {..._$x.attributes};
            for(let __$x in attr){
                _$all_attribute.push({
                    name: attr[__$x].name,
                    value: attr[__$x].value,
                    element: attr[__$x].ownerElement
                });
            }
        }
    }


    if (child !== undefined) {

        for (let attr of child) {
            if (attr.getAttribute("class")) {
                let allOfLongProperty = attr.getAttribute("class").match(/\(.*?\)/);
                let attrOfElement;
                allOfLongProperty?.forEach((i,index)=>{
                    attrOfElement = attr.getAttribute("class").replace(/\(.*?\)/,"$"+index).replace(/\s+/igm,"~");
                    attrOfElement = attrOfElement.replace("$"+index,i).split("~");
                });

                if(attrOfElement === void 0){
                   attrOfElement =  attr.getAttribute("class").split(" ");
                }
               
                for (let attrOfElementStyle of attrOfElement) {
                    if (attrOfElementStyle.split(/-/igm).length === 3) {
                        new JOSS({
                            class: attrOfElementStyle,
                            element: attr
                        }).twoClassDirection()
                    } else if(attrOfElementStyle.split(/-/igm).length === 2){
                        new JOSS({
                            class: attrOfElementStyle,
                            element: attr
                        }).oneClassDirection()
                    }
                }


            }
        }

        for (let el of child) {

            if (el.toString() === document.createElement("script").toString()) {
                //do something 
            } else {
                let content = el.innerHTML;
                let theMain = content.replace(/{/igm, " {").replace(/}/igm, "} ").split(" ");
                let mainDOMLocation = [];

                for (let x in theMain) {
                    if (theMain[x].match(/{/) || theMain[x].match(/}/)) {
                        mainDOMLocation.push({
                            location: x
                        });
                    }
                }

                let arrayOfContext = content.replace(/\s+/igm, "").replace(/{/igm, "~").replace(/}/igm, "~").split("~");
                let context = [];

                allElements.push(el);

                try {
                    context = content.replace(/\<(.*)\>\w*/igm, "").match(/\{*[^{]*[}]/igm);
                    if (context === null) {

                        if (el.attributes.length !== 0) {
                            allElement.push({
                                element: el,
                                attr: el.attributes
                            });
                            selekDOM(el);
                        } else {
                            selekDOM(el);
                        }

                    }

                    if (context.length !== 0) {
                        context.forEach((cont) => {
                            allElement.push({
                                element: el,
                                attr: el.attributes,
                                bindTo: cont.replace(/{/igm, "").replace(/}/igm, "")
                            });
                            try {
                                let _$js_to_html_value = eval(cont.replace(/{/igm, "").replace(/}/igm, ""));
                                if(_$js_to_html_value instanceof HTMLElement){
                                    el.textContent = el.textContent.replace(/{.*?}/igm,"");
                                    el.appendChild(_$js_to_html_value);
                                }else{
                                    el.innerHTML = el.innerHTML.replace(cont, eval(cont.replace(/{/igm, "").replace(/}/igm, "")));
                                }

                            } catch (err) {
                                if (err) {
                                    _$e(`the ${cont.replace(/{/igm,"").replace(/}/igm,"")} is not define`);
                                    el.innerHTML = el.innerHTML.replace(cont, `<b class="danger">error the ${cont.replace(/{/igm,"").replace(/}/igm,"")} is not define at ${parentElement.innerHTML}</b>`)
                                }
                            }
                        });
                    }
                    if (el.children.length !== 0) {
                        selekDOM(el);
                    }


                } catch (err) {
                    if (!err) {
                        context = content.match(/\{*[^{]*[}]/igm);
                    }
                }
            }

        }
    }
}

let reactive = () => {

    window.contexts = {};

    try {

        allElementAttribute.forEach((_$i) => {
            if (_$i.attr) {
                contexts[_$i.attr] = eval(_$i.attr);
            }
            if (_$i.bindTo) {
                contexts[_$i.bindTo] = eval(_$i.bindTo);
            }
        });

        function reactivity(object, key) {
            let val = object[key];

            Object.defineProperty(object, key, {
                get() {
                    return val;
                },
                set(args) {
                    val = args;
                    notify(key)
                }
            });
        }

        function setReactivity(object) {
            for (let obj in object) {
                if (object.hasOwnProperty(obj)) {
                    reactivity(object, obj);

                }
            }
        }

        function notify(name) {

            allElements.forEach((_$i) => {
                try {
                    allElementAttribute.forEach((j) => {
                        
                        if (name == j.bindTo) {
                            eval(`${name} = ${contexts[name]}`);
                            if(typeof eval(name) === "string" || typeof eval(name) === "number"){
                                j.element.textContent  = eval(name);
                            }else{
                                j.element.textContent = contexts[name];
                            }
                        }else{
                            eval(`${name} = ${contexts[name]}`);
                        }

                    });

                } catch (err) {
                    allElementAttribute.forEach((j) => {
               

                        if (name == j.bindTo) {

                            try {
                                eval(`${name} = ${contexts[name]}`);

                                j.element.textContent = contexts[name];

                            } catch (err) {
                                eval(`${name} = \`${contexts[name]}\``);
                                j.element.textContent = contexts[name];
                                return;
                            
                            }

                        }

                    });
                }
            });
            new DynamicAttribute().createDynamic();
            _$all_attribute.forEach((j) => {
                if(/\{/igm.test(j.value) && /\{/igm.test(j.value)){
                    let nameofattr = j.value.trim().replace(/\{/igm,"").replace(/\}/igm,""); 
                    new DynamicAttribute().getAttribute(j.element,nameofattr,j.name);
                }
                return;
            });

        }

        setReactivity(contexts);


    } catch (err) {

    }
}

const binding = () => {
    allElement.forEach((element) => {
        if (element.attr) {
            for (let x in element.attr) {
                if (typeof element.attr[x] !== "function" && typeof element.attr[x] !== "number") {
                    if (element.attr[x].value.match(/\{(.*?)\}/)) {
                        allElementAttribute.push({
                            element: element.element,
                            bindTo: element.bindTo,
                            attr: element.attr[x].value.replace(/{/igm, "").replace(/}/igm, "")
                        });
                    }

                }
            }
        } else {
            allElementAttribute.push({
                element: element.element,
                bindTo: element.bindTo,
            });
        }

    });

    
}

window.onload = () => {
    selekDOM();
    binding();
    reactive();
    for(let x in contexts){
        contexts[x] = contexts[x];
    }
    new JOSS({class:"",element:""}).update();
}