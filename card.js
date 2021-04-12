let components_card = [{
  name: "seleku-card",
  element: [{
    tagName: "div",
    id: "5a21cec5",
    parentId: 0,
    attr: "class=\"my-box bg-i-https://tse3.mm.bing.net/th?id=OIP.QOxjPkMTk67rZobAFvqangHaEK&pid=ImgDet&rs=1\" ",
  }, {
    tagName: "h1",
    id: "8959d20f",
    parentId: 0,
    attr: "id={$angka} name={namaku}",
  }, {
    parentElement: "h1",
    id: "c482c49c",
    text: " seleku {namaku} ",
    parentId: "8959d20f",
  }, {
    tagName: "button",
    id: "8c732632",
    parentId: 0,
    attr: "id={namaku} onclick=\"kan()\" ",
  }, {
    parentElement: "button",
    id: "b0557e8c",
    text: " add ",
    parentId: "8c732632",
  }, {
    tagName: "input",
    id: "7294c5d5",
    parentId: 0,
    attr: "type=\"text\" name=\"\" value=\"daber\" oninput=\"input(this)\" ",
  }, {
    id: "1b104922",
    text: " #html",
    parentId: 0,
  }, ],
  css: ` h1{ color: red; font-family: sans-serif; } .my-box{ width: 300px; height: 200px; background: salmon; border-radius: 10px; }  `
}];

let head_elements_card = [];

class SelekuComponents_components_card extends SelekuComponents {
  constructor() {
    super();
  }
}

registeryComponents(components_card, SelekuComponents_components_card);
Render(components_card, document.querySelector("body"));

RenderCustomElementToHead(head_elements_card);



let namaku = "hello";
let $angka = 1;
// const $var = $Reactive({_mynumbers});
function kan() {
  contexts.$angka += 1;
}

function input(el) {
  contexts.namaku = el.value;
}