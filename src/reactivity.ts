class $Reactivity{

	private _main: object;
	private _event: Function;

	constructor($args: object,$event: Function = ()=>{}){

		this._main = $args;
		this._event = $event;

	}

	setToGlobal(_main){
		for(let _x in _main){
			try{
				eval(`${_x} = ${_main[_x]}`);
				
			}catch(err){
				eval(`${_x} = "${_main[_x]}"`);
			}
		}
	}

	setReactivity(object,key){

		let _data = object[key];
		let _event = this._event;
		let setToGlobal = this.setToGlobal;

		Object.defineProperty(object,key,{

			get(){
				return _data;
			},
			set($fn: any){
				_event(this);
				
				try{
					_data = $fn();
				}catch(err){
					_data = $fn;
				}
				setToGlobal(object);
			}

		});

	}

	init(){
		for(let _x in this._main){
			try{
				eval(`this._main[_x] = ${_x}`);
			}catch(err){
				
			}
			this.setReactivity(this._main,_x);
		}

		return this._main;	
	}

}

let $Reactive = (args: object, event: Function)=>{
	return (new $Reactivity(args,event).init());
}
