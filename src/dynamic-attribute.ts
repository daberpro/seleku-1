
class DynamicAttribute{

	private _elements: HTMLElement;

	constructor(args: HTMLElement){
		if(args)
			this._elements = args;

		else
			this._elements = document?.body;

	}

	getAttribute($args: Element | HTMLElement,other: string, name: string){

		try{

			let attr: object = {...$args.attributes};
			for(let x in attr){
				if(name === attr[x].name && typeof eval(other) === "string" || typeof eval(other) === "number"){
					$args.setAttribute(attr[x].name,eval(other));
				}
				if(attr[x].value == eval(other) && typeof eval(other) === "string" || typeof eval(other) === "number"){
					$args.setAttribute(attr[x].name,eval(other));
				}
				if(/\{.*?\}/igm.test(attr[x].value) && !(/\w*:/igm.test(attr[x].name)) || attr[x].value == eval(other)){
					
					let _$element = attr[x].value.replace("{","").replace("}","");
					if(typeof eval(_$element) === "string" || typeof eval(_$element) === "number"){
						$args.setAttribute(attr[x].name,eval(_$element));
					};

					break;
				}
			}
		}catch(err){

		}

	}

	createDynamic(){

		this.getAttribute = this.getAttribute;

		let element: Element[] = [...this._elements.children];

		element.forEach($child =>{
			this.getAttribute($child);
		});

	}

}

