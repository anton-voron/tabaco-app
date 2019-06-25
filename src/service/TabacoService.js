export default class TabacoService {



_tabacos = [];

_arrTypeList; /*Variable of Type */
_arrType; /*Variable of Taste */
_arrTasteList;
_taste;


idCompany = 0;
idType = 0;
idTaste = 0;



 createItem = (newCompany, newType, newTaste) => {

  const idx = this._tabacos.map(item => item.company).indexOf(newCompany);
  if(idx === -1) {
    const newTabacoObj = {
      id: this.idCompany++,
      company: newCompany,
      type: [
        {typeId: this.idType++,
         typeName: newType,
         taste: [
             {tasteId: this.idTaste++, tasteName: newTaste}
         ]
        }
      ]
    }
    this._tabacos.push(newTabacoObj)
  } else { // первый else: у нас есть такая марка табака, делаем проверку на type
      const configType = this._tabacos[idx].type;
      const idxType = configType.map(item => item.typeName).indexOf(newType);
      if(idxType === -1) {
      const newTypeoObj = {
        typeId: this.idType++,
        typeName: newType,
        taste: [
            {tasteId: this.idTaste++, tasteName: newTaste}
           ]
        }
      this._tabacos[idx].type.push(newTypeoObj)
      } else { // второй:  else (внутренний) у нас есть такая марка табака и такой type, делаем проверку на вкус и аромат
        const configTaste = this._tabacos[idx].type[idxType].taste;
      const idxTaste = configTaste.map(item => item.tasteName).indexOf(newTaste);
      if(idxTaste === -1) {
        const newTasteObj = {
          tasteId: this.idTaste++, 
          tasteName: newTaste
        }
        this._tabacos[idx].type[idxType].taste.push(newTasteObj)
      } else { // третий else: есть марка табака, тип и вскус - выводим что в наличии есть данный табак
        console.log('this company, type and taste already exist in Data');
      } // закрытие скобки от третьего  else
      } // закрытие скобки от второго  else
  } // закрытие скобки от первого else
 };



 getTabacos = () => {
    const res = this._tabacos.map((item) => {
      return item;
    });
    this._arrTypeList = res;
    return this._arrTypeList
  };


 getType = (id) => {
   for (let i = 0; i <this._arrTypeList.length; i++) {
    if(this._arrTypeList[i].id === id) {
      this._arrType = this._arrTypeList[i].type;
      return this._arrType;
    }
   };
  };


 getTaste = (typeId) => {
  for (let i = 0; i < this._arrType.length; i++) {
    if(this._arrType[i].typeId === typeId) {
      this._arrTasteList = this._arrType[i].taste;
      return this._arrTasteList;
    } 
  }
  };

  getItem = (tasteId) => {
    for(let i = 0; i < this._arrTasteList.length; i++) {
      if(this._arrTasteList[i].tasteId === tasteId) {
        this._taste = Object.assign({}, this._arrTasteList[i]);
        console.log(this._taste);
        return (this._taste);
      }
    }
  }
};
