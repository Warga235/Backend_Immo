class Filtrator2000 {

    surface = {
        min : 0 ,
        max : Number.POSITIVE_INFINITY,
    }
    price = {
        min : 0 ,
        max : Number.POSITIVE_INFINITY,
    }

    finalArray = [] //Filtre Final sous forme de tableau d'objet ( uniqueFilter + Filtre'$or' )
    uniqueFilter = { } //Filtre intermediaire

    constructor(reqBody) {
        this.reqBody = reqBody
        
        this.makefilter(reqBody)
        this.uniqueFilter.price = {$lt : this.price.max , $gte : this.price.min }
        this.uniqueFilter.surface = {$lt : this.surface.max , $gte : this.surface.min }
        this.finalArray.push(this.uniqueFilter)
    }


    makefilter(filters) {

       for (let elem in filters) {// Chaque conditons visent certains type d'éléments pour les
                                  //attribuer au filtre.

           if(/region|city|country|postal_code|street/i.test(elem)){
               this.uniqueFilter[`address.${elem}`] = new RegExp('^'+ filters[elem],'i')
           }
           else if (/surface|price/i.test(elem) ){
               if (filters[elem][0] && /^\d+$/i.test(filters[elem][0]) ){
                    this[elem].min = +filters[elem][0] 
               }
               if (filters[elem][1] && /^\d+$/i.test(filters[elem][1]) ){
                this[elem].max = +filters[elem][1] 
               }
           }
           else if (typeof (filters[elem]) === "object"){
               this.createFromArray(elem,filters[elem])
           }
           else if(this.reqBody[elem]){
               this.uniqueFilter[elem] = new RegExp('^' + filters[elem],'i')
           }
       }
    }

    createFromArray(key,value) {
        if (value.length === 1) { // Si qu'1 seul elem dans le tableau pas besoins de '$or'
            let isNumber = /\d/ // <-- facultatif, (c'est pour transformer la chaine en RegExp )
            isNumber.test(value[0]) ? this.uniqueFilter[key] = value[0] :
                this.uniqueFilter[key] = new RegExp('^' + value[0] ,'i')
        }
        else if(value.length > 1){ // Sinon on crée un '$or'

            let obj = { $or : []}
            value.forEach(elem => {
                let isNumber = /\d/ // <-- facultatif, (c'est pour transformer la chaine en RegExp )
                let content = isNumber.test(value[0]) ? elem : new RegExp('^' + elem ,'i')
                obj.$or.push({ [key] : content})
            })
            this.finalArray.push(obj)
        }
    }
}

module.exports =  {Filtrator2000};
