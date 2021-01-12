class Filtrator2000 {

    minMax = {
        minPrice : 0,
        maxPrice : Number.POSITIVE_INFINITY,
        minSurface : 0,
        maxSurface : Number.POSITIVE_INFINITY
    }

    finalArray = [] //Filtre Final sous forme de tableau d'objet ( uniqueFilter + Filtre'$or' )
    uniqueFilter = { } //Filtre intermediaire

    constructor(reqBody) {
        this.reqBody = reqBody
        //this.uniqueFilter.status = new RegExp(id,'i')
        this.makefilter(reqBody)
        this.uniqueFilter.price = {$lt : this.minMax.maxPrice + 1, $gte : this.minMax.minPrice +1}
        this.uniqueFilter.surface = {$lt : this.minMax.maxSurface + 1, $gte : this.minMax.minSurface +1}
        this.finalArray.push(this.uniqueFilter)
    }


    makefilter(filters) {

       for (let elem in filters) {// Chaque conditon vise certains type d'éléments pour les
                                  //attribuer au filtre.

           if(/region|city|country|postal_code|street/i.test(elem)){
               this.uniqueFilter[`address.${elem}`] = new RegExp('^'+ filters[elem],'i')
           }
           else if (/min|max/i.test(elem) ){
               this.minMax[elem] = filters[elem]
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

module.exports =  Filtrator2000